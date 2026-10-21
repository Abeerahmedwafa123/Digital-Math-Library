
import React, { useEffect, useRef, useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect screen size for responsive particle settings
    const isMobile = window.innerWidth < 768;

    // Configuration
    const LOGO_URL = 'https://raw.githubusercontent.com/Abeerahmedwafa123/Mental-Math-/main/Edu%20Logo%20White.png';
    const TEXT_TO_RENDER = 'Mental Math';
    const PARTICLE_COLOR = 'rgba(0, 255, 150, 0.9)'; // Bright/rich emerald green
    
    // Lower sampling density = more particles = clearer text on small screens
    const SAMPLING_DENSITY = isMobile ? 3 : 5; 
    
    // Slightly larger particles on mobile for better visibility
    const PARTICLE_SIZE = isMobile ? 1.5 : 1.2; 
    
    const ATTRACTION_FORCE = 0.05;
    const FRICTION = 0.9;
    
    // Using a Ref to store mutable animation state
    const state = {
        particles: [] as Particle[],
        logoPoints: [] as Point[],
        textPoints: [] as Point[],
        currentPhase: 0, // 0: Gather, 1: Hold Logo, 2: Morph, 3: Hold Text
        phaseStartTime: 0,
        animationFrameId: 0,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const phaseDurations = {
      gather: 1500,
      hold: 3000,
      morph: 2000,
    };

    interface Point { x: number; y: number; }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      target: Point;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.target = { x, y };
      }

      update() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        
        this.vx += dx * ATTRACTION_FORCE;
        this.vy += dy * ATTRACTION_FORCE;

        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = PARTICLE_COLOR;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, PARTICLE_SIZE, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const getShapePoints = (tempCanvas: HTMLCanvasElement): Point[] => {
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return [];
      
      if (tempCanvas.width === 0 || tempCanvas.height === 0) return [];

      try {
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        const points: Point[] = [];
        for (let y = 0; y < tempCanvas.height; y += SAMPLING_DENSITY) {
          for (let x = 0; x < tempCanvas.width; x += SAMPLING_DENSITY) {
            const index = (y * tempCanvas.width + x) * 4;
            if (data[index + 3] > 128) {
              points.push({ x, y });
            }
          }
        }
        return points;
      } catch (e) {
        console.error("Error getting image data:", e);
        return [];
      }
    };

    const calculatePoints = (sourceWidth: number, sourceHeight: number, sourcePoints: Point[], screenW: number, screenH: number) => {
        // Center the shape on the screen
        // Target vertical position: 40% down from top
        const offsetX = (screenW - sourceWidth) / 2;
        const offsetY = (screenH * 0.4) - (sourceHeight / 2);
        
        return sourcePoints.map(p => ({
            x: p.x + offsetX,
            y: p.y + offsetY
        }));
    };

    // Keep track of source data to recalculate on resize without reloading images
    let cachedLogoData: { width: number, height: number, points: Point[] } | null = null;
    let cachedTextData: { width: number, height: number, points: Point[] } | null = null;

    const generateTextData = (w: number) => {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return null;
        
        const fontSize = Math.max(30, Math.min(w * 0.12, 120)); 
        tempCtx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        
        const textMetrics = tempCtx.measureText(TEXT_TO_RENDER);
        const width = Math.ceil(textMetrics.width);
        const height = Math.ceil(fontSize * 1.5); // Add some padding for ascenders/descenders
        
        tempCanvas.width = width;
        tempCanvas.height = height;

        tempCtx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = '#FFFFFF';
        
        // Draw in center of temp canvas
        tempCtx.fillText(TEXT_TO_RENDER, width / 2, height / 2);

        // Get points relative to temp canvas (0,0)
        const points = getShapePoints(tempCanvas);
        
        return { width, height, points };
    };

    const loadLogoData = (): Promise<{ width: number, height: number, points: Point[] } | null> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous'; 
            img.onload = () => {
                const tempCanvas = document.createElement('canvas');
                // We calculate a base size for the logo points extraction, not the final screen position
                // Let's make it reasonably high res so it looks good when scaled
                const baseWidth = 400; 
                const scale = baseWidth / img.width;
                const baseHeight = img.height * scale;

                tempCanvas.width = baseWidth;
                tempCanvas.height = baseHeight;

                const tempCtx = tempCanvas.getContext('2d');
                if (tempCtx) {
                    tempCtx.drawImage(img, 0, 0, baseWidth, baseHeight);
                    const points = getShapePoints(tempCanvas);
                    resolve({ width: baseWidth, height: baseHeight, points });
                } else {
                    resolve(null);
                }
            };
            img.onerror = () => resolve(null);
            img.src = LOGO_URL;
        });
    };

    const updateTargets = () => {
        const { width, height } = state;
        
        if (cachedLogoData) {
            // Recalculate logo scale for current screen
            // Use responsive scaling: 50% width on mobile, 30% on desktop
            const targetWidthPct = isMobile ? 0.5 : 0.3;
            const targetLogoWidth = Math.min(width * targetWidthPct, 500);
            const scaleFactor = targetLogoWidth / cachedLogoData.width;
            
            // Scale points
            const scaledPoints = cachedLogoData.points.map(p => ({ x: p.x * scaleFactor, y: p.y * scaleFactor }));
            const scaledW = cachedLogoData.width * scaleFactor;
            const scaledH = cachedLogoData.height * scaleFactor;

            state.logoPoints = calculatePoints(scaledW, scaledH, scaledPoints, width, height);
        } else {
             // Fallback circle if logo fails
             const centerX = width / 2;
             const centerY = height * 0.4;
             state.logoPoints = Array.from({ length: 1000 }, (_, i) => {
                 const angle = (i / 1000) * Math.PI * 2;
                 const r = 50 + Math.random() * 50;
                 return { x: centerX + Math.cos(angle) * r, y: centerY + Math.sin(angle) * r };
             });
        }

        // Generate text data for current screen width (font size depends on width)
        // We regenerate text data on resize to ensure crisp font size
        const textData = generateTextData(width);
        if (textData) {
            cachedTextData = textData;
            state.textPoints = calculatePoints(textData.width, textData.height, textData.points, width, height);
        }

        // Update current targets for particles
        const targetSet = (state.currentPhase === 0 || state.currentPhase === 1) ? state.logoPoints : state.textPoints;
        
        // Assign targets to particles
        if (targetSet.length > 0) {
             for (let i = 0; i < state.particles.length; i++) {
                state.particles[i].target = targetSet[i % targetSet.length];
            }
        }
    };

    const resizeCanvas = () => {
        if (!canvas) return;
        state.width = window.innerWidth;
        state.height = window.innerHeight;
        canvas.width = state.width;
        canvas.height = state.height;
        updateTargets();
    };

    const setTargets = (targetPoints: Point[]) => {
      if (targetPoints.length === 0) return;
      for (let i = 0; i < state.particles.length; i++) {
          state.particles[i].target = targetPoints[i % targetPoints.length];
      }
    };

    const animateLoop = (timestamp: number) => {
      if (!state.phaseStartTime) state.phaseStartTime = timestamp;
      const elapsed = timestamp - state.phaseStartTime;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Slightly stronger trail clear
      ctx.fillRect(0, 0, state.width, state.height);

      switch (state.currentPhase) {
          case 0: // Gather Logo
              if (elapsed > phaseDurations.gather) {
                  state.currentPhase = 1; 
                  state.phaseStartTime = timestamp;
              }
              break;
          case 1: // Hold Logo
              if (elapsed > phaseDurations.hold) {
                  state.currentPhase = 2; // Morph to Text
                  state.phaseStartTime = timestamp;
                  setTargets(state.textPoints);
              }
              break;
          case 2: // Morph Text
              if (elapsed > phaseDurations.morph) {
                  state.currentPhase = 3; // Hold Text
                  state.phaseStartTime = timestamp;
              }
              break;
          case 3: // Hold Text
              // Reveal content after 1 second of holding text
              if (elapsed > 1000 && !showContent) {
                 setShowContent(true);
              }
              break;
      }

      state.particles.forEach(p => {
          p.update();
          p.draw();
      });

      state.animationFrameId = requestAnimationFrame(animateLoop);
    };

    const init = async () => {
      // Set initial size
      resizeCanvas();
      
      // Load Data
      cachedLogoData = await loadLogoData();
      
      // Force update to calculate positions
      updateTargets();

      // Create Particles
      const particleCount = isMobile ? 2500 : 4000;
      state.particles = [];
      for (let i = 0; i < particleCount; i++) {
          // Start random
          const startX = Math.random() * state.width;
          const startY = Math.random() * state.height;
          state.particles.push(new Particle(startX, startY));
      }
      
      // Initial targets are logo
      setTargets(state.logoPoints);

      state.phaseStartTime = 0;
      animateLoop(0);
    };

    window.addEventListener('resize', resizeCanvas);
    init();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(state.animationFrameId);
    };
  }, []); // Run once on mount

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-900 font-inter">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1509228627129-6690a87531bc?q=80&w=2070&auto=format&fit=crop')",
             filter: 'brightness(0.6)'
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black bg-opacity-60"></div>
        
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-20 block w-full h-full"></canvas>

        {/* Static Logo Overlay - Top Left - Kept for brand presence, but the animation happens in center */}
        <div className="absolute top-6 left-6 z-30 pointer-events-none">
          <img 
            src="https://raw.githubusercontent.com/Abeerahmedwafa123/Mental-Math-/main/Edu%20Logo%20White.png" 
            alt="Edulixa" 
            className="w-24 md:w-32 h-auto object-contain drop-shadow-lg opacity-80"
          />
        </div>

        {/* Content Overlay */}
        <main 
            className={`absolute left-1/2 transform -translate-x-1/2 text-white text-center z-30 transition-all duration-1000 ease-out w-full px-4 ${
                showContent 
                ? 'opacity-100 top-[55%] sm:top-[60%]' 
                : 'opacity-0 top-[65%] pointer-events-none'
            }`}
        >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Mental Math</h1>
            <p className="text-lg md:text-2xl mb-8 font-light">Your journey to computational mastery starts here.</p>
            <button 
                onClick={onStart}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-emerald-500/50 transition duration-300 transform hover:scale-105"
            >
                Start Training
            </button>
        </main>
    </div>
  );
};

export default LandingPage;
