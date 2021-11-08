import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Pet } from '../types';

interface searchContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
}

interface PetModalProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext({} as searchContextProps);

export default function AuthContextProvider({
  children,
}: PetModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(oldValue => !oldValue);
  }

  return (
    <SearchContext.Provider value={{ isOpen, toggle, setIsOpen }}>
      {children}
    </SearchContext.Provider>
  );
}
