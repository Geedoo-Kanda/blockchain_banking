import React, { createContext, useContext } from 'react';

interface SlugContextProps {
  slug: string | null;
}

const SlugContext = createContext<SlugContextProps | undefined>(undefined);

export const useSlug = (): string => {
  const context = useContext(SlugContext);
  if (!context) {
    throw new Error('useSlug must be used within a SlugProvider');
  }
  return context.slug || '';
};

interface SlugProviderProps {
  slug: string;
  children: React.ReactNode;
}

export const SlugProvider: React.FC<SlugProviderProps> = ({ slug, children }) => {
  return <SlugContext.Provider value={{ slug }}>{children}</SlugContext.Provider>;
};
