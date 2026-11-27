import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseRecipesContext } from '../context/RecipesProvider';
import { fetchApiForMeals } from '../utils/ApiFeth';
import { MealsType } from '../Types';

function Meals() {
  const {
    meals,
    setMeals,
    isLoading,
    setIsLoading,
    searchVisible, inputSearch, radioSelect } = useContext(UseRecipesContext);
  const navigateForMeals = useNavigate();

  const searchMeals = async () => {
    const mealsApi: MealsType = await fetchApiForMeals(radioSelect.option, inputSearch);
    switch (radioSelect.option) {
      case 'first_letter': if (inputSearch.length > 1) {
        window.alert('Your search must have only 1 (one) character');
        return;
      }
        setMeals(mealsApi.meals);
        break;
      case 'name_search':
      case 'ingredient':
        if (mealsApi.meals === null) {
          window.alert("Sorry, we haven't found any recipes for these filters.");
          return;
        }
        setMeals(mealsApi.meals);
        break;
      default:
        setMeals(mealsApi.meals);
    }
    if (mealsApi.meals.length === 1) {
      navigateForMeals(`/meals/${mealsApi.meals[0].idMeal}`);
    }
  };
  const fetchMeals = async () => {
    setIsLoading(true);
    const URL_API_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    try {
      const response = await fetch(URL_API_RECIPES);
      if (!response.ok) {
        throw new Error('Erro na requisição de comidas');
      }
      const data = await response.json();
      setMeals(data.meals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Algo deu errado: ', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <div>
      <Header
        profileIsVisible
        searchIsVisible
        title="Meals"
        typeCategory="URL_CATEGORY_MEALS_API"
        fethMealsOrDrinks={ fetchMeals }
      />
      {searchVisible && <SearchBar whatIsYourFeth={ searchMeals } />}
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {isLoading ? (
            <div className="col text-center center-screen">
              <h1 className="my-5 text-primary">Loading...</h1>
            </div>
          ) : (
            meals.slice(0, 12).map((meal, index) => (
              <div
                className="col"
                key={ meal.idMeal }
              >
                <div className="card h-100">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ meal.strMealThumb }
                    className="card-img-top img-fluid"
                    alt={ meal.strMeal }
                  />
                  <div className="card-body">
                    <p
                      className="card-title"
                      data-testid={ `${index}-card-name` }
                    >
                      {meal.strMeal}
                    </p>
                    <div className="card-footer text-center">
                      <button
                        className="btn btn-primary"
                        data-testid={ `${index}-recipe-card` }
                        onClick={ () => navigateForMeals(`/meals/${meal.idMeal}`) }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
