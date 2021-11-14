import { useContext } from 'react';
import { SearchContext } from '../contexts/searchContext';

export default function useSearch() {
  const searchContext = useContext(SearchContext);

  return searchContext;
}
