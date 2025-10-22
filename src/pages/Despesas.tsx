import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Treemap,
  Area,
  AreaChart,
} from "recharts";

// Mock data
const waterfallData = [
  { name: "Receita", value: 816000, fill: "hsl(var(--success))" },
  { name: "Custos Diretos", value: -489600, fill: "hsl(var(--danger))" },
  { name: "Despesas Op.", value: -163200, fill: "hsl(var(--danger-light))" },
  { name: "Impostos", value: -81600, fill: "hsl(var(--warning))" },
  { name: "Desp. Financ.", value: -24480, fill: "hsl(var(--warning-light))" },
  { name: "Lucro Líquido", value: 57120, fill: "hsl(var(--primary))" },
];

const treemapData = [
  { name: "Pessoal", size: 85000, fill: "hsl(var(--danger))" },
  { name: "Combustível", size: 52000, fill: "hsl(var(--danger-light))" },
  { name: "Manutenção", size: 38000, fill: "hsl(var(--warning))" },
  { name: "Marketing", size: 28000, fill: "hsl(var(--warning-light))" },
  { name: "Tecnologia", size: 22000, fill: "hsl(var(--info))" },
  { name: "Administrativo", size: 18000, fill: "hsl(var(--info-light))" },
];

const timeSeriesData = [
  { mes: "Ago", Pessoal: 82, Combustível: 48, Manutenção: 35, Marketing: 25, Outros: 40 },
  { mes: "Set", Pessoal: 83, Combustível: 50, Manutenção: 37, Marketing: 26, Outros: 38 },
  { mes: "Out", Pessoal: 84, Combustível: 51, Manutenção: 36, Marketing: 27, Outros: 42 },
  { mes: "Nov", Pessoal: 85, Combustível: 49, Manutenção: 39, Marketing: 28, Outros: 41 },
  { mes: "Dez", Pessoal: 86, Combustível: 53, Manutenção: 38, Marketing: 29, Outros: 43 },
  { mes: "Jan", Pessoal: 85, Combustível: 52, Manutenção: 38, Marketing: 28, Outros: 40 },
];

const budgetData = [
  { categoria: "Pessoal", real: 85000, budget: 80000, variance: 6.25 },
  { categoria: "Combustível", real: 52000, budget: 55000, variance: -5.45 },
  { categoria: "Manutenção", real: 38000, budget: 35000, variance: 8.57 },
  { categoria: "Marketing", real: 28000, budget: 30000, variance: -6.67 },
  { categoria: "Tecnologia", real: 22000, budget: 20000, variance: 10.0 },
];

const Despesas = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Análise de Despesas</h1>
        <p className="text-muted-foreground mt-1">
          Detalhamento e tendências de custos operacionais
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 243k</div>
            <p className="text-xs text-muted-foreground mt-1">Janeiro 2025</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-danger/20 bg-danger-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Maior Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">R$ 85k</div>
            <p className="text-xs text-muted-foreground mt-1">Pessoal (35%)</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-warning/20 bg-warning-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              % da Receita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">29.8%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.1% vs Nov</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-primary/20 bg-info-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Variação Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+4.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Acima do previsto</p>
          </CardContent>
        </Card>
      </div>

      {/* Waterfall Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Waterfall: Receita → Lucro</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterfallData}>
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
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Treemap */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Composição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={treemapData}
                dataKey="size"
                stroke="hsl(var(--background))"
                fill="hsl(var(--primary))"
              >
                {treemapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Treemap>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget vs Real */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Budget vs Realizado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetData.map((item) => (
                <div key={item.categoria}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.categoria}</span>
                    <span className={item.variance > 0 ? "text-danger" : "text-success"}>
                      {item.variance > 0 ? "+" : ""}
                      {item.variance.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-primary/30"
                      style={{ width: `${(item.budget / 85000) * 100}%` }}
                    />
                    <div
                      className={`absolute h-full ${
                        item.variance > 0 ? "bg-danger" : "bg-success"
                      }`}
                      style={{ width: `${(item.real / 85000) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>R$ {(item.real / 1000).toFixed(0)}k</span>
                    <span>Budget: R$ {(item.budget / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Series */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Evolução Temporal por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Pessoal"
                stackId="1"
                stroke="hsl(var(--danger))"
                fill="hsl(var(--danger))"
              />
              <Area
                type="monotone"
                dataKey="Combustível"
                stackId="1"
                stroke="hsl(var(--danger-light))"
                fill="hsl(var(--danger-light))"
              />
              <Area
                type="monotone"
                dataKey="Manutenção"
                stackId="1"
                stroke="hsl(var(--warning))"
                fill="hsl(var(--warning))"
              />
              <Area
                type="monotone"
                dataKey="Marketing"
                stackId="1"
                stroke="hsl(var(--info))"
                fill="hsl(var(--info))"
              />
              <Area
                type="monotone"
                dataKey="Outros"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-card bg-gradient-subtle">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            <CardTitle className="text-lg">Alertas e Recomendações</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Badge variant="destructive" className="mt-1">Alto</Badge>
              <p className="text-sm text-foreground">
                <span className="font-semibold">Pessoal 6.25% acima do budget.</span> Revisar
                horas extras e contratações temporárias.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <Badge className="bg-warning mt-1">Atenção</Badge>
              <p className="text-sm text-foreground">
                <span className="font-semibold">Manutenção crescendo 8.6%.</span> Avaliar
                contratos com oficinas e preventivas.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <Badge className="bg-success mt-1">Positivo</Badge>
              <p className="text-sm text-foreground">
                <span className="font-semibold">Combustível 5.5% abaixo.</span> Negociação de
                postos e otimização de rotas funcionando.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Despesas;
