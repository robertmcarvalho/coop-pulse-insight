import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const Ingest = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
    stats?: {
      total: number;
      processed: number;
      errors: number;
    };
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        toast.error("Por favor, selecione um arquivo CSV");
        return;
      }
      setFile(selectedFile);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Selecione um arquivo primeiro");
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Usuário não autenticado');
      }

      const response = await supabase.functions.invoke('process-csv', {
        body: formData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw response.error;
      }

      const result = response.data;
      
      if (result.success) {
        setUploadResult({
          success: true,
          message: result.message,
          stats: {
            total: result.imported + result.errors,
            processed: result.imported,
            errors: result.errors,
          },
        });
        
        toast.success("Dados importados com sucesso!");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erro ao processar o arquivo';
      setUploadResult({
        success: false,
        message: errorMsg,
      });
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Importar Dados</h1>
        <p className="text-muted-foreground mt-1">
          Upload de arquivos CSV com transações financeiras
        </p>
      </div>

      {/* Upload Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload de CSV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <FileSpreadsheet className="h-12 w-12 text-primary" />
              </div>
              
              <div>
                <p className="text-lg font-medium text-foreground mb-2">
                  {file ? file.name : "Arraste um arquivo CSV ou clique para selecionar"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Formato: CSV (UTF-8) • Tamanho máximo: 10MB
                </p>
              </div>

              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild variant="outline">
                  <span className="cursor-pointer">Selecionar Arquivo</span>
                </Button>
              </label>

              {file && (
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Fazer Upload
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Result */}
          {uploadResult && (
            <Alert className={uploadResult.success ? "border-success" : "border-danger"}>
              {uploadResult.success ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <AlertCircle className="h-4 w-4 text-danger" />
              )}
              <AlertDescription>
                <p className="font-medium mb-2">{uploadResult.message}</p>
                {uploadResult.stats && (
                  <div className="text-sm space-y-1">
                    <p>Total de registros: {uploadResult.stats.total}</p>
                    <p className="text-success">Processados: {uploadResult.stats.processed}</p>
                    <p className="text-danger">Erros: {uploadResult.stats.errors}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Format Info */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Formato do CSV</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-4">
              O arquivo CSV deve conter as seguintes colunas (na ordem):
            </p>
            <ol className="text-sm space-y-2 text-foreground">
              <li>DATA MOVIMENTO</li>
              <li>ENTRADA/SAÍDA</li>
              <li>TIPO (forma de pagamento)</li>
              <li>TÍTULO</li>
              <li>NÚMERO DOCTO</li>
              <li>QUEM GEROU</li>
              <li>PARCEIRO V</li>
              <li>REFERENTE</li>
              <li>VENCIMENTO</li>
              <li>EMISSÃO</li>
              <li>PAGAMENTO</li>
              <li>VALOR ORIGINAL</li>
              <li>VALOR PAGO/RECEBIDO</li>
              <li>CONTA</li>
              <li>PLANO DE CONTAS</li>
              <li>VALOR MOV.CONTA</li>
              <li>VALOR RATEADO PRESTADOR</li>
              <li>CENTRO DE CUSTO</li>
              <li>BANCO/CAIXA</li>
              <li>REGISTRO MOVIMENTO</li>
              <li>REGISTRO COMPROMISSO</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ingest;
