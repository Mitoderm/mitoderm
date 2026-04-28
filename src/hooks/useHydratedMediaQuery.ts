'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type QuerySettings = {
  query?: string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  orientation?: 'portrait' | 'landscape';
};

export default function useHydratedMediaQuery(settings: QuerySettings): boolean {
  const matches = useMediaQuery(settings);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? matches : false;
}
