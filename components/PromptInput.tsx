import React from 'react';
import { Send, Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && prompt.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-vs-orange to-vs-lightOrange rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-end gap-2 bg-vs-gray rounded-lg p-2 border border-gray-800 focus-within:border-vs-orange/50 transition-colors">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe how you want to edit the image (e.g., 'Add a retro filter', 'Make it snowy')..."
                className="w-full bg-transparent text-white placeholder-gray-500 text-sm resize-none focus:outline-none py-3 px-2 min-h-[50px] max-h-[120px]"
                rows={2}
                disabled={disabled}
            />
            <button
                onClick={onSubmit}
                disabled={disabled || !prompt.trim()}
                className={`
                    flex items-center justify-center p-3 rounded-md mb-1 transition-all duration-200
                    ${disabled || !prompt.trim() 
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                        : 'bg-vs-orange text-white hover:bg-vs-lightOrange shadow-lg shadow-vs-orange/20 active:scale-95'
                    }
                `}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <Sparkles className="w-5 h-5" />
                )}
            </button>
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center text-xs text-gray-500 px-1">
        <span>Powered by Gemini 2.5 Flash Image</span>
        <span>Press Enter to generate</span>
      </div>
    </div>
  );
};

export default PromptInput;