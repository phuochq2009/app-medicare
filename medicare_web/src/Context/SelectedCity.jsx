import { createContext, useState, useContext } from "react";
import currentCity from "../Controllers/currentCity";

// Create the context for selectedCity
const CityContext = createContext();

// Provider component to wrap around the app
// eslint-disable-next-line react/prop-types
export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(currentCity);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

//Custom hook to use the selectedCity context
// eslint-disable-next-line react-refresh/only-export-components
export const useCity = () => {
  return useContext(CityContext);
};
