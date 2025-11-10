
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      <p className="text-lg font-bold text-[#FF6200] mb-4">⏰ OFFER EXPIRES IN:</p>
      <div className="flex justify-center gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <div key={index} className="bg-[#1A3C34] text-white rounded-lg p-3 min-w-[60px] text-center">
            <div className="text-2xl font-bold text-[#FFC107]">{item.value.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
