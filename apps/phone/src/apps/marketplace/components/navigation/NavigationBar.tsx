import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/marketplace';

  return (
    <div
      className="flex items-center justify-around py-3"
      style={{
        background: 'linear-gradient(180deg, rgba(30, 25, 45, 0.95) 0%, rgba(20, 15, 35, 1) 100%)',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
      }}
    >
      <Link
        to="/marketplace"
        className="flex flex-col items-center gap-1 transition-all duration-200"
      >
        <div
          className="p-2 rounded-xl"
          style={{
            background: isHome ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
          }}
        >
          <Home
            size={22}
            className={isHome ? 'text-violet-400' : 'text-neutral-500'}
          />
        </div>
      </Link>

      <Link
        to="/marketplace/new"
        className="flex flex-col items-center gap-1 transition-all duration-200"
      >
        <div
          className="p-2 rounded-xl"
          style={{
            background: !isHome ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
          }}
        >
          <PlusCircle
            size={22}
            className={!isHome ? 'text-violet-400' : 'text-neutral-500'}
          />
        </div>
      </Link>
    </div>
  );
};
