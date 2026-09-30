import { useEffect, useState } from 'react';

export function useCopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const updateYear = () => {
      const now = new Date();
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      setYear(now.getFullYear());
      timer = setTimeout(updateYear, nextDay.getTime() - now.getTime());
    };

    updateYear();

    return () => {
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  return { year };
}
