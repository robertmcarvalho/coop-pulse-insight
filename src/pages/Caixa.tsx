import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Area,
  AreaChart,
} from "recharts";

// Mock data
const waterfallCaixaData = [
  { name: "Saldo Inicial", value: 142000, fill: "hsl(var(--primary))" },
  { name: "Entradas Op.", value: 680000, fill: "hsl(var(--success))" },
  { name: "Saídas Op.", value: -510000, fill: "hsl(var(--danger))" },
  { name: "Investimentos", value: -45000, fill: "hsl(var(--warning))" },
  { name: "Financiamentos", value: 30000, fill: "hsl(var(--info))" },
  { name: "Saldo Final", value: 297000, fill: "hsl(var(--primary))" },
];

const fluxoMensalData = [
  { mes: "Ago", entradas: 620, saidas: -480, saldo: 140 },
  { mes: "Set", entradas: 655, saidas: -495, saldo: 160 },
  { mes: "Out", entradas: 670, saidas: -505, saldo: 165 },
  { mes: "Nov", entradas: 690, saidas: -520, saldo: 170 },
  { mes: "Dez", entradas: 710, saidas: -535, saldo: 175 },
  { mes: "Jan", entradas: 680, saidas: -510, saldo: 170 },
];

const saldoAcumuladoData = [
  { mes: "Ago", saldo: 142, projecao: null },
  { mes: "Set", saldo: 160, projecao: null },
  { mes: "Out", saldo: 165, projecao: null },
  { mes: "Nov", saldo: 170, projecao: null },
  { mes: "Dez", saldo: 175, projecao: null },
  { mes: "Jan", saldo: 170, projecao: 170 },
  { mes: "Fev", saldo: null, projecao: 185 },
  { mes: "Mar", saldo: null, projecao: 195 },
  { mes: "Abr", saldo: null, projecao: 210 },
];

const cicloFinanceiroData = [
  { etapa: "PMR", dias: 28, fill: "hsl(var(--info))" },
  { etapa: "Estoque", dias: 5, fill: "hsl(var(--warning))" },
  { etapa: "PMP", dias: -35, fill: "hsl(var(--success))" },
  { etapa: "Ciclo Líq.", dias: -2, fill: "hsl(var(--primary))" },
];

const capitalGiroData = [
  { mes: "Ago", necessario: 150, disponivel: 165 },
  { mes: "Set", necessario: 155, disponivel: 170 },
  { mes: "Out", necessario: 160, disponivel: 172 },
  { mes: "Nov", necessario: 165, disponivel: 175 },
  { mes: "Dez", necessario: 170, disponivel: 178 },
  { mes: "Jan", necessario: 175, disponivel: 180 },
];

const agingRecebiveis = [
  { faixa: "0-30d", valor: 120, fill: "hsl(var(--success))" },
  { faixa: "31-60d", valor: 45, fill: "hsl(var(--warning))" },
  { faixa: "61-90d", valor: 18, fill: "hsl(var(--danger-light))" },
  { faixa: ">90d", valor: 12, fill: "hsl(var(--danger))" },
];

const pddData = [
  { mes: "Ago", provisao: 2.8, limite_inf: 2.0, limite_sup: 4.0 },
  { mes: "Set", provisao: 3.0, limite_inf: 2.0, limite_sup: 4.0 },
  { mes: "Out", provisao: 2.9, limite_inf: 2.0, limite_sup: 4.0 },
  { mes: "Nov", provisao: 3.1, limite_inf: 2.0, limite_sup: 4.0 },
  { mes: "Dez", provisao: 3.3, limite_inf: 2.0, limite_sup: 4.0 },
  { mes: "Jan", provisao: 3.2, limite_inf: 2.0, limite_sup: 4.0 },
];

const Caixa = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fluxo de Caixa</h1>
        <p className="text-muted-foreground mt-1">
          Movimentações, projeções e ciclo financeiro
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="shadow-card border-primary/20 bg-info-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ 297k</div>
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+9.1% vs mês</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-success/20 bg-success-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              FCF (Jan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">R$ 125k</div>
            <p className="text-xs text-muted-foreground mt-1">Free Cash Flow</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-danger/20 bg-danger-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Burn Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">R$ 28k</div>
            <p className="text-xs text-muted-foreground mt-1">Queima mensal</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-warning/20 bg-warning-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ciclo Financeiro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">-2 dias</div>
            <p className="text-xs text-muted-foreground mt-1">Ciclo operacional</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-info/20 bg-info-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Capital de Giro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">R$ 180k</div>
            <p className="text-xs text-muted-foreground mt-1">Disponível</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-danger/20 bg-danger-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inadimplência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">3.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Taxa atual</p>
          </CardContent>
        </Card>
      </div>

      {/* Waterfall */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Waterfall: Movimentação de Caixa (Jan 2025)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterfallCaixaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Bar dataKey="value">
                {waterfallCaixaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Entradas/Saídas */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Entradas vs Saídas (6 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fluxoMensalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="entradas" fill="hsl(var(--success))" />
                <Bar dataKey="saidas" fill="hsl(var(--danger))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ciclo Financeiro */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Funil do Ciclo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cicloFinanceiroData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="etapa" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="dias">
                  {cicloFinanceiroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">PMR (Prazo Médio Recebimento):</span>
                <span className="font-semibold">28 dias</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PMP (Prazo Médio Pagamento):</span>
                <span className="font-semibold">35 dias</span>
              </div>
              <div className="flex justify-between border-t pt-2 border-border">
                <span className="text-muted-foreground font-medium">Ciclo Líquido:</span>
                <span className="font-bold text-success">-2 dias (Positivo)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saldo + Projeção */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Saldo Acumulado + Projeção Linear</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={saldoAcumuladoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Line
                type="monotone"
                dataKey="saldo"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="projecao"
                stroke="hsl(var(--info))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--info))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Capital de Giro + Inadimplência */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Capital de Giro</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capitalGiroData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="necessario" fill="hsl(var(--warning))" name="Necessário" />
                <Bar dataKey="disponivel" fill="hsl(var(--success))" name="Disponível" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gap Médio:</span>
                <span className="font-semibold text-success">+R$ 8k (Saudável)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Aging de Recebíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agingRecebiveis}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="faixa" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="valor">
                  {agingRecebiveis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total a Receber:</span>
                <span className="font-semibold">R$ 195k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vencidos (&gt;30d):</span>
                <span className="font-semibold text-danger">R$ 75k (38%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PDD - Provisão para Devedores Duvidosos */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>PDD - Provisão para Devedores Duvidosos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pddData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 5]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Line
                type="monotone"
                dataKey="limite_sup"
                stroke="hsl(var(--danger-light))"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                name="Limite Superior"
              />
              <Line
                type="monotone"
                dataKey="limite_inf"
                stroke="hsl(var(--success-light))"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                name="Limite Inferior"
              />
              <Line
                type="monotone"
                dataKey="provisao"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
                name="Provisão %"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provisão Atual (Jan):</span>
              <span className="font-semibold">3.2% (Dentro da meta)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-card bg-gradient-subtle">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Análise de Liquidez</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-success shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Ciclo Financeiro Negativo (-2 dias)</span> indica
                que recebemos antes de pagar fornecedores — excelente para liquidez.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Projeção de R$ 210k para Abril</span> com tendência
                de crescimento sustentável (+12% trimestre).
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-warning shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Burn Rate estável em R$ 28k/mês.</span> Monitorar
                para garantir runway de 10+ meses.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Caixa;
