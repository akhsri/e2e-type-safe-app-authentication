import React from 'react';
import { createContext, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
 
});

export const AuthProvider = ({ children }: ProviderProps) => {

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
