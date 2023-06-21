import React, { createContext, useState } from 'react';

export const SavedDataContext = createContext<any>([]);

export const SavedDataProvider = ({ children }: any) => {
  const [savedData, setSavedData,] = useState([]);
  const [checkSavedData, setCheckSavedData] = useState<boolean>(false);
  return (
    <SavedDataContext.Provider value={{savedData, setSavedData, checkSavedData, setCheckSavedData}}>
      {children}
    </SavedDataContext.Provider>
  );
};
