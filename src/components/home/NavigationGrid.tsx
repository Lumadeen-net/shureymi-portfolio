import React from 'react';
import { NAVIGATION_CARDS } from '../../data/navigation';
import { NavigationCard } from './NavigationCard';

interface NavigationGridProps {
  skipAnimation?: boolean;
}

export const NavigationGrid: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
        {NAVIGATION_CARDS.map((item, index) => (
          <NavigationCard
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
