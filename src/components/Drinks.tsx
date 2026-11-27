import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseRecipesContext } from '../context/RecipesProvider';
import SearchBar from './SearchBar';
import { fetchApiForDrinks } from '../utils/ApiFeth';
import { TypeDrinks } from '../Types';

function Drinks() {
  const {
    drinks,
    setDrinks,
    isLoading,
    setIsLoading,
    searchVisible, inputSearch, radioSelect } = useContext(UseRecipesContext);
  const navigateForDrink = useNavigate();

  const fetchDrinks = async () => {
    setIsLoading(true);
    const URL_API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    try {
      const response = await fetch(URL_API_DRINKS);
      if (!response.ok) {
        throw new Error('Erro na requisição de bebidas.');
      }
      const data = await response.json();
      setDrinks(data.drinks);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Algo deu errado: ', error);
    }
  };

  const searchDrinks = async () => {
    const drinksApi:TypeDrinks = await fetchApiForDrinks(radioSelect.option, inputSearch);

    switch (radioSelect.option) {
      case 'first_letter': if (inputSearch.length > 1) {
        window.alert('Your search must have only 1 (one) character');
        return;
      }
        setDrinks(drinksApi.drinks);
        break;
      case 'name_search':
      case 'ingredient':
        if (drinksApi.drinks === null) {
          window.alert("Sorry, we haven't found any recipes for these filters.");
          return;
        }
        setDrinks(drinksApi.drinks);
        break;
      default:
    }
    setDrinks(drinksApi.drinks);
    if (drinksApi.drinks.length === 1) {
      navigateForDrink(`/drinks/${drinksApi.drinks[0].idDrink}`);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <div className="col-md-12">
      <Header
        profileIsVisible
        searchIsVisible
        title="Drinks"
        typeCategory="URL_CATEGORY_DRINKS_API"
        fethMealsOrDrinks={ fetchDrinks }
      />
      {searchVisible && <SearchBar whatIsYourFeth={ searchDrinks } />}
      <div className="container item mb-5">
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {isLoading ? (
            <div className="col text-center center-screen">
              <h1 className="my-5 text-primary">Loading...</h1>
            </div>
          ) : (
            drinks.slice(0, 12).map((drink, index) => (
              <div
                key={ drink.idDrink }
                className="col"
              >
                <div className="card h-100">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    className="card-img-top img-fluid"
                    alt={ drink.strDrink }
                  />
                  <div className="card-body">
                    <h5
                      data-testid={ `${index}-card-name` }
                      className="card-title"
                    >
                      {drink.strDrink}
                    </h5>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-primary"
                      data-testid={ `${index}-recipe-card` }
                      onClick={ () => navigateForDrink(`/drinks/${drink.idDrink}`) }
                    >
                      View Details
                    </button>
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

export default Drinks;
