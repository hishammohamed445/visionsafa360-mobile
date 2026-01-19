import React from 'react';
import VisionSafeLogo from './VisionSafeLogo';

const Header: React.FC = () => {
  return (
    <header className="border-b border-vs-gray bg-vs-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <VisionSafeLogo className="w-10 h-10" showText={false} />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              VISIONSAFE <span className="text-vs-orange">360</span>
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">AI Powered Safety</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-vs-gray border border-vs-gray/50">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-gray-300">System Online</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
