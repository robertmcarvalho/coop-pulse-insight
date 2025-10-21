-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE tipo_movimento AS ENUM ('ENTRADA', 'SAÍDA');
CREATE TYPE forma_pagamento AS ENUM ('DINHEIRO', 'BOLETO', 'NFSE', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'TRANSFERENCIA', 'OUTROS');
CREATE TYPE tipo_parte AS ENUM ('PF', 'PJ', 'ENTREGADOR', 'FARMÁCIA', 'FILIAL');
CREATE TYPE categoria_transacao AS ENUM ('RECEITA', 'DESPESA');
CREATE TYPE tipo_receita_despesa AS ENUM ('OPERACIONAL', 'FINANCEIRA', 'TRIBUTÁRIA');
CREATE TYPE tipo_banco AS ENUM ('CAIXA', 'BANCÁRIO');

-- Tabela de filiais
CREATE TABLE filiais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  tipo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de plano de contas
CREATE TABLE plano_contas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo INTEGER UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  hierarquia TEXT,
  categoria categoria_transacao,
  tipo tipo_receita_despesa,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de partes/parceiros
CREATE TABLE partes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo TEXT,
  nome TEXT NOT NULL,
  tipo tipo_parte,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela principal de transações
CREATE TABLE transacoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data_movimento DATE NOT NULL,
  data_vencimento DATE,
  data_emissao DATE,
  data_pagamento DATE,
  tipo_movimento tipo_movimento NOT NULL,
  forma_pagamento forma_pagamento,
  numero_documento TEXT,
  
  -- Valores
  valor_original DECIMAL(15, 2) NOT NULL,
  valor_pago_recebido DECIMAL(15, 2),
  valor_movimentado_conta DECIMAL(15, 2),
  valor_rateado_prestador DECIMAL(15, 2),
  valor_diferenca DECIMAL(15, 2) GENERATED ALWAYS AS (valor_original - COALESCE(valor_pago_recebido, 0)) STORED,
  
  -- Relacionamentos
  quem_gerou_id UUID REFERENCES partes(id),
  parceiro_id UUID REFERENCES partes(id),
  centro_custo_id UUID REFERENCES filiais(id),
  conta_contabil_id UUID REFERENCES plano_contas(id),
  
  -- Classificação
  categoria categoria_transacao,
  subcategoria TEXT,
  tipo_receita_despesa tipo_receita_despesa,
  
  -- Descrição
  titulo TEXT,
  referente TEXT,
  
  -- Banco
  banco_nome TEXT,
  banco_tipo tipo_banco,
  
  -- Registros
  registro_movimento INTEGER,
  registro_compromisso INTEGER,
  
  -- Metadados
  tags TEXT[],
  versao INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_transacoes_data_movimento ON transacoes(data_movimento);
CREATE INDEX idx_transacoes_centro_custo ON transacoes(centro_custo_id);
CREATE INDEX idx_transacoes_tipo_movimento ON transacoes(tipo_movimento);
CREATE INDEX idx_transacoes_forma_pagamento ON transacoes(forma_pagamento);

-- Tabela de agregações diárias
CREATE TABLE agregacoes_diarias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data DATE UNIQUE NOT NULL,
  total_entradas DECIMAL(15, 2) DEFAULT 0,
  total_saidas DECIMAL(15, 2) DEFAULT 0,
  saldo_dia DECIMAL(15, 2) GENERATED ALWAYS AS (total_entradas - total_saidas) STORED,
  por_forma_pagamento JSONB,
  por_categoria JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de agregações mensais
CREATE TABLE agregacoes_mensais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  periodo TEXT UNIQUE NOT NULL, -- formato: YYYY-MM
  ano INTEGER NOT NULL,
  mes INTEGER NOT NULL,
  
  -- DRE
  receita_total DECIMAL(15, 2) DEFAULT 0,
  custos_diretos DECIMAL(15, 2) DEFAULT 0,
  lucro_bruto DECIMAL(15, 2) GENERATED ALWAYS AS (receita_total - custos_diretos) STORED,
  despesas_operacionais DECIMAL(15, 2) DEFAULT 0,
  ebit DECIMAL(15, 2) GENERATED ALWAYS AS (receita_total - custos_diretos - despesas_operacionais) STORED,
  depreciacao DECIMAL(15, 2) DEFAULT 0,
  amortizacao DECIMAL(15, 2) DEFAULT 0,
  ebitda DECIMAL(15, 2) GENERATED ALWAYS AS (receita_total - custos_diretos - despesas_operacionais + depreciacao + amortizacao) STORED,
  impostos DECIMAL(15, 2) DEFAULT 0,
  despesas_financeiras DECIMAL(15, 2) DEFAULT 0,
  lucro_liquido DECIMAL(15, 2) GENERATED ALWAYS AS (receita_total - custos_diretos - despesas_operacionais - impostos - despesas_financeiras) STORED,
  
  -- Margens
  margem_bruta_pct DECIMAL(5, 2),
  margem_operacional_pct DECIMAL(5, 2),
  margem_liquida_pct DECIMAL(5, 2),
  
  -- Variações
  variacao_mom_pct DECIMAL(5, 2),
  variacao_yoy_pct DECIMAL(5, 2),
  
  -- Fluxo de caixa
  saldo_inicial DECIMAL(15, 2) DEFAULT 0,
  saldo_final DECIMAL(15, 2) DEFAULT 0,
  fcf DECIMAL(15, 2),
  burn_rate DECIMAL(15, 2),
  
  -- Ciclo financeiro
  pmr DECIMAL(5, 2), -- Prazo Médio de Recebimento
  pmp DECIMAL(5, 2), -- Prazo Médio de Pagamento
  ciclo_financeiro DECIMAL(5, 2),
  
  -- Dados detalhados
  por_filial JSONB,
  despesas_detalhadas JSONB,
  indicadores_operacionais JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agregacoes_mensais_periodo ON agregacoes_mensais(periodo);
CREATE INDEX idx_agregacoes_mensais_ano_mes ON agregacoes_mensais(ano, mes);

-- Tabela de métricas por filial
CREATE TABLE metricas_filiais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filial_id UUID REFERENCES filiais(id) ON DELETE CASCADE,
  periodo TEXT NOT NULL, -- formato: YYYY-MM
  receita DECIMAL(15, 2) DEFAULT 0,
  custos DECIMAL(15, 2) DEFAULT 0,
  lucro DECIMAL(15, 2) GENERATED ALWAYS AS (receita - custos) STORED,
  margem_pct DECIMAL(5, 2),
  ebitda DECIMAL(15, 2) DEFAULT 0,
  numero_entregas INTEGER DEFAULT 0,
  receita_por_entrega DECIMAL(15, 2),
  custo_por_entrega DECIMAL(15, 2),
  ranking INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(filial_id, periodo)
);

CREATE INDEX idx_metricas_filiais_periodo ON metricas_filiais(periodo);
CREATE INDEX idx_metricas_filiais_ranking ON metricas_filiais(ranking);

-- Tabela de séries temporais
CREATE TABLE series_temporais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metrica TEXT NOT NULL,
  periodo TEXT NOT NULL, -- formato: YYYY-MM
  valor DECIMAL(15, 2) NOT NULL,
  variacao_pct DECIMAL(5, 2),
  media_movel_3m DECIMAL(15, 2),
  projecao DECIMAL(15, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(metrica, periodo)
);

CREATE INDEX idx_series_temporais_metrica ON series_temporais(metrica);
CREATE INDEX idx_series_temporais_periodo ON series_temporais(periodo);

-- Tabela de contexto para IA
CREATE TABLE contexto_ia (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  periodo TEXT UNIQUE NOT NULL, -- 'latest' ou 'YYYY-MM-DD'
  snapshot_geral JSONB,
  destaques TEXT[],
  alertas JSONB,
  top_filiais JSONB,
  piores_filiais JSONB,
  insights_ia TEXT[],
  faqs JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_filiais_updated_at BEFORE UPDATE ON filiais
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transacoes_updated_at BEFORE UPDATE ON transacoes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agregacoes_diarias_updated_at BEFORE UPDATE ON agregacoes_diarias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agregacoes_mensais_updated_at BEFORE UPDATE ON agregacoes_mensais
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metricas_filiais_updated_at BEFORE UPDATE ON metricas_filiais
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contexto_ia_updated_at BEFORE UPDATE ON contexto_ia
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies (todas as tabelas serão públicas para este dashboard interno)
ALTER TABLE filiais ENABLE ROW LEVEL SECURITY;
ALTER TABLE plano_contas ENABLE ROW LEVEL SECURITY;
ALTER TABLE partes ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agregacoes_diarias ENABLE ROW LEVEL SECURITY;
ALTER TABLE agregacoes_mensais ENABLE ROW LEVEL SECURITY;
ALTER TABLE metricas_filiais ENABLE ROW LEVEL SECURITY;
ALTER TABLE series_temporais ENABLE ROW LEVEL SECURITY;
ALTER TABLE contexto_ia ENABLE ROW LEVEL SECURITY;

-- Políticas permissivas para dashboard interno (ajustar conforme necessidade de segurança)
CREATE POLICY "Permitir leitura de filiais" ON filiais FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de filiais" ON filiais FOR ALL USING (true);

CREATE POLICY "Permitir leitura de plano_contas" ON plano_contas FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de plano_contas" ON plano_contas FOR ALL USING (true);

CREATE POLICY "Permitir leitura de partes" ON partes FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de partes" ON partes FOR ALL USING (true);

CREATE POLICY "Permitir leitura de transacoes" ON transacoes FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de transacoes" ON transacoes FOR ALL USING (true);

CREATE POLICY "Permitir leitura de agregacoes_diarias" ON agregacoes_diarias FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de agregacoes_diarias" ON agregacoes_diarias FOR ALL USING (true);

CREATE POLICY "Permitir leitura de agregacoes_mensais" ON agregacoes_mensais FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de agregacoes_mensais" ON agregacoes_mensais FOR ALL USING (true);

CREATE POLICY "Permitir leitura de metricas_filiais" ON metricas_filiais FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de metricas_filiais" ON metricas_filiais FOR ALL USING (true);

CREATE POLICY "Permitir leitura de series_temporais" ON series_temporais FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de series_temporais" ON series_temporais FOR ALL USING (true);

CREATE POLICY "Permitir leitura de contexto_ia" ON contexto_ia FOR SELECT USING (true);
CREATE POLICY "Permitir escrita de contexto_ia" ON contexto_ia FOR ALL USING (true);