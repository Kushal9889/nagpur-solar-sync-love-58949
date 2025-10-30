
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
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    let animationSpeed = 0.02;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient (sky)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB'); // Sky blue
      gradient.addColorStop(1, '#98FB98'); // Light green
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Ground
      ctx.fillStyle = '#90EE90';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      
      // Building/roof base
      const roofY = elevatedStructure ? 120 : 140;
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(50, roofY, 300, 60);
      
      // Solar panels with animation
      const panelColor = '#1B2A4E';
      ctx.fillStyle = panelColor;
      
      // Multiple panels in a grid
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
          const panelX = 60 + col * 70;
          const panelY = roofY + 5 + row * 25;
          
          // Panel tilt effect based on time (following sun)
          const tilt = Math.sin(time * 0.5) * 5;
          
          ctx.save();
          ctx.translate(panelX + 30, panelY + 10);
          ctx.rotate(tilt * Math.PI / 180);
          ctx.fillRect(-30, -10, 60, 20);
          
          // Panel reflection/shine effect
          const shineGradient = ctx.createLinearGradient(-30, -10, 30, 10);
          shineGradient.addColorStop(0, 'rgba(135, 206, 235, 0.3)');
          shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
          ctx.fillStyle = shineGradient;
          ctx.fillRect(-30, -10, 60, 20);
          
          ctx.restore();
        }
      }
      
      // Walkway visualization
      if (walkway) {
        // Walkway structure (6x8 ft representation)
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(40, roofY - 10, 20, 80); // Left walkway
        ctx.fillRect(340, roofY - 10, 20, 80); // Right walkway
        ctx.fillRect(40, roofY - 10, 320, 15); // Top walkway
        ctx.fillRect(40, roofY + 55, 320, 15); // Bottom walkway
        
        // Safety railings
        ctx.strokeStyle = '#696969';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, roofY - 10);
        ctx.lineTo(40, roofY - 25);
        ctx.moveTo(360, roofY - 10);
        ctx.lineTo(360, roofY - 25);
        ctx.stroke();
        
        // Worker animation (cleaning panels)
        const workerX = 80 + Math.sin(time * 0.8) * 200;
        const workerY = roofY - 20;
        
        // Worker (simple representation)
        ctx.fillStyle = '#FFE4C4'; // Skin tone
        ctx.beginPath();
        ctx.arc(workerX, workerY, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Worker body
        ctx.fillStyle = '#4169E1'; // Blue uniform
        ctx.fillRect(workerX - 6, workerY + 8, 12, 20);
        
        // Cleaning tool
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(workerX + 8, workerY + 5);
        ctx.lineTo(workerX + 15, workerY - 5);
        ctx.stroke();
        
        // Water spray effect
        if (Math.sin(time * 2) > 0) {
          ctx.fillStyle = 'rgba(135, 206, 235, 0.6)';
          for (let i = 0; i < 10; i++) {
            const dropX = workerX + 15 + Math.random() * 20;
            const dropY = workerY - 5 + Math.random() * 20;
            ctx.beginPath();
            ctx.arc(dropX, dropY, 2, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
      
      // Elevated structure supports
      if (elevatedStructure) {
        ctx.fillStyle = '#808080';
        ctx.fillRect(55, roofY + 60, 8, 40); // Support pillar 1
        ctx.fillRect(155, roofY + 60, 8, 40); // Support pillar 2
        ctx.fillRect(255, roofY + 60, 8, 40); // Support pillar 3
        ctx.fillRect(335, roofY + 60, 8, 40); // Support pillar 4
        
        // Cross beams
        ctx.fillRect(55, roofY + 55, 290, 5);
        
        // Height indicator
        ctx.fillStyle = '#FF6B6B';
        ctx.font = '12px Arial';
        ctx.fillText('1.5m elevation', 10, roofY + 90);
      }
      
      // Sun arc animation
      const sunX = 100 + Math.cos(time * 0.3) * 150;
      const sunY = 50 + Math.sin(time * 0.3) * 30;
      
      // Sun
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Sun rays
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + time * 0.5;
        const rayStart = 25;
        const rayEnd = 35;
        ctx.beginPath();
        ctx.moveTo(
          sunX + Math.cos(angle) * rayStart,
          sunY + Math.sin(angle) * rayStart
        );
        ctx.lineTo(
          sunX + Math.cos(angle) * rayEnd,
          sunY + Math.sin(angle) * rayEnd
        );
        ctx.stroke();
      }
      
      // Efficiency indicator
      const efficiency = walkway ? (elevatedStructure ? 98 : 95) : 80;
      ctx.fillStyle = efficiency > 90 ? '#00FF00' : efficiency > 85 ? '#FFA500' : '#FF0000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(`${efficiency}% Efficiency`, 10, 30);
      
      // Power generation visualization
      if (efficiency > 90) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        for (let i = 0; i < 5; i++) {
          const sparkX = 60 + Math.random() * 280;
          const sparkY = roofY + Math.random() * 50;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      
      time += animationSpeed;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [walkway, elevatedStructure]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Add click interaction feedback
    setRotation(prev => prev + 90);
  };

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full border-2 border-yellow-400 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
        style={{ 
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      />
      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
        Click to rotate 360° • Drag for interaction
      </div>
      {walkway && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs animate-pulse">
          ✅ Safe Walkway Active
        </div>
      )}
      {elevatedStructure && (
        <div className="absolute top-8 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs animate-pulse">
          ⬆️ 1.5m Elevated
        </div>
      )}
    </div>
  );
};

export default Solar3DVisualization;
