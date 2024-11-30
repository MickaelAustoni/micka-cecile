import { createContext, useContext, useState, ReactNode } from 'react';

interface FollowCursorProviderContextType {
  isHovered: boolean;
  disableAnimation?: boolean;
  setIsHovered: (hovered: boolean) => void;
  setDisableAnimation: (disableAnimation: boolean) => void;
}

const FollowCursorProviderContext = createContext<FollowCursorProviderContextType | undefined>(undefined);

export const FollowCursorProvider = ({ children }: { children: ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [disableAnimation, setDisableAnimation] = useState(false);

  return (
    <FollowCursorProviderContext.Provider value={{ isHovered, setIsHovered, disableAnimation, setDisableAnimation }}>
      {children}
    </FollowCursorProviderContext.Provider>
  );
};

export const useFollowCursor = () => {
  const context = useContext(FollowCursorProviderContext);

  if (!context) {
    throw new Error('useHover must be used within a HoverProvider');
  }

  return context;
};
