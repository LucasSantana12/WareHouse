import React, { createContext, useCallback } from 'react';

interface AuthContextData {
  name: string;
  signIn(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(() => {
    console.log('signIn');
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ name: 'Lucas', signIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
export default AuthContext;
