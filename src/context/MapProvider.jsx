import React, { createContext, useState } from 'react';

export const mapContext = createContext(undefined);

export function MapProvider({ children }) {
  const [savedMap, setSavedMap] = useState(null);
  const Provider = mapContext.Provider;

  return (
    <Provider
      value={{
        savedMap,
        setSavedMap,
      }}
    >
      {children}
    </Provider>
  );
}
