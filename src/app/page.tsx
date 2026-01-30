'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BlackHoleHero from '@/components/BlackHoleHero';
import WarpTransition from '@/components/WarpTransition';
import Portfolio from '@/components/Portfolio';

type ViewState = 'home' | 'warping' | 'portfolio';

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>('home');

  const handleEnterClick = () => {
    setViewState('warping');
  };

  const handleWarpComplete = () => {
    setViewState('portfolio');
  };

  const handleBackToHome = () => {
    setViewState('home');
  };

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {viewState === 'home' && (
          <BlackHoleHero 
            key="home" 
            onBlackHoleClick={handleEnterClick} 
          />
        )}
        
        {viewState === 'warping' && (
          <WarpTransition 
            key="warp" 
            onComplete={handleWarpComplete} 
          />
        )}
        
        {viewState === 'portfolio' && (
          <Portfolio 
            key="portfolio" 
            onBack={handleBackToHome} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
