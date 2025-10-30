
import React, { useEffect, useRef, useState } from 'react';

interface Solar3DVisualizationProps {
  walkway: boolean;
  elevatedStructure: boolean;
  className?: string;
}

const Solar3DVisualization: React.FC<Solar3DVisualizationProps> = ({ 
  walkway, 
  elevatedStructure, 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [manPosition, setManPosition] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let walkDirection = 1;
    let manX = walkway ? 50 : 150;
    let animationSpeed = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw roof (grey)
      ctx.fillStyle = '#6B7280';
      ctx.fillRect(20, 100, 260, 80);
      
      // Draw solar panels (dark blue/green)
      ctx.fillStyle = '#1E3A8A';
      for (let i = 0; i < 12; i++) {
        const x = 30 + (i % 4) * 60;
        const y = 110 + Math.floor(i / 4) * 20;
        ctx.fillRect(x, y, 50, 15);
      }
      
      // Draw elevated structure if selected
      if (elevatedStructure) {
        ctx.fillStyle = '#9CA3AF';
        // Front posts (6 feet high)
        ctx.fillRect(40, 80, 4, 20);
        ctx.fillRect(236, 80, 4, 20);
        // Back posts (8 feet high)
        ctx.fillRect(40, 60, 4, 40);
        ctx.fillRect(236, 60, 4, 40);
        // Frame
        ctx.fillRect(40, 80, 200, 4);
        ctx.fillRect(40, 60, 200, 4);
        
        // Water plant on elevated structure
        ctx.fillStyle = '#10B981';
        ctx.fillRect(130, 65, 20, 15);
        ctx.fillStyle = '#059669';
        ctx.fillRect(135, 60, 10, 5);
      }
      
      // Draw walkway if selected (horizontal line)
      if (walkway) {
        ctx.fillStyle = '#FDE047';
        ctx.fillRect(30, 140, 240, 3);
        
        // Animate man walking on walkway
        animationSpeed += 0.02;
        manX = 50 + Math.sin(animationSpeed) * 100;
        
        // Draw animated man (yellow shirt)
        ctx.fillStyle = '#EAB308';
        ctx.fillRect(manX, 125, 8, 15);
        ctx.fillStyle = '#92400E';
        ctx.fillRect(manX, 135, 8, 10);
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(manX + 4, 120, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Walking legs animation
        const legOffset = Math.sin(animationSpeed * 4) * 2;
        ctx.fillStyle = '#92400E';
        ctx.fillRect(manX + 1, 145, 2, 8 + legOffset);
        ctx.fillRect(manX + 5, 145, 2, 8 - legOffset);
      } else if (elevatedStructure) {
        // Man walking below elevated structure
        animationSpeed += 0.02;
        manX = 50 + Math.sin(animationSpeed) * 100;
        
        // Draw man below structure
        ctx.fillStyle = '#EAB308';
        ctx.fillRect(manX, 185, 8, 15);
        ctx.fillStyle = '#92400E';
        ctx.fillRect(manX, 195, 8, 10);
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(manX + 4, 180, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Walking legs
        const legOffset = Math.sin(animationSpeed * 4) * 2;
        ctx.fillStyle = '#92400E';
        ctx.fillRect(manX + 1, 205, 2, 8 + legOffset);
        ctx.fillRect(manX + 5, 205, 2, 8 - legOffset);
      }
      
      // Draw sun with rays
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.arc(250, 30, 15, 0, 2 * Math.PI);
      ctx.fill();
      
      // Sun rays
      ctx.strokeStyle = '#FBBF24';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const x1 = 250 + Math.cos(angle) * 20;
        const y1 = 30 + Math.sin(angle) * 20;
        const x2 = 250 + Math.cos(angle) * 25;
        const y2 = 30 + Math.sin(angle) * 25;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [walkway, elevatedStructure]);

  return (
    <div className={`bg-gradient-to-b from-sky-200 to-green-100 rounded-xl p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-center">3D Installation Preview</h3>
      <canvas
        ref={canvasRef}
        width={300}
        height={220}
        className="mx-auto border border-gray-300 rounded-lg bg-gradient-to-b from-sky-100 to-green-50"
      />
      <p className="text-center text-sm text-gray-600 mt-3">
        {walkway && elevatedStructure && '3D View: Walkway + Elevated Structure'}
        {walkway && !elevatedStructure && '3D View: Walkway for Maintenance'}
        {!walkway && elevatedStructure && '3D View: Elevated Structure (6x8 ft)'}
        {!walkway && !elevatedStructure && '3D View: Standard Installation'}
      </p>
    </div>
  );
};

export default Solar3DVisualization;
