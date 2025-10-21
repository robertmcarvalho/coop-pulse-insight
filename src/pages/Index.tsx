import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Percent,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Dados mock - serão substituídos por dados reais da API
const mockTrendData = [
  { mes: "Jun", receita: 450000, custo: 320000, lucro: 130000 },
  { mes: "Jul", receita: 520000, custo: 365000, lucro: 155000 },
  { mes: "Ago", receita: 480000, custo: 340000, lucro: 140000 },
  { mes: "Set", receita: 580000, custo: 395000, lucro: 185000 },
  { mes: "Out", receita: 620000, custo: 410000, lucro: 210000 },
  { mes: "Nov", receita: 680000, custo: 445000, lucro: 235000 },
];

const mockMarginData = [
  { mes: "Jun", margem_bruta: 28.9, margem_operacional: 22.1, margem_liquida: 18.5 },
  { mes: "Jul", margem_bruta: 29.8, margem_operacional: 23.4, margem_liquida: 19.2 },
  { mes: "Ago", margem_bruta: 29.2, margem_operacional: 22.8, margem_liquida: 18.9 },
  { mes: "Set", margem_bruta: 31.9, margem_operacional: 25.1, margem_liquida: 21.3 },
  { mes: "Out", margem_bruta: 33.9, margem_operacional: 26.8, margem_liquida: 22.7 },
  { mes: "Nov", margem_bruta: 34.6, margem_operacional: 27.5, margem_liquida: 23.4 },
];

const mockFiliaisData = [
  { nome: "Filial Centro", receita: 145000, crescimento: 12.5 },
  { nome: "Filial Norte", receita: 132000, crescimento: 8.3 },
  { nome: "Filial Sul", receita: 128000, crescimento: 15.7 },
  { nome: "Filial Leste", receita: 118000, crescimento: 6.2 },
  { nome: "Filial Oeste", receita: 110000, crescimento: 10.1 },
];

const mockAlertas = [
  { tipo: "warning", texto: "Despesas operacionais acima da meta em 3.2%", prioridade: "alta" },
  { tipo: "success", texto: "EBITDA cresceu 15% vs mês anterior", prioridade: "info" },
  { tipo: "info", texto: "2 filiais com margem abaixo de 20%", prioridade: "media" },
];

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Visão Executiva</h1>
        <p className="text-muted-foreground mt-1">
          Período: Novembro 2024 • Última atualização: Hoje às 14:32
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Receita Total"
          value={680000}
          prefix="R$ "
          change={9.7}
          variant="success"
          icon={<DollarSign className="h-5 w-5" />}
          description="vs R$ 620.000 em Out"
        />
        <MetricCard
          title="EBITDA"
          value={265000}
          prefix="R$ "
          change={12.8}
          variant="info"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Margem EBITDA: 39.0%"
        />
        <MetricCard
          title="Margem Líquida"
          value="23.4"
          suffix="%"
          change={3.1}
          variant="success"
          icon={<Percent className="h-5 w-5" />}
          description="Meta: 22.0%"
        />
        <MetricCard
          title="Lucro Líquido"
          value={159200}
          prefix="R$ "
          change={11.4}
          variant="success"
          icon={<Target className="h-5 w-5" />}
          description="vs R$ 142.800 em Out"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tendência de Receita, Custo e Lucro */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Evolução Financeira (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCusto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--danger))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--danger))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mes" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => 
                    `R$ ${value.toLocaleString('pt-BR')}`
                  }
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="hsl(var(--success))" 
                  fillOpacity={1}
                  fill="url(#colorReceita)"
                  name="Receita"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="custo" 
                  stroke="hsl(var(--danger))" 
                  fillOpacity={1}
                  fill="url(#colorCusto)"
                  name="Custo"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="lucro" 
                  stroke="hsl(var(--primary))" 
                  name="Lucro"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Margens */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-warning" />
              Evolução das Margens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMarginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mes" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="margem_bruta" 
                  stroke="hsl(var(--success))" 
                  name="Margem Bruta"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="margem_operacional" 
                  stroke="hsl(var(--info))" 
                  name="Margem Operacional"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--info))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="margem_liquida" 
                  stroke="hsl(var(--primary))" 
                  name="Margem Líquida"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Filiais */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top 5 Filiais - Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart 
                data={mockFiliaisData} 
                layout="vertical"
                margin={{ left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <YAxis 
                  type="category" 
                  dataKey="nome" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '11px' }}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => 
                    `R$ ${value.toLocaleString('pt-BR')}`
                  }
                />
                <Bar 
                  dataKey="receita" 
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                  name="Receita"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alertas e Insights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Alertas e Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAlertas.map((alerta, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50"
                >
                  {alerta.tipo === "warning" && (
                    <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  )}
                  {alerta.tipo === "success" && (
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  )}
                  {alerta.tipo === "info" && (
                    <Clock className="h-5 w-5 text-info shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alerta.texto}</p>
                    <Badge 
                      variant={alerta.prioridade === "alta" ? "destructive" : "secondary"}
                      className="mt-2 text-xs"
                    >
                      {alerta.prioridade === "alta" ? "Alta Prioridade" : 
                       alerta.prioridade === "media" ? "Média Prioridade" : "Informação"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
