import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dados mock
const mockFiliais = [
  { 
    id: 1, 
    nome: "Filial Centro", 
    receita: 145000, 
    margem: 28.5, 
    crescimento: 12.5,
    rank: 1,
    entregas: 1250,
    status: "excellent"
  },
  { 
    id: 2, 
    nome: "Filial Norte", 
    receita: 132000, 
    margem: 26.8, 
    crescimento: 8.3,
    rank: 2,
    entregas: 1180,
    status: "good"
  },
  { 
    id: 3, 
    nome: "Filial Sul", 
    receita: 128000, 
    margem: 31.2, 
    crescimento: 15.7,
    rank: 3,
    entregas: 1050,
    status: "excellent"
  },
  { 
    id: 4, 
    nome: "Filial Leste", 
    receita: 118000, 
    margem: 22.1, 
    crescimento: 6.2,
    rank: 4,
    entregas: 1020,
    status: "attention"
  },
  { 
    id: 5, 
    nome: "Filial Oeste", 
    receita: 110000, 
    margem: 25.4, 
    crescimento: 10.1,
    rank: 5,
    entregas: 950,
    status: "good"
  },
  { 
    id: 6, 
    nome: "Filial Sudeste", 
    receita: 95000, 
    margem: 24.8, 
    crescimento: -2.5,
    rank: 6,
    entregas: 820,
    status: "warning"
  },
  { 
    id: 7, 
    nome: "Filial Nordeste", 
    receita: 88000, 
    margem: 18.5, 
    crescimento: 3.2,
    rank: 7,
    entregas: 780,
    status: "attention"
  },
];

const Filiais = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-success">Excelente</Badge>;
      case "good":
        return <Badge className="bg-info">Bom</Badge>;
      case "attention":
        return <Badge className="bg-warning">Atenção</Badge>;
      case "warning":
        return <Badge variant="destructive">Crítico</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Análise por Filial</h1>
        <p className="text-muted-foreground mt-1">
          Performance comparativa e ranking das unidades
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Filiais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFiliais.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Unidades ativas</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-success/20 bg-success-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Melhor Margem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">31.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Filial Sul</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-primary/20 bg-info-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Maior Receita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ 145k</div>
            <p className="text-xs text-muted-foreground mt-1">Filial Centro</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-danger/20 bg-danger-light/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Necessita Atenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">3</div>
            <p className="text-xs text-muted-foreground mt-1">Filiais abaixo da meta</p>
          </CardContent>
        </Card>
      </div>

      {/* Ranking Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Ranking de Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Filial</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Margem</TableHead>
                <TableHead className="text-right">Crescimento</TableHead>
                <TableHead className="text-right">Entregas</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFiliais.map((filial) => (
                <TableRow key={filial.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {filial.rank}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{filial.nome}</TableCell>
                  <TableCell className="text-right font-mono">
                    R$ {filial.receita.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={filial.margem >= 25 ? "text-success" : "text-warning"}>
                      {filial.margem.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      filial.crescimento >= 0 ? "text-success" : "text-danger"
                    }`}>
                      {filial.crescimento >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {filial.crescimento > 0 ? "+" : ""}
                        {filial.crescimento.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {filial.entregas.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(filial.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-card bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-lg">Insights e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-success shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Filial Sul</span> apresenta a melhor margem (31.2%) 
                e crescimento consistente. Modelo operacional a ser replicado.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-warning shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Filiais Leste e Nordeste</span> apresentam margens 
                abaixo de 23%. Revisar estrutura de custos e pricing.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-danger shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Filial Sudeste</span> com crescimento negativo (-2.5%). 
                Requer atenção urgente e plano de recuperação.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Filiais;
