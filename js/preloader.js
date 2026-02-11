/* Keep your existing #preloader container styles */
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1.5s ease-in-out 0.5s;
  pointer-events: none;
}

#preloader.hidden {
  opacity: 0;
  visibility: hidden;
}

/* Central atmospheric glow (subtle pulse for depth) */
#preloader::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(220, 220, 230, 0.15) 0%, transparent 60%);
  animation: depthPulse 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes depthPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

/* Wrapper for centering */
.chrome-ix-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Main chrome "IX" */
.chrome-ix {
  font-family: var(--font-secondary, 'Arial Black', 'Impact', sans-serif);
  font-size: clamp(10rem, 28vw, 24rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  position: relative;

  /* Base metallic silver gradient */
  background: linear-gradient(135deg, #a0a0a0 0%, #e8e8e8 30%, #ffffff 50%, #c0c0c0 70%, #888888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Thick outline for bold weight */
  -webkit-text-stroke: 6px #707070;

  /* Bevel depth shadows */
  text-shadow: 
    4px 4px 8px rgba(0,0,0,0.8),
    -2px -2px 6px rgba(255,255,255,0.3);

  /* Entry animation */
  animation: chromeReveal 3.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Sweeping light shine (the premium polish) */
.chrome-ix::after {
  content: 'IX';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, 
    transparent 0%, 
    transparent 40%, 
    rgba(255, 255, 255, 0.9) 50%, 
    transparent 60%, 
    transparent 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shineSweep 4.5s ease-in-out infinite 3.2s;
  pointer-events: none;
}

/* Animations */
@keyframes chromeReveal {
  0% {
    opacity: 0;
    transform: scale(0.6) translateY(50px);
    filter: blur(20px);
  }
  60% {
    opacity: 1;
    transform: scale(1.08) translateY(-10px);
    filter: blur(0);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

@keyframes shineSweep {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(150%) skewX(-20deg); }
}
