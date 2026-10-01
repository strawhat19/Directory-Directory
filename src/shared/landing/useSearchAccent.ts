import { useMemo } from 'react';
import { useLanding } from './useLanding';
import { useTheme } from '../theme/useTheme';
import { getSearchAccent } from './searchScopes';

export const useSearchAccent = () => {
  const { isDark } = useTheme();
  const { searchScope } = useLanding();

  return useMemo(() => getSearchAccent(searchScope, isDark), [searchScope, isDark]);
};
