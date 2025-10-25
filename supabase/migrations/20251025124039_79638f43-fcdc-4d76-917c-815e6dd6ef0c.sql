-- Update RLS policies for financial tables to use role-based access

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Permitir leitura de transacoes" ON transacoes;
DROP POLICY IF EXISTS "Permitir escrita de transacoes" ON transacoes;
DROP POLICY IF EXISTS "Permitir leitura de agregacoes_diarias" ON agregacoes_diarias;
DROP POLICY IF EXISTS "Permitir escrita de agregacoes_diarias" ON agregacoes_diarias;
DROP POLICY IF EXISTS "Permitir leitura de agregacoes_mensais" ON agregacoes_mensais;
DROP POLICY IF EXISTS "Permitir escrita de agregacoes_mensais" ON agregacoes_mensais;
DROP POLICY IF EXISTS "Permitir leitura de filiais" ON filiais;
DROP POLICY IF EXISTS "Permitir escrita de filiais" ON filiais;
DROP POLICY IF EXISTS "Permitir leitura de metricas_filiais" ON metricas_filiais;
DROP POLICY IF EXISTS "Permitir escrita de metricas_filiais" ON metricas_filiais;
DROP POLICY IF EXISTS "Permitir leitura de plano_contas" ON plano_contas;
DROP POLICY IF EXISTS "Permitir escrita de plano_contas" ON plano_contas;
DROP POLICY IF EXISTS "Permitir leitura de partes" ON partes;
DROP POLICY IF EXISTS "Permitir escrita de partes" ON partes;
DROP POLICY IF EXISTS "Permitir leitura de contexto_ia" ON contexto_ia;
DROP POLICY IF EXISTS "Permitir escrita de contexto_ia" ON contexto_ia;
DROP POLICY IF EXISTS "Permitir leitura de series_temporais" ON series_temporais;
DROP POLICY IF EXISTS "Permitir escrita de series_temporais" ON series_temporais;

-- Create new role-based policies for transacoes
CREATE POLICY "Authenticated users can view transacoes"
ON transacoes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can insert transacoes"
ON transacoes FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager'));

CREATE POLICY "Admins and managers can update transacoes"
ON transacoes FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager'));

CREATE POLICY "Admins can delete transacoes"
ON transacoes FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create new role-based policies for agregacoes_diarias
CREATE POLICY "Authenticated users can view agregacoes_diarias"
ON agregacoes_diarias FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage agregacoes_diarias"
ON agregacoes_diarias FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager'));

-- Create new role-based policies for agregacoes_mensais
CREATE POLICY "Authenticated users can view agregacoes_mensais"
ON agregacoes_mensais FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage agregacoes_mensais"
ON agregacoes_mensais FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager'));

-- Create new role-based policies for filiais
CREATE POLICY "Authenticated users can view filiais"
ON filiais FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage filiais"
ON filiais FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create new role-based policies for metricas_filiais
CREATE POLICY "Authenticated users can view metricas_filiais"
ON metricas_filiais FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage metricas_filiais"
ON metricas_filiais FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager'));

-- Create new role-based policies for plano_contas
CREATE POLICY "Authenticated users can view plano_contas"
ON plano_contas FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage plano_contas"
ON plano_contas FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create new role-based policies for partes
CREATE POLICY "Authenticated users can view partes"
ON partes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage partes"
ON partes FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create new role-based policies for contexto_ia
CREATE POLICY "Authenticated users can view contexto_ia"
ON contexto_ia FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage contexto_ia"
ON contexto_ia FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager'));

-- Create new role-based policies for series_temporais
CREATE POLICY "Authenticated users can view series_temporais"
ON series_temporais FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage series_temporais"
ON series_temporais FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager'));