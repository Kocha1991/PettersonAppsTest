import React, { createContext, useState, useCallback, useContext } from 'react';

interface RefreshContextType {
  refreshing: boolean;
  onRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  return (
    <RefreshContext.Provider value={{ refreshing, onRefresh: handleRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
