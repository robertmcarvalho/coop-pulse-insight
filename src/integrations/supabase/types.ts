export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agregacoes_diarias: {
        Row: {
          created_at: string | null
          data: string
          id: string
          por_categoria: Json | null
          por_forma_pagamento: Json | null
          saldo_dia: number | null
          total_entradas: number | null
          total_saidas: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data: string
          id?: string
          por_categoria?: Json | null
          por_forma_pagamento?: Json | null
          saldo_dia?: number | null
          total_entradas?: number | null
          total_saidas?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data?: string
          id?: string
          por_categoria?: Json | null
          por_forma_pagamento?: Json | null
          saldo_dia?: number | null
          total_entradas?: number | null
          total_saidas?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      agregacoes_mensais: {
        Row: {
          amortizacao: number | null
          ano: number
          burn_rate: number | null
          ciclo_financeiro: number | null
          created_at: string | null
          custos_diretos: number | null
          depreciacao: number | null
          despesas_detalhadas: Json | null
          despesas_financeiras: number | null
          despesas_operacionais: number | null
          ebit: number | null
          ebitda: number | null
          fcf: number | null
          id: string
          impostos: number | null
          indicadores_operacionais: Json | null
          lucro_bruto: number | null
          lucro_liquido: number | null
          margem_bruta_pct: number | null
          margem_liquida_pct: number | null
          margem_operacional_pct: number | null
          mes: number
          periodo: string
          pmp: number | null
          pmr: number | null
          por_filial: Json | null
          receita_total: number | null
          saldo_final: number | null
          saldo_inicial: number | null
          updated_at: string | null
          variacao_mom_pct: number | null
          variacao_yoy_pct: number | null
        }
        Insert: {
          amortizacao?: number | null
          ano: number
          burn_rate?: number | null
          ciclo_financeiro?: number | null
          created_at?: string | null
          custos_diretos?: number | null
          depreciacao?: number | null
          despesas_detalhadas?: Json | null
          despesas_financeiras?: number | null
          despesas_operacionais?: number | null
          ebit?: number | null
          ebitda?: number | null
          fcf?: number | null
          id?: string
          impostos?: number | null
          indicadores_operacionais?: Json | null
          lucro_bruto?: number | null
          lucro_liquido?: number | null
          margem_bruta_pct?: number | null
          margem_liquida_pct?: number | null
          margem_operacional_pct?: number | null
          mes: number
          periodo: string
          pmp?: number | null
          pmr?: number | null
          por_filial?: Json | null
          receita_total?: number | null
          saldo_final?: number | null
          saldo_inicial?: number | null
          updated_at?: string | null
          variacao_mom_pct?: number | null
          variacao_yoy_pct?: number | null
        }
        Update: {
          amortizacao?: number | null
          ano?: number
          burn_rate?: number | null
          ciclo_financeiro?: number | null
          created_at?: string | null
          custos_diretos?: number | null
          depreciacao?: number | null
          despesas_detalhadas?: Json | null
          despesas_financeiras?: number | null
          despesas_operacionais?: number | null
          ebit?: number | null
          ebitda?: number | null
          fcf?: number | null
          id?: string
          impostos?: number | null
          indicadores_operacionais?: Json | null
          lucro_bruto?: number | null
          lucro_liquido?: number | null
          margem_bruta_pct?: number | null
          margem_liquida_pct?: number | null
          margem_operacional_pct?: number | null
          mes?: number
          periodo?: string
          pmp?: number | null
          pmr?: number | null
          por_filial?: Json | null
          receita_total?: number | null
          saldo_final?: number | null
          saldo_inicial?: number | null
          updated_at?: string | null
          variacao_mom_pct?: number | null
          variacao_yoy_pct?: number | null
        }
        Relationships: []
      }
      contexto_ia: {
        Row: {
          alertas: Json | null
          created_at: string | null
          destaques: string[] | null
          faqs: Json | null
          id: string
          insights_ia: string[] | null
          periodo: string
          piores_filiais: Json | null
          snapshot_geral: Json | null
          top_filiais: Json | null
          updated_at: string | null
        }
        Insert: {
          alertas?: Json | null
          created_at?: string | null
          destaques?: string[] | null
          faqs?: Json | null
          id?: string
          insights_ia?: string[] | null
          periodo: string
          piores_filiais?: Json | null
          snapshot_geral?: Json | null
          top_filiais?: Json | null
          updated_at?: string | null
        }
        Update: {
          alertas?: Json | null
          created_at?: string | null
          destaques?: string[] | null
          faqs?: Json | null
          id?: string
          insights_ia?: string[] | null
          periodo?: string
          piores_filiais?: Json | null
          snapshot_geral?: Json | null
          top_filiais?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      filiais: {
        Row: {
          codigo: string
          created_at: string | null
          id: string
          nome: string
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          codigo: string
          created_at?: string | null
          id?: string
          nome: string
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          codigo?: string
          created_at?: string | null
          id?: string
          nome?: string
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      metricas_filiais: {
        Row: {
          created_at: string | null
          custo_por_entrega: number | null
          custos: number | null
          ebitda: number | null
          filial_id: string | null
          id: string
          lucro: number | null
          margem_pct: number | null
          numero_entregas: number | null
          periodo: string
          ranking: number | null
          receita: number | null
          receita_por_entrega: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custo_por_entrega?: number | null
          custos?: number | null
          ebitda?: number | null
          filial_id?: string | null
          id?: string
          lucro?: number | null
          margem_pct?: number | null
          numero_entregas?: number | null
          periodo: string
          ranking?: number | null
          receita?: number | null
          receita_por_entrega?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custo_por_entrega?: number | null
          custos?: number | null
          ebitda?: number | null
          filial_id?: string | null
          id?: string
          lucro?: number | null
          margem_pct?: number | null
          numero_entregas?: number | null
          periodo?: string
          ranking?: number | null
          receita?: number | null
          receita_por_entrega?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metricas_filiais_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      partes: {
        Row: {
          codigo: string | null
          created_at: string | null
          id: string
          nome: string
          tipo: Database["public"]["Enums"]["tipo_parte"] | null
        }
        Insert: {
          codigo?: string | null
          created_at?: string | null
          id?: string
          nome: string
          tipo?: Database["public"]["Enums"]["tipo_parte"] | null
        }
        Update: {
          codigo?: string | null
          created_at?: string | null
          id?: string
          nome?: string
          tipo?: Database["public"]["Enums"]["tipo_parte"] | null
        }
        Relationships: []
      }
      plano_contas: {
        Row: {
          categoria: Database["public"]["Enums"]["categoria_transacao"] | null
          codigo: number
          created_at: string | null
          hierarquia: string | null
          id: string
          nome: string
          tipo: Database["public"]["Enums"]["tipo_receita_despesa"] | null
        }
        Insert: {
          categoria?: Database["public"]["Enums"]["categoria_transacao"] | null
          codigo: number
          created_at?: string | null
          hierarquia?: string | null
          id?: string
          nome: string
          tipo?: Database["public"]["Enums"]["tipo_receita_despesa"] | null
        }
        Update: {
          categoria?: Database["public"]["Enums"]["categoria_transacao"] | null
          codigo?: number
          created_at?: string | null
          hierarquia?: string | null
          id?: string
          nome?: string
          tipo?: Database["public"]["Enums"]["tipo_receita_despesa"] | null
        }
        Relationships: []
      }
      series_temporais: {
        Row: {
          created_at: string | null
          id: string
          media_movel_3m: number | null
          metrica: string
          periodo: string
          projecao: number | null
          valor: number
          variacao_pct: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          media_movel_3m?: number | null
          metrica: string
          periodo: string
          projecao?: number | null
          valor: number
          variacao_pct?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          media_movel_3m?: number | null
          metrica?: string
          periodo?: string
          projecao?: number | null
          valor?: number
          variacao_pct?: number | null
        }
        Relationships: []
      }
      transacoes: {
        Row: {
          banco_nome: string | null
          banco_tipo: Database["public"]["Enums"]["tipo_banco"] | null
          categoria: Database["public"]["Enums"]["categoria_transacao"] | null
          centro_custo_id: string | null
          conta_contabil_id: string | null
          created_at: string | null
          data_emissao: string | null
          data_movimento: string
          data_pagamento: string | null
          data_vencimento: string | null
          forma_pagamento: Database["public"]["Enums"]["forma_pagamento"] | null
          id: string
          numero_documento: string | null
          parceiro_id: string | null
          quem_gerou_id: string | null
          referente: string | null
          registro_compromisso: number | null
          registro_movimento: number | null
          subcategoria: string | null
          tags: string[] | null
          tipo_movimento: Database["public"]["Enums"]["tipo_movimento"]
          tipo_receita_despesa:
            | Database["public"]["Enums"]["tipo_receita_despesa"]
            | null
          titulo: string | null
          updated_at: string | null
          valor_diferenca: number | null
          valor_movimentado_conta: number | null
          valor_original: number
          valor_pago_recebido: number | null
          valor_rateado_prestador: number | null
          versao: number | null
        }
        Insert: {
          banco_nome?: string | null
          banco_tipo?: Database["public"]["Enums"]["tipo_banco"] | null
          categoria?: Database["public"]["Enums"]["categoria_transacao"] | null
          centro_custo_id?: string | null
          conta_contabil_id?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_movimento: string
          data_pagamento?: string | null
          data_vencimento?: string | null
          forma_pagamento?:
            | Database["public"]["Enums"]["forma_pagamento"]
            | null
          id?: string
          numero_documento?: string | null
          parceiro_id?: string | null
          quem_gerou_id?: string | null
          referente?: string | null
          registro_compromisso?: number | null
          registro_movimento?: number | null
          subcategoria?: string | null
          tags?: string[] | null
          tipo_movimento: Database["public"]["Enums"]["tipo_movimento"]
          tipo_receita_despesa?:
            | Database["public"]["Enums"]["tipo_receita_despesa"]
            | null
          titulo?: string | null
          updated_at?: string | null
          valor_diferenca?: number | null
          valor_movimentado_conta?: number | null
          valor_original: number
          valor_pago_recebido?: number | null
          valor_rateado_prestador?: number | null
          versao?: number | null
        }
        Update: {
          banco_nome?: string | null
          banco_tipo?: Database["public"]["Enums"]["tipo_banco"] | null
          categoria?: Database["public"]["Enums"]["categoria_transacao"] | null
          centro_custo_id?: string | null
          conta_contabil_id?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_movimento?: string
          data_pagamento?: string | null
          data_vencimento?: string | null
          forma_pagamento?:
            | Database["public"]["Enums"]["forma_pagamento"]
            | null
          id?: string
          numero_documento?: string | null
          parceiro_id?: string | null
          quem_gerou_id?: string | null
          referente?: string | null
          registro_compromisso?: number | null
          registro_movimento?: number | null
          subcategoria?: string | null
          tags?: string[] | null
          tipo_movimento?: Database["public"]["Enums"]["tipo_movimento"]
          tipo_receita_despesa?:
            | Database["public"]["Enums"]["tipo_receita_despesa"]
            | null
          titulo?: string | null
          updated_at?: string | null
          valor_diferenca?: number | null
          valor_movimentado_conta?: number | null
          valor_original?: number
          valor_pago_recebido?: number | null
          valor_rateado_prestador?: number | null
          versao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_conta_contabil_id_fkey"
            columns: ["conta_contabil_id"]
            isOneToOne: false
            referencedRelation: "plano_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_parceiro_id_fkey"
            columns: ["parceiro_id"]
            isOneToOne: false
            referencedRelation: "partes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_quem_gerou_id_fkey"
            columns: ["quem_gerou_id"]
            isOneToOne: false
            referencedRelation: "partes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      categoria_transacao: "RECEITA" | "DESPESA"
      forma_pagamento:
        | "DINHEIRO"
        | "BOLETO"
        | "NFSE"
        | "PIX"
        | "CARTAO_CREDITO"
        | "CARTAO_DEBITO"
        | "TRANSFERENCIA"
        | "OUTROS"
      tipo_banco: "CAIXA" | "BANCÁRIO"
      tipo_movimento: "ENTRADA" | "SAÍDA"
      tipo_parte: "PF" | "PJ" | "ENTREGADOR" | "FARMÁCIA" | "FILIAL"
      tipo_receita_despesa: "OPERACIONAL" | "FINANCEIRA" | "TRIBUTÁRIA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      categoria_transacao: ["RECEITA", "DESPESA"],
      forma_pagamento: [
        "DINHEIRO",
        "BOLETO",
        "NFSE",
        "PIX",
        "CARTAO_CREDITO",
        "CARTAO_DEBITO",
        "TRANSFERENCIA",
        "OUTROS",
      ],
      tipo_banco: ["CAIXA", "BANCÁRIO"],
      tipo_movimento: ["ENTRADA", "SAÍDA"],
      tipo_parte: ["PF", "PJ", "ENTREGADOR", "FARMÁCIA", "FILIAL"],
      tipo_receita_despesa: ["OPERACIONAL", "FINANCEIRA", "TRIBUTÁRIA"],
    },
  },
} as const
