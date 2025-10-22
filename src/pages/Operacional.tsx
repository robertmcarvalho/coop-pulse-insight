import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, Calendar } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts";

// Mock data
const paretoData = [
  { produto: "Delivery Express", receita: 285, acumulado: 35, fill: "hsl(var(--primary))" },
  { produto: "Farmácia 24h", receita: 228, acumulado: 63, fill: "hsl(var(--primary))" },
  { produto: "E-commerce", receita: 162, acumulado: 83, fill: "hsl(var(--primary))" },
  { produto: "Logística", receita: 97, acumulado: 95, fill: "hsl(var(--info))" },
  { produto: "Outros", receita: 44, acumulado: 100, fill: "hsl(var(--muted))" },
];

const calendarHeatData = Array.from({ length: 31 }, (_, i) => ({
  dia: i + 1,
  entregas: Math.floor(Math.random() * 100) + 40,
}));

const quadrantData = [
  { filial: "Centro", roi: 28.5, volume: 145, size: 1250 },
  { filial: "Norte", roi: 26.8, volume: 132, size: 1180 },
  { filial: "Sul", roi: 31.2, volume: 128, size: 1050 },
  { filial: "Leste", roi: 22.1, volume: 118, size: 1020 },
  { filial: "Oeste", roi: 25.4, volume: 110, size: 950 },
  { filial: "Sudeste", roi: 24.8, volume: 95, size: 820 },
  { filial: "Nordeste", roi: 18.5, volume: 88, size: 780 },
];

const getHeatColor = (value: number) => {
  if (value >= 80) return "hsl(var(--success))";
  if (value >= 60) return "hsl(var(--info))";
  if (value >= 40) return "hsl(var(--warning))";
  return "hsl(var(--danger))";
};

const Operacional = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Análise Operacional</h1>
        <p className="text-muted-foreground mt-1">
          KPIs operacionais, ABC e performance por produto
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Receita por Entrega"
          value={65.3}
          prefix="R$ "
          change={3.2}
          variant="success"
          icon={<Package className="h-4 w-4" />}
        />
        <MetricCard
          title="Custo por Entrega"
          value={40.8}
          prefix="R$ "
          change={-1.5}
          variant="success"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Margem por Entrega"
          value={24.5}
          prefix="R$ "
          change={4.8}
          variant="info"
        />
        <MetricCard
          title="Entregas Totais"
          value={12500}
          suffix=" un"
          change={8.3}
          variant="default"
        />
      </div>

      {/* Pareto Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <CardTitle>Pareto (ABC): Receita por Produto</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paretoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="produto" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Bar dataKey="receita" radius={[8, 8, 0, 0]}>
                {paretoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Classe A (0-80%):</span> Delivery
              Express e Farmácia 24h concentram 63% da receita.
            </p>
            <p className="mt-1">
              <span className="font-semibold text-foreground">Classe B (80-95%):</span> E-commerce
              e Logística (32% da receita).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Heatmap */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Heatmap: Entregas por Dia (Janeiro)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {calendarHeatData.map((day) => (
              <div
                key={day.dia}
                className="aspect-square rounded flex flex-col items-center justify-center text-xs font-medium transition-all hover:scale-110 cursor-pointer"
                style={{ backgroundColor: getHeatColor(day.entregas) }}
              >
                <span className="text-white">{day.dia}</span>
                <span className="text-white/80 text-[10px]">{day.entregas}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: "hsl(var(--danger))" }}
              />
              <span>{"<40"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: "hsl(var(--warning))" }}
              />
              <span>40-60</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: "hsl(var(--info))" }}
              />
              <span>60-80</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: "hsl(var(--success))" }}
              />
              <span>80+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scatter Quadrant */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Matriz ROI × Volume por Filial</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="volume"
                name="Volume"
                unit="k"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                type="number"
                dataKey="roi"
                name="ROI"
                unit="%"
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value: any, name: string) => {
                  if (name === "ROI") return `${value}%`;
                  if (name === "Volume") return `R$ ${value}k`;
                  return value;
                }}
              />
              <Scatter name="Filiais" data={quadrantData} fill="hsl(var(--primary))">
                {quadrantData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.roi > 25 && entry.volume > 120
                        ? "hsl(var(--success))"
                        : entry.roi > 25
                        ? "hsl(var(--info))"
                        : entry.volume > 120
                        ? "hsl(var(--warning))"
                        : "hsl(var(--danger))"
                    }
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div
                className="mt-1 h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: "hsl(var(--success))" }}
              />
              <div>
                <p className="font-semibold">Alto ROI + Alto Volume (Estrelas)</p>
                <p className="text-muted-foreground text-xs">
                  Centro, Norte, Sul — Manter investimento
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div
                className="mt-1 h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: "hsl(var(--info))" }}
              />
              <div>
                <p className="font-semibold">Alto ROI + Baixo Volume (Promessas)</p>
                <p className="text-muted-foreground text-xs">Oeste — Crescer market share</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div
                className="mt-1 h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: "hsl(var(--warning))" }}
              />
              <div>
                <p className="font-semibold">Baixo ROI + Alto Volume (Vacas Leiteiras)</p>
                <p className="text-muted-foreground text-xs">Leste — Melhorar eficiência</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div
                className="mt-1 h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: "hsl(var(--danger))" }}
              />
              <div>
                <p className="font-semibold">Baixo ROI + Baixo Volume (Abacaxis)</p>
                <p className="text-muted-foreground text-xs">
                  Nordeste, Sudeste — Revisar estratégia
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational KPIs */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Indicadores Operacionais Chave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Ocupação</span>
                <span className="font-semibold text-success">87.5%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: "87.5%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entregas no Prazo</span>
                <span className="font-semibold text-success">94.2%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: "94.2%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">NPS</span>
                <span className="font-semibold text-primary">72</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "72%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ticket Médio</span>
                <span className="font-semibold">R$ 65.30</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tempo Médio Entrega</span>
                <span className="font-semibold">28 min</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Retorno</span>
                <span className="font-semibold text-success">1.8%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Operacional;
