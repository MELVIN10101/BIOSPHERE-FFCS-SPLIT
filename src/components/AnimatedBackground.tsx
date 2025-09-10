import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 via-transparent to-emerald-100/30 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-emerald-200/20 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-teal-200/20 rounded-full animate-float-fast"></div>
        
        {/* Medium floating circles */}
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-green-300/15 rounded-full animate-float-medium delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-emerald-300/15 rounded-full animate-float-slow delay-2000"></div>
        
        {/* Small floating circles */}
        <div className="absolute top-1/6 right-1/6 w-8 h-8 bg-green-400/10 rounded-full animate-float-fast delay-500"></div>
        <div className="absolute bottom-1/3 right-2/3 w-6 h-6 bg-teal-400/10 rounded-full animate-float-medium delay-1500"></div>
        <div className="absolute top-2/3 left-1/6 w-10 h-10 bg-emerald-400/10 rounded-full animate-float-slow delay-3000"></div>
      </div>
      
      {/* Subtle moving waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-100/30 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/20 to-transparent animate-wave"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;