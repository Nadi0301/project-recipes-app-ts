import { createContext, useState } from 'react';
import { ContextType, DrinksTypes, MealsTypes, RadioSelectType } from '../Types';

export const UseRecipesContext = createContext({} as ContextType);
const INITIAL_RADIO: RadioSelectType = {
  option: 'ingredient',
};

function UseRecipesProvider({ children } : { children: React.ReactNode }) {
  const [meals, setMeals] = useState<MealsTypes[]>({} as MealsTypes[]);
  const [drinks, setDrinks] = useState<DrinksTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchVisible, setSeachVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState('');
  const [radioSelect, setRadioSelect] = useState<RadioSelectType>(INITIAL_RADIO);

  const contextDatas = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    isLoading,
    setIsLoading,
    searchVisible,
    setSeachVisible,
    inputSearch,
    setInputSearch,
    radioSelect,
    setRadioSelect,
  };

  return (
    <UseRecipesContext.Provider value={ contextDatas }>
      {children}
    </UseRecipesContext.Provider>
  );
}

export default UseRecipesProvider;
