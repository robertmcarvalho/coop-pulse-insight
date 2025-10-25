import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Schema de validação para cada linha do CSV
const transacaoSchema = z.object({
  data_movimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
  data_vencimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
  data_emissao: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
  data_pagamento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
  tipo_movimento: z.enum(['entrada', 'saida']),
  forma_pagamento: z.enum(['dinheiro', 'pix', 'cartao_credito', 'cartao_debito', 'boleto', 'ted', 'transferencia', 'cheque', 'outros']).optional(),
  valor_original: z.string().transform(val => parseFloat(val.replace(',', '.'))),
  valor_pago_recebido: z.string().optional().transform(val => val ? parseFloat(val.replace(',', '.')) : null),
  valor_movimentado_conta: z.string().optional().transform(val => val ? parseFloat(val.replace(',', '.')) : null),
  valor_rateado_prestador: z.string().optional().transform(val => val ? parseFloat(val.replace(',', '.')) : null),
  valor_diferenca: z.string().optional().transform(val => val ? parseFloat(val.replace(',', '.')) : null),
  quem_gerou: z.string().optional(),
  parceiro: z.string().optional(),
  centro_custo: z.string().optional(),
  conta_contabil: z.string().optional(),
  categoria: z.enum(['receita', 'custo_variavel', 'despesa_fixa', 'despesa_variavel', 'investimento', 'financeiro']).optional(),
  tipo_receita_despesa: z.enum(['operacional', 'nao_operacional', 'financeira']).optional(),
  banco_tipo: z.enum(['conta_corrente', 'caixa', 'poupanca', 'aplicacao']).optional(),
  banco_nome: z.string().optional(),
  referente: z.string().optional(),
  subcategoria: z.string().optional(),
  tags: z.string().optional(),
})

function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n').filter(line => line.trim())
  return lines.map(line => {
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
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
      'data mov.': 'data_movimento',
      'vencimento': 'data_vencimento',
      'emissão': 'data_emissao',
      'emissao': 'data_emissao',
      'pagamento': 'data_pagamento',
      'entrada/saída': 'tipo_movimento',
      'entrada/saida': 'tipo_movimento',
      'tipo': 'forma_pagamento',
      'forma pagamento': 'forma_pagamento',
      'valor original': 'valor_original',
      'valor pago/recebido': 'valor_pago_recebido',
      'valor pago recebido': 'valor_pago_recebido',
      'valor mov.conta': 'valor_movimentado_conta',
      'valor movimentado conta': 'valor_movimentado_conta',
      'valor rateado prestador': 'valor_rateado_prestador',
      'valor diferença': 'valor_diferenca',
      'valor diferenca': 'valor_diferenca',
      'quem gerou': 'quem_gerou',
      'parceiro v': 'parceiro',
      'parceiro': 'parceiro',
      'centro de custo': 'centro_custo',
      'centro custo': 'centro_custo',
      'conta': 'conta_contabil',
      'conta contabil': 'conta_contabil',
      'conta contábil': 'conta_contabil',
      'plano de contas': 'conta_contabil',
      'categoria': 'categoria',
      'tipo receita/despesa': 'tipo_receita_despesa',
      'tipo receita despesa': 'tipo_receita_despesa',
      'banco/caixa': 'banco_tipo',
      'banco caixa': 'banco_tipo',
      'banco tipo': 'banco_tipo',
      'banco': 'banco_nome',
      'banco nome': 'banco_nome',
      'referente': 'referente',
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
      
      // Skip empty rows
      if (row.every(cell => !cell || cell.trim() === '')) continue
      if (row.length < rawHeaders.length) continue

      const rowData: any = {}
      rawHeaders.forEach((rawHeader, idx) => {
        const mappedHeader = headerMapping[rawHeader] || rawHeader.replace(/\s+/g, '_')
        const value = row[idx]?.trim()
        if (value) {
          rowData[mappedHeader] = value
        }
      })

      // Mapear tipo_movimento se vier como "Entrada" ou "Saída"
      if (rowData.tipo_movimento) {
        const tipo = rowData.tipo_movimento.toLowerCase()
        if (tipo.includes('entrada')) rowData.tipo_movimento = 'entrada'
        else if (tipo.includes('saída') || tipo.includes('saida')) rowData.tipo_movimento = 'saida'
      }

      try {
        const validated = transacaoSchema.parse(rowData)
        
        transacoes.push({
          data_movimento: convertDate(validated.data_movimento),
          data_vencimento: validated.data_vencimento ? convertDate(validated.data_vencimento) : null,
          data_emissao: validated.data_emissao ? convertDate(validated.data_emissao) : null,
          data_pagamento: validated.data_pagamento ? convertDate(validated.data_pagamento) : null,
          tipo_movimento: validated.tipo_movimento,
          forma_pagamento: validated.forma_pagamento,
          valor_original: validated.valor_original,
          valor_pago_recebido: validated.valor_pago_recebido,
          valor_movimentado_conta: validated.valor_movimentado_conta,
          valor_rateado_prestador: validated.valor_rateado_prestador,
          valor_diferenca: validated.valor_diferenca,
          categoria: validated.categoria,
          tipo_receita_despesa: validated.tipo_receita_despesa,
          banco_tipo: validated.banco_tipo,
          banco_nome: validated.banco_nome,
          referente: validated.referente,
          subcategoria: validated.subcategoria,
          tags: validated.tags ? validated.tags.split(',').map(t => t.trim()) : null,
        })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        errors.push({ row: i + 2, error: errorMsg })
        console.error(`Error parsing row ${i + 2}:`, errorMsg)
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
