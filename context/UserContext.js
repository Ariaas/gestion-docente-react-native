import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    nombre: 'Usuario',
    apellido: 'Sistema',
    email: 'usuario@uptaeb.edu.ve',
    telefono: '0412-1234567',
    departamento: 'Informática',
    cedula: 'V-12.345.678',
    image: null,
  });

  const updateUser = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
