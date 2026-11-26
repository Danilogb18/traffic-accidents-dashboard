import { useEffect, useState } from 'react';
import { fetchAccidents } from '../services/accidentService';
import type { Accident } from '../types/accident';

export function useAccidents(limit = 500) {
  const [data, setData] = useState<Accident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchAccidents(limit)
      .then((rows) => { if (!cancelled) setData(rows); })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error desconocido');
      })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [limit]);

  return { data, isLoading, error };
}