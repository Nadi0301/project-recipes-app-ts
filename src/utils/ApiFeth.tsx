import { SearchType } from '../Types';

export const fetchApiForMeals = async (searchType:SearchType, valueInput: string) => {
  const urlForIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`;
  const urlForName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`;
  const urlForFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`;
  let url = '';
  try {
    switch (searchType) {
      case 'name_search': url = urlForName;
        break;
      case 'ingredient': url = urlForIngredient;
        break;
      case 'first_letter': url = urlForFirstLetter;
        break;
      default:
        throw new Error('Erro ao acessar parametro!');
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro na Requisição de Meals!');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('algo deu errado:', error);
  }
};

export const fetchApiForDrinks = async (searchType:SearchType, valueInput: string) => {
  const urlForIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valueInput}`;
  const urlForName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueInput}`;
  const urlForFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valueInput}`;
  let url = '';
  try {
    switch (searchType) {
      case 'name_search': url = urlForName;
        break;
      case 'ingredient': url = urlForIngredient;
        break;
      case 'first_letter': url = urlForFirstLetter;
        break;
      default:
        throw new Error('Erro ao acessar parametro!');
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro na Requisição de Drinks!');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('algo deu errado: ', error);
  }
};
