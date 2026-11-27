import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { CombinedPropsType, TypeCategory } from '../Types';
import { UseRecipesContext } from '../context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({
  title,
  searchIsVisible,
  profileIsVisible, typeCategory, fethMealsOrDrinks }:CombinedPropsType) {
  const {
    searchVisible, setSeachVisible, setMeals, setDrinks } = useContext(UseRecipesContext);
  const [category, setcategory] = useState<string[]>([]);
  const [statusfilter, setStatusFilter] = useState(false);
  const handleclickSearch = () => {
    setSeachVisible(!searchVisible);
  };

  const fetchCategory = async (correntCategory: TypeCategory) => {
    const URL_CATEGORY_MEALS_API = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const URL_CATEGORY_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    let LINK = '';
    let mealsOrDrinks;
    switch (correntCategory) {
      case 'URL_CATEGORY_DRINKS_API': LINK = URL_CATEGORY_DRINKS_API;
        break;
      case 'URL_CATEGORY_MEALS_API': LINK = URL_CATEGORY_MEALS_API;
        break;
      default:
    }
    try {
      const response = await fetch(LINK);

      if (!response.ok) { throw new Error('Erro ao buscar as Categorias'); }

      const data = await response.json();
      switch (correntCategory) {
        case 'URL_CATEGORY_MEALS_API':
          mealsOrDrinks = data.meals
            .slice(0, 5).map((item:any) => item.strCategory);
          break;
        case 'URL_CATEGORY_DRINKS_API': mealsOrDrinks = data
          .drinks.slice(0, 5).map((item:any) => item.strCategory);
          break;
        default:
      }
      setcategory(mealsOrDrinks);
    } catch (error) {
      console.error('Algo deu errado: ', error);
    }
  };

  const categoryFilter = async (categoryName:string, Category: TypeCategory) => {
    const URL_FILTER_MEALS = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
    const URL_FILTER_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;
    let LINK = '';
    console.log(category);
    switch (categoryName) {
      case 'Beef': LINK = URL_FILTER_MEALS;
        break;
      case 'Chicken': LINK = URL_FILTER_MEALS;
        break;
      case 'Breakfast': LINK = URL_FILTER_MEALS;
        break;
      case 'Goat': LINK = URL_FILTER_MEALS;
        break;
      case 'Dessert': LINK = URL_FILTER_MEALS;
        break;
      case 'Cocktail': LINK = URL_FILTER_DRINKS;
        break;
      case 'Cocoa': LINK = URL_FILTER_DRINKS;
        break;
      case 'Ordinary Drink': LINK = URL_FILTER_DRINKS;
        break;
      case 'Other/Unknown':
        LINK = URL_FILTER_DRINKS;
        break;
      case 'Shake': LINK = URL_FILTER_DRINKS;
        break;
      default:
    }
    const response = await fetch(LINK);
    const data = await response.json();
    setStatusFilter(!statusfilter);
    if (Category === 'URL_CATEGORY_MEALS_API') setMeals(data.meals);
    if (Category === 'URL_CATEGORY_DRINKS_API') setDrinks(data.drinks);
  };

  const handleClickBtn = (categoryName:string) => {
    if (typeCategory) {
      categoryFilter(categoryName, typeCategory);
    }
  };

  useEffect(() => {
    const resultCategory = () => {
      if (typeCategory) {
        const data = fetchCategory(typeCategory);
        return data;
      }
    };
    resultCategory();
  }, []);

  useEffect(() => {
    if (fethMealsOrDrinks && !statusfilter) {
      fethMealsOrDrinks();
    }
  }, [statusfilter]);
  return (
    <header className="container py-3 ">
      <div className="d-flex justify-content-between align-items-center">
        <h1 data-testid="page-title">{ title }</h1>
      </div>
      <div>
        {
        profileIsVisible && (
          <NavLink to="/profile" className="me-3">
            <img
              className="img-fluid"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile-icon"
            />
          </NavLink>)
        }
        {
        searchIsVisible && (
          <button className="btn btn-primary m-2" onClick={ handleclickSearch }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
          </button>)
        }
      </div>
      <div>
        {category.map((categoryName: string) => (
          <button
            key={ categoryName }
            className="btn btn-primary m-1"
            data-testid={ `${categoryName}-category-filter` }
            onClick={ () => handleClickBtn(categoryName) }
          >
            {categoryName}
          </button>
        ))}
        <button
          className="btn btn-secondary m-1"
          onClick={ fethMealsOrDrinks }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
    </header>
  );
}
export default Header;
