"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ScriptLoadContextType {
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}

const ScriptLoadContext = createContext<ScriptLoadContextType | undefined>(undefined);

export const ScriptLoadProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <ScriptLoadContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </ScriptLoadContext.Provider>
  );
};

export const useScriptLoad = () => {
  const context = useContext(ScriptLoadContext);
  if (context === undefined) {
    throw new Error('useScriptLoad must be used within a ScriptLoadProvider');
  }
  return context;
}; 