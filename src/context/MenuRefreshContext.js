// src/context/MenuRefreshContext.js

import React, { createContext, useState, useContext } from "react";

const MenuRefreshContext = createContext();

export const MenuRefreshProvider = ({ children }) => {
  const [refreshMenu, setRefreshMenu] = useState(false);

  const triggerMenuRefresh = () => {
    setRefreshMenu((prev) => !prev);
  };

  return (
    <MenuRefreshContext.Provider value={{ refreshMenu, triggerMenuRefresh }}>
      {children}
    </MenuRefreshContext.Provider>
  );
};

export const useMenuRefresh = () => useContext(MenuRefreshContext);
