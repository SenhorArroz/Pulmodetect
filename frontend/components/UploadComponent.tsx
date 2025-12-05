"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  UploadCloud,
  X,
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  Activity,
  FileHeart,
  RotateCcw
} from "lucide-react";

interface PredictionResult {
  result: "Pneumonia" | "Normal";
  confidence: number;
  score: number;
}

export default function UploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Limpa a URL do preview para evitar vazamento de memória
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    processFile(selected);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    processFile(dropped);
  }

  function processFile(selected?: File) {
    if (!selected || !selected.type.startsWith("image/")) return;
    
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function analyzeImage() {
    if (!file) return;

    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append("file", file);

    try {
      // Ajuste a URL do backend aqui
      const response = await axios.post(
        "http://localhost:8000/predict",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Falha ao conectar com o servidor. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
      
      {/* --- LADO ESQUERDO: UPLOAD & PREVIEW --- */}
      <div className="p-8 md:p-12 flex-1 flex flex-col justify-center space-y-8 bg-white relative z-10">
        
        {/* Título da Seção */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600 shadow-sm">
              <FileHeart className="w-6 h-6" />
            </div>
            Upload do Exame
          </h2>
          <p className="text-slate-500 text-sm font-medium pl-1">
            Formatos suportados: PNG, JPG, JPEG
          </p>
        </div>

        {/* Área Interativa */}
        {!file ? (
          <div
            className={`
              group relative border-2 border-dashed rounded-2xl h-72
              flex flex-col items-center justify-center text-center cursor-pointer 
              transition-all duration-300 ease-out
              ${isDragging 
                ? "border-emerald-500 bg-emerald-50 scale-[1.01] shadow-inner" 
                : "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 hover:shadow-lg hover:shadow-emerald-100/50"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className={`p-5 rounded-full mb-5 transition-all duration-300 shadow-sm ${isDragging ? 'bg-emerald-200 text-emerald-700 scale-110' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 group-hover:scale-110'}`}>
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 group-hover:text-emerald-800 transition-colors">
              Arraste ou Clique
            </h3>
            <p className="text-sm text-slate-400 mt-2 font-medium max-w-[200px]">
              Carregue a imagem de Raio-X para análise
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Preview da Imagem */}
            <div className="relative group rounded-2xl overflow-hidden bg-slate-900 shadow-lg aspect-[4/3] flex items-center justify-center border border-slate-200">
              <img src={preview!} alt="Preview" className="max-w-full max-h-full object-contain" />
              
              {/* Overlay de Remoção */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                <button
                  onClick={clearFile}
                  className="btn btn-circle btn-error text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  title="Remover imagem"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Botão de Ação Principal */}
            <button
              onClick={analyzeImage}
              disabled={loading}
              className="btn btn-lg w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-200 rounded-xl flex items-center justify-between group disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all duration-300"
            >
              <span className="font-bold text-lg pl-2 tracking-wide">
                {loading ? "Processando..." : "Realizar Diagnóstico"}
              </span>
              {loading ? (
                <span className="loading loading-spinner loading-md text-emerald-600 bg-white rounded-full p-3"></span>
              ) : (
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                    <ScanLine className="w-6 h-6" />
                </div>
              )}
            </button>
          </div>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <div className="alert bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start text-sm shadow-sm animate-in shake">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* --- LADO DIREITO: RESULTADOS --- */}
      <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 p-8 md:p-12 md:w-[26rem] lg:w-[28rem] flex flex-col justify-center relative overflow-hidden transition-colors duration-500">
          
        {/* Padrão Decorativo de Fundo */}
        <div className="absolute -top-12 -right-12 p-4 opacity-[0.04] pointer-events-none rotate-12">
          <Activity className="w-80 h-80 text-emerald-900" />
        </div>

        {!result ? (
          // Estado Vazio (Waiting)
          <div className="text-center opacity-60 flex flex-col items-center justify-center h-full space-y-6">
            <div className="w-24 h-24 bg-slate-200/50 rounded-full flex items-center justify-center animate-pulse">
              <Activity className="w-12 h-12 text-slate-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-700 text-xl">Aguardando Dados</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[200px] mx-auto leading-relaxed">
                Os resultados detalhados da IA aparecerão aqui após a análise.
              </p>
            </div>
          </div>
        ) : (
          // Estado com Resultados
          <div className="space-y-8 relative z-10 animate-in slide-in-from-right-8 duration-500">
            
            <div className="space-y-2 border-b border-slate-200 pb-6">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                Diagnóstico Final
              </span>
              <h3 className={`text-4xl font-black tracking-tight ${result.result === "Pneumonia" ? "text-red-600" : "text-emerald-600"}`}>
                {result.result === "Pneumonia" ? "Detectado" : "Normal"}
              </h3>
            </div>

            {/* Cartão de Status */}
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors duration-500 ${result.result === "Pneumonia" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
                <div className="flex items-start gap-4">
                  {result.result === "Pneumonia" ? (
                    <div className="p-3 bg-red-100 rounded-xl text-red-600 shrink-0"><AlertTriangle className="w-8 h-8"/></div>
                  ) : (
                    <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 shrink-0"><CheckCircle2 className="w-8 h-8"/></div>
                  )}
                  <div>
                    <p className={`font-bold text-lg ${result.result === "Pneumonia" ? "text-red-900" : "text-emerald-900"}`}>
                      {result.result === "Pneumonia" ? "Sinais de Pneumonia" : "Sem anomalias visíveis"}
                    </p>
                    <p className={`text-sm mt-1 leading-snug ${result.result === "Pneumonia" ? "text-red-700/80" : "text-emerald-700/80"}`}>
                      {result.result === "Pneumonia" 
                        ? "O modelo identificou padrões consistentes com pneumonia." 
                        : "O modelo não detectou opacidades pulmonares características."}
                    </p>
                  </div>
                </div>
            </div>

            {/* Métricas */}
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Confiança</span>
                  <span className="text-2xl font-bold text-slate-800">{(result.confidence * 100).toFixed(1)}%</span>
                </div>
                <progress 
                  className={`progress w-full h-3 rounded-full ${result.result === "Pneumonia" ? "progress-error" : "progress-success"}`} 
                  value={result.confidence * 100} 
                  max="100"
                ></progress>
              </div>

               <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex justify-between items-center">
                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Score Bruto</span>
                 <code className="text-xs bg-slate-100 px-3 py-1.5 rounded-md text-slate-600 font-mono border border-slate-200">
                   {result.score.toFixed(6)}
                 </code>
              </div>
            </div>

            {/* Ação Reset */}
            <button 
              onClick={clearFile}
              className="btn btn-ghost btn-sm w-full mt-2 normal-case font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Realizar nova análise
            </button>

          </div>
        )}
      </div>
    </div>
  );
}