import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Schema de validação para cada linha do CSV - mais flexível
const transacaoSchema = z.object({
  data_movimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
  tipo_movimento: z.enum(['entrada', 'saida']),
  valor_original: z.string().transform(val => {
    if (!val || val.trim() === '') return 0
    return parseFloat(val.replace(/\./g, '').replace(',', '.'))
  }),
  data_vencimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional().or(z.literal('')),
  data_emissao: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional().or(z.literal('')),
  data_pagamento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional().or(z.literal('')),
  forma_pagamento: z.enum(['dinheiro', 'pix', 'cartao_credito', 'cartao_debito', 'boleto', 'ted', 'transferencia', 'cheque', 'outros']).optional(),
  valor_pago_recebido: z.string().optional().transform(val => {
    if (!val || val.trim() === '') return null
    return parseFloat(val.replace(/\./g, '').replace(',', '.'))
  }),
  valor_movimentado_conta: z.string().optional().transform(val => {
    if (!val || val.trim() === '') return null
    return parseFloat(val.replace(/\./g, '').replace(',', '.'))
  }),
  valor_rateado_prestador: z.string().optional().transform(val => {
    if (!val || val.trim() === '') return null
    return parseFloat(val.replace(/\./g, '').replace(',', '.'))
  }),
  quem_gerou: z.string().optional(),
  parceiro: z.string().optional(),
  centro_custo: z.string().optional(),
  conta_contabil: z.string().optional(),
  banco_nome: z.string().optional(),
  referente: z.string().optional(),
  subcategoria: z.string().optional(),
  tags: z.string().optional(),
}).passthrough() // Permite campos extras que não estão no schema

function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n').filter(line => line.trim())
  
  // Detect delimiter (semicolon or comma)
  const firstLine = lines[0] || ''
  const delimiter = firstLine.includes(';') ? ';' : ','
  
  console.log('Detected CSV delimiter:', delimiter)
  
  return lines.map(line => {
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === delimiter && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    return values
  })
}

function convertDate(dateStr: string): string | null {
  if (!dateStr) return null
  const [day, month, year] = dateStr.split('/')
  return `${year}-${month}-${day}`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Verificar autenticação
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Não autorizado')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    // Verificar se usuário é admin ou manager
    const { data: roles, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['admin', 'manager'])

    if (roleError || !roles || roles.length === 0) {
      throw new Error('Permissão negada. Apenas admins e managers podem importar dados.')
    }

    console.log('User authorized:', user.email, 'Role:', roles[0].role)

    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      throw new Error('Nenhum arquivo foi enviado')
    }

    console.log('Processing file:', file.name, 'Size:', file.size)

    const csvText = await file.text()
    const rows = parseCSV(csvText)
    
    if (rows.length < 2) {
      throw new Error('CSV vazio ou inválido')
    }

    // Mapeamento de headers do CSV (português) para campos do schema
    const headerMapping: Record<string, string> = {
      'data movimento': 'data_movimento',
      'entrada/saída': 'tipo_movimento',
      'entrada/saida': 'tipo_movimento',
      'tipo título': 'forma_pagamento',
      'tipo titulo': 'forma_pagamento',
      'número docto': 'numero_docto',
      'numero docto': 'numero_docto',
      'quem gerou': 'quem_gerou',
      'parceirov (farmácia pagador ou entregador)': 'parceiro',
      'parceirov': 'parceiro',
      'parceiro': 'parceiro',
      'referente': 'referente',
      'vencimento': 'data_vencimento',
      'emissão': 'data_emissao',
      'emissao': 'data_emissao',
      'pagamento': 'data_pagamento',
      'valor original': 'valor_original',
      'valor pago / recebido': 'valor_pago_recebido',
      'valor pago recebido': 'valor_pago_recebido',
      'valor pago/recebido': 'valor_pago_recebido',
      'conta': 'conta_bancaria',
      'plano de contas': 'conta_contabil',
      'valor mov.conta': 'valor_movimentado_conta',
      'valor rateado para o prestador': 'valor_rateado_prestador',
      'centro de custo (farmácia prestadora)': 'centro_custo',
      'centro de custo': 'centro_custo',
      'banco / caixa': 'banco_nome',
      'banco/caixa': 'banco_nome',
      'banco caixa': 'banco_nome',
      'registro movimento': 'registro_movimento',
      'registro compromisso': 'registro_compromisso',
      'categoria': 'categoria',
      'subcategoria': 'subcategoria',
      'tags': 'tags',
    }

    const rawHeaders = rows[0].map(h => h.toLowerCase().trim())
    const dataRows = rows.slice(1)

    console.log('CSV Raw Headers:', rawHeaders)
    console.log('Total rows to process:', dataRows.length)

    const transacoes = []
    const errors = []

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i]
      
      // Skip empty rows or rows with insufficient columns
      if (row.every(cell => !cell || cell.trim() === '')) {
        console.log(`Skipping empty row ${i + 2}`)
        continue
      }
      
      // Skip rows that don't have the minimum required columns
      if (row.length < 3) {
        console.log(`Skipping row ${i + 2}: insufficient columns (${row.length})`)
        continue
      }

      const rowData: any = {}
      rawHeaders.forEach((rawHeader, idx) => {
        const mappedHeader = headerMapping[rawHeader] || rawHeader.replace(/\s+/g, '_')
        const value = row[idx]?.trim()
        if (value) {
          rowData[mappedHeader] = value
        }
      })
      
      // Log first few rows for debugging
      if (i < 3) {
        console.log(`Row ${i + 2} mapped data:`, JSON.stringify(rowData))
      }

      // Mapear tipo_movimento se vier como "Entrada" ou "Saída"
      if (rowData.tipo_movimento) {
        const tipo = rowData.tipo_movimento.toUpperCase()
        if (tipo === 'ENTRADA') rowData.tipo_movimento = 'entrada'
        else if (tipo === 'SAÍDA' || tipo === 'SAIDA') rowData.tipo_movimento = 'saida'
      }

      // Mapear forma_pagamento (o campo "TIPO TÍTULO" no Excel)
      if (rowData.forma_pagamento) {
        const forma = rowData.forma_pagamento.toLowerCase()
        const formaMap: Record<string, string> = {
          'dinheiro': 'dinheiro',
          'pix': 'pix',
          'boleto': 'boleto',
          'nfse': 'outros',
          'cartão de crédito': 'cartao_credito',
          'cartao de credito': 'cartao_credito',
          'cartão de débito': 'cartao_debito',
          'cartao de debito': 'cartao_debito',
          'ted': 'ted',
          'transferência': 'transferencia',
          'transferencia': 'transferencia',
          'cheque': 'cheque',
        }
        rowData.forma_pagamento = formaMap[forma] || 'outros'
      }

      try {
        const validated = transacaoSchema.parse(rowData)
        
        transacoes.push({
          data_movimento: convertDate(validated.data_movimento),
          data_vencimento: validated.data_vencimento && validated.data_vencimento !== '' ? convertDate(validated.data_vencimento) : null,
          data_emissao: validated.data_emissao && validated.data_emissao !== '' ? convertDate(validated.data_emissao) : null,
          data_pagamento: validated.data_pagamento && validated.data_pagamento !== '' ? convertDate(validated.data_pagamento) : null,
          tipo_movimento: validated.tipo_movimento,
          forma_pagamento: validated.forma_pagamento || null,
          valor_original: validated.valor_original,
          valor_pago_recebido: validated.valor_pago_recebido,
          valor_movimentado_conta: validated.valor_movimentado_conta,
          valor_rateado_prestador: validated.valor_rateado_prestador,
          categoria: null, // Não mapeamos categoria do Excel ainda
          tipo_receita_despesa: null,
          banco_tipo: null,
          banco_nome: validated.banco_nome || null,
          referente: validated.referente || null,
          subcategoria: validated.subcategoria || null,
          tags: validated.tags ? validated.tags.split(',').map(t => t.trim()) : null,
        })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        errors.push({ row: i + 2, error: errorMsg })
        console.error(`Error parsing row ${i + 2}:`, errorMsg)
        if (i < 5) {
          console.error(`Row ${i + 2} data before validation:`, JSON.stringify(rowData))
        }
      }
    }

    console.log('Valid transactions:', transacoes.length)
    console.log('Errors:', errors.length)

    if (transacoes.length === 0) {
      throw new Error('Nenhuma transação válida encontrada no CSV')
    }

    // Inserir transações
    const { data: inserted, error: insertError } = await supabase
      .from('transacoes')
      .insert(transacoes)
      .select()

    if (insertError) {
      console.error('Insert error:', insertError)
      throw new Error(`Erro ao inserir transações: ${insertError.message}`)
    }

    console.log('Inserted transactions:', inserted?.length)

    return new Response(
      JSON.stringify({
        success: true,
        message: `${inserted?.length || 0} transações importadas com sucesso`,
        imported: inserted?.length || 0,
        errors: errors.length,
        errorDetails: errors.slice(0, 10), // Apenas os primeiros 10 erros
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Function error:', error)
    const errorMsg = error instanceof Error ? error.message : 'Erro ao processar CSV'
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMsg,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
