
import React, { useState, useEffect } from 'react';

const EnhancedCountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      // Calculate end of current month (last day at 11:59:59 PM)
      const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);
      const timeDiff = endOfMonth.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      <p className="text-lg font-bold text-[#FF6200] mb-4 animate-pulse">
        ⏰ GOVERNMENT SUBSIDY EXPIRES IN:
      </p>
      <div className="flex justify-center gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-b from-[#1A3C34] to-[#2D5A4D] text-white rounded-xl p-4 min-w-[80px] text-center shadow-2xl border-2 border-[#FFC107] transform hover:scale-110 transition-all duration-300 countdown-digit"
          >
            <div className="text-3xl font-bold text-[#FFC107] mb-1 countdown-digit">
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs uppercase font-semibold">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-[#FF6200] font-semibold animate-bounce">
          🔥 Hurry! Subsidy reduces by ₹5,000 every month! Lock in your 25-year savings now!
        </p>
      </div>
    </div>
  );
};

export default EnhancedCountdownTimer;
