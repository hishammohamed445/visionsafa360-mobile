import React from 'react';
import { Download, AlertCircle, RefreshCw } from 'lucide-react';
import { GenerationResult } from '../types';

interface ResultDisplayProps {
  result: GenerationResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (result.error) {
    return (
      <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-vs-gray/50 rounded-xl border border-red-900/50 p-6 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
        <h3 className="text-lg font-medium text-white mb-1">Generation Failed</h3>
        <p className="text-sm text-gray-400 max-w-xs">{result.error}</p>
      </div>
    );
  }

  if (result.loading) {
    return (
      <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-vs-gray/30 rounded-xl border border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,106,0,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_2s_linear_infinite]"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
             <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-vs-gray border-t-vs-orange animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-vs-orange rounded-full animate-pulse"></div>
                </div>
             </div>
             <p className="text-vs-orange font-medium animate-pulse">Processing Image...</p>
             <p className="text-xs text-gray-500">Gemini is analyzing pixels</p>
        </div>
      </div>
    );
  }

  if (result.imageUrl) {
    return (
      <div className="relative group w-full h-full min-h-[300px] bg-vs-black rounded-xl overflow-hidden border border-vs-orange/30 shadow-[0_0_30px_rgba(255,106,0,0.1)]">
        <div className="absolute top-0 left-0 bg-vs-orange text-black text-xs font-bold px-3 py-1 z-10 rounded-br-lg">
          EDITED
        </div>
        <img 
          src={`data:image/png;base64,${result.imageUrl}`} 
          alt="Generated Result" 
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-4">
          <a 
            href={`data:image/png;base64,${result.imageUrl}`} 
            download="vision-safe-edit.png"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    );
  }

  // Idle state
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-vs-gray/30 rounded-xl border border-dashed border-gray-800">
      <div className="p-4 rounded-full bg-vs-gray mb-3">
        <RefreshCw className="w-6 h-6 text-gray-600" />
      </div>
      <p className="text-sm text-gray-500">Generated result will appear here</p>
    </div>
  );
};

export default ResultDisplay;