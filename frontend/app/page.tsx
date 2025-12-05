import UploadComponent from "@/components/UploadComponent";
import { Stethoscope } from "lucide-react";

export default function Home() {
  return (
    // Container Principal com fundo Slate claro e tipografia escura
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 relative flex flex-col">
      
      {/* Background Decorativo (Forma Verde no topo) */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-emerald-600 to-teal-600 rounded-b-[3rem] md:rounded-b-[5rem] shadow-lg -z-0"></div>

      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center relative z-10">
        
        {/* HEADER */}
        <header className="text-center text-white mb-10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/30">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
            PULMODETECT <br></br> <br></br>
            <span className="opacity-90 font-light">Assistente de</span> Diagnóstico com IA
          </h1>
          
          <p className="text-emerald-50 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Sistema de Deep-Learning para detecção rápida e precisa de pneumonia através de raios-X.
          </p>
        </header>

        {/* UPLOAD COMPONENT */}
        <UploadComponent />

        {/* FOOTER */}
        <footer className="mt-16 text-center text-slate-400 text-sm font-medium">
          <p>© {new Date().getFullYear()} Pulmodetect · Powered by TensorFlow & Next.js</p>
        </footer>

      </div>
    </main>
  );
}