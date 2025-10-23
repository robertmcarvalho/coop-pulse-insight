import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Target, Zap, AlertCircle } from "lucide-react";
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ReferenceLine,
  Cell,
} from "recharts";

// Mock Data - 6.1 Valuation e Valor
const valuationData = [
  { metric: "ROE", value: 18.5, max: 30, fill: "hsl(142, 71%, 45%)" },
  { metric: "ROA", value: 12.3, max: 20, fill: "hsl(217, 91%, 60%)" },
  { metric: "ROIC", value: 15.8, max: 25, fill: "hsl(220, 70%, 50%)" },
];

const roiComparisonData = [
  { period: "2023 Q1", value: 12.5 },
  { period: "2023 Q2", value: 14.2 },
  { period: "2023 Q3", value: 15.8 },
  { period: "2023 Q4", value: 16.3 },
  { period: "2024 Q1", value: 18.5 },
];

// Mock Data - 6.2 Métricas de Mercado
const ltvProjectionData = [
  { month: "Jan", actual: 2850, projection: null },
  { month: "Fev", actual: 2920, projection: null },
  { month: "Mar", actual: 3100, projection: null },
  { month: "Abr", actual: 3250, projection: null },
  { month: "Mai", actual: 3400, projection: null },
  { month: "Jun", actual: null, projection: 3550 },
  { month: "Jul", actual: null, projection: 3700 },
  { month: "Ago", actual: null, projection: 3850 },
];

const cacData = [
  { canal: "Orgânico", cac: 450 },
  { canal: "Parceiros", cac: 680 },
  { canal: "Indicação", cac: 320 },
  { canal: "Ads Online", cac: 890 },
  { canal: "Eventos", cac: 1200 },
];

// Mock Data - 6.3 Projeções
const forecastData = [
  { month: "Jan", real: 145000, forecast: null, lower: null, upper: null },
  { month: "Fev", real: 152000, forecast: null, lower: null, upper: null },
  { month: "Mar", real: 148000, forecast: null, lower: null, upper: null },
  { month: "Abr", real: 163000, forecast: null, lower: null, upper: null },
  { month: "Mai", real: 171000, forecast: null, lower: null, upper: null },
  { month: "Jun", real: null, forecast: 178000, lower: 165000, upper: 191000 },
  { month: "Jul", real: null, forecast: 185000, lower: 170000, upper: 200000 },
  { month: "Ago", real: null, forecast: 192000, lower: 175000, upper: 209000 },
  { month: "Set", real: null, forecast: 198000, lower: 180000, upper: 216000 },
];

const scenarioOptimista = [
  { month: "Jun", value: 178000 },
  { month: "Jul", value: 195000 },
  { month: "Ago", value: 212000 },
  { month: "Set", value: 228000 },
];

const scenarioRealista = [
  { month: "Jun", value: 178000 },
  { month: "Jul", value: 185000 },
  { month: "Ago", value: 192000 },
  { month: "Set", value: 198000 },
];

const scenarioPessimista = [
  { month: "Jun", value: 178000 },
  { month: "Jul", value: 175000 },
  { month: "Ago", value: 172000 },
  { month: "Set", value: 168000 },
];

const Estrategico = () => {
  const ltvValue = 3400;
  const avgCac = 708;
  const ltvCacRatio = (ltvValue / avgCac).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Indicadores Estratégicos</h1>
        <p className="text-muted-foreground mt-1">
          Valuation, métricas de mercado e projeções de crescimento
        </p>
      </div>

      {/* 6.1 VALUATION E VALOR */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Valuation e Valor
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            ROE, ROA, ROIC e evolução de rentabilidade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radial Bar Chart - ROE/ROA/ROIC */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Rentabilidade</CardTitle>
              <CardDescription>
                Return on Equity, Assets e Invested Capital
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="20%"
                  outerRadius="90%"
                  data={valuationData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 30]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value, entry: any) => {
                      const item = valuationData.find((d) => d.metric === entry.payload.metric);
                      return `${value}: ${item?.value}%`;
                    }}
                  />
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-card p-3 border border-border rounded-lg shadow-lg">
                            <p className="font-semibold text-foreground">{data.metric}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.value}% de {data.max}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Slope Graph - Comparativo ROI */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do ROI</CardTitle>
              <CardDescription>Comparativo trimestral de retorno sobre investimento</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={roiComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth={3}
                    name="ROI (%)"
                    dot={{ fill: "hsl(142, 71%, 45%)", r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">
                  Crescimento de <strong className="text-success">48%</strong> em 4 trimestres
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 6.2 MÉTRICAS DE MERCADO */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Métricas de Mercado
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            LTV, CAC e índices de eficiência de aquisição
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="LTV (Lifetime Value)"
            value={`R$ ${ltvValue.toLocaleString("pt-BR")}`}
            change={19.5}
            icon={<TrendingUp />}
            description="Valor vitalício do cliente"
          />
          <MetricCard
            title="CAC Médio"
            value={`R$ ${avgCac.toLocaleString("pt-BR")}`}
            change={-8.3}
            icon={<Target />}
            description="Custo médio de aquisição"
          />
          <MetricCard
            title="Ratio LTV/CAC"
            value={`${ltvCacRatio}:1`}
            change={30.2}
            icon={<Zap />}
            description={
              parseFloat(ltvCacRatio) >= 3
                ? "Excelente eficiência"
                : "Melhorar eficiência"
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LTV com Projeção */}
          <Card>
            <CardHeader>
              <CardTitle>LTV - Projeção de Valor</CardTitle>
              <CardDescription>Histórico e projeção futura do LTV</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={ltvProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(220, 70%, 50%)"
                    strokeWidth={2}
                    name="Real (R$)"
                    dot={{ fill: "hsl(220, 70%, 50%)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projection"
                    stroke="hsl(217, 91%, 60%)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Projeção (R$)"
                    dot={{ fill: "hsl(217, 91%, 60%)" }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CAC por Canal */}
          <Card>
            <CardHeader>
              <CardTitle>CAC por Canal de Aquisição</CardTitle>
              <CardDescription>
                Comparação com linha de referência LTV (R$ {ltvValue})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={cacData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="canal" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <ReferenceLine
                    x={ltvValue / 3}
                    stroke="hsl(142, 71%, 45%)"
                    strokeDasharray="3 3"
                    label={{
                      value: "LTV/3 (Ideal)",
                      position: "top",
                      fill: "hsl(142, 71%, 45%)",
                    }}
                  />
                  <Bar dataKey="cac" name="CAC (R$)">
                    {cacData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.cac <= ltvValue / 3
                            ? "hsl(142, 71%, 45%)"
                            : entry.cac <= ltvValue / 2
                            ? "hsl(38, 92%, 50%)"
                            : "hsl(0, 84%, 60%)"
                        }
                      />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(142, 71%, 45%)" }} />
                  <span className="text-muted-foreground">Excelente (CAC ≤ LTV/3)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(38, 92%, 50%)" }} />
                  <span className="text-muted-foreground">Aceitável (LTV/3 &lt; CAC ≤ LTV/2)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(0, 84%, 60%)" }} />
                  <span className="text-muted-foreground">Requer atenção (CAC &gt; LTV/2)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gauge LTV/CAC Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>LTV/CAC Ratio - Eficiência de Aquisição</CardTitle>
            <CardDescription>
              Referência ideal: 3:1 ou superior (cada R$ 1 investido retorna R$ 3)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Progress value={(parseFloat(ltvCacRatio) / 5) * 100} className="h-6" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">
                    {ltvCacRatio}:1
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-xs text-center">
                <div>
                  <div className="font-medium text-danger">0-1</div>
                  <div className="text-muted-foreground">Crítico</div>
                </div>
                <div>
                  <div className="font-medium text-warning">1-2</div>
                  <div className="text-muted-foreground">Baixo</div>
                </div>
                <div>
                  <div className="font-medium text-info">2-3</div>
                  <div className="text-muted-foreground">Regular</div>
                </div>
                <div>
                  <div className="font-medium text-success">3-4</div>
                  <div className="text-muted-foreground">Bom</div>
                </div>
                <div>
                  <div className="font-medium text-success">4+</div>
                  <div className="text-muted-foreground">Excelente</div>
                </div>
              </div>
              {parseFloat(ltvCacRatio) >= 3 ? (
                <Badge className="w-full justify-center py-2" variant="default">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Eficiência excelente - Continue otimizando
                </Badge>
              ) : (
                <Badge className="w-full justify-center py-2 bg-warning text-warning-foreground">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Oportunidade de melhoria - Reduzir CAC ou aumentar LTV
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 6.3 PROJEÇÕES */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Projeções e Cenários
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Forecast de receitas com intervalos de confiança e cenários múltiplos
          </p>
        </div>

        {/* Forecast com Intervalo de Confiança */}
        <Card>
          <CardHeader>
            <CardTitle>Forecast de Receitas</CardTitle>
            <CardDescription>
              Projeção com intervalo de confiança de 95% (banda sombreada)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => `R$ ${value?.toLocaleString("pt-BR")}`}
                />
                <Legend />
                {/* Área sombreada do intervalo de confiança */}
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="none"
                  fill="hsl(217, 91%, 60%)"
                  fillOpacity={0.2}
                  name="IC Superior"
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="none"
                  fill="hsl(217, 91%, 60%)"
                  fillOpacity={0.2}
                  name="IC Inferior"
                />
                {/* Linha histórica */}
                <Line
                  type="monotone"
                  dataKey="real"
                  stroke="hsl(220, 70%, 50%)"
                  strokeWidth={3}
                  name="Realizado (R$)"
                  dot={{ fill: "hsl(220, 70%, 50%)", r: 4 }}
                />
                {/* Linha de forecast */}
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Projeção (R$)"
                  dot={{ fill: "hsl(217, 91%, 60%)", r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cenários - Small Multiples */}
        <Card>
          <CardHeader>
            <CardTitle>Análise de Cenários</CardTitle>
            <CardDescription>
              Projeções paralelas: Otimista (+20%), Realista (base) e Pessimista (-10%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cenário Otimista */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Otimista</h4>
                  <Badge className="bg-success text-success-foreground">+20%</Badge>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <ComposedChart data={scenarioOptimista}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => `R$ ${value?.toLocaleString("pt-BR")}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(142, 71%, 45%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(142, 71%, 45%)" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2">
                  Meta: R$ 228k em Set/24
                </p>
              </div>

              {/* Cenário Realista */}
              <div className="border border-border rounded-lg p-4 bg-accent/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Realista</h4>
                  <Badge className="bg-info text-info-foreground">Base</Badge>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <ComposedChart data={scenarioRealista}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => `R$ ${value?.toLocaleString("pt-BR")}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(220, 70%, 50%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(220, 70%, 50%)" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2">
                  Meta: R$ 198k em Set/24
                </p>
              </div>

              {/* Cenário Pessimista */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Pessimista</h4>
                  <Badge className="bg-danger text-danger-foreground">-10%</Badge>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <ComposedChart data={scenarioPessimista}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => `R$ ${value?.toLocaleString("pt-BR")}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(0, 84%, 60%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(0, 84%, 60%)" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2">
                  Meta: R$ 168k em Set/24
                </p>
              </div>
            </div>

            {/* Insights de Cenários */}
            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-info mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Cenário Base:</strong> Crescimento
                  moderado de 3.7% a.m. baseado em tendências históricas
                </p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Gatilhos Otimistas:</strong> Expansão de
                  parcerias, novos canais de aquisição, melhorias operacionais
                </p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-danger mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Riscos Pessimistas:</strong> Aumento de
                  inadimplência, perda de parceiros estratégicos, pressão competitiva
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Estrategico;
