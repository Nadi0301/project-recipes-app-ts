import { useContext } from 'react';
import { TypeProps } from '../Types';
import { UseRecipesContext } from '../context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar({ whatIsYourFeth }:TypeProps) {
  const {
    inputSearch,
    setInputSearch, radioSelect, setRadioSelect } = useContext(UseRecipesContext);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    whatIsYourFeth(radioSelect.option, inputSearch);
  };

  const handleChagenRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRadioSelect({ ...radioSelect, [name]: value });
  };
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputSearch(value);
  };

  return (
    <form onSubmit={ handleSubmit } className="mt-1 container py-1">
      <div className="input-group mb-3">
        <input
          onChange={ handleChangeSearch }
          data-testid="search-input"
          value={ inputSearch }
          type="text"
          className="form-control"
          placeholder="Search"
        />
        <button data-testid="exec-search-btn" className="btn btn-primary" type="submit">
          SEARCH
        </button>
      </div>
      <div className="form-check form-check-inline">
        <input
          onChange={ handleChagenRadio }
          data-testid="ingredient-search-radio"
          checked={ radioSelect.option === 'ingredient' }
          value="ingredient"
          id="ingredient"
          name="option"
          type="radio"
          className="form-check-input"
        />
        <label htmlFor="ingredient" className="form-check-label">
          Ingredient
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          onChange={ handleChagenRadio }
          data-testid="name-search-radio"
          value="name_search"
          id="name_search"
          name="option"
          type="radio"
          className="form-check-input"
        />
        <label htmlFor="name_search" className="form-check-label">
          Name
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          onChange={ handleChagenRadio }
          data-testid="first-letter-search-radio"
          value="first_letter"
          id="first_letter"
          name="option"
          type="radio"
          className="form-check-input"
        />
        <label htmlFor="first_letter" className="form-check-label">
          First letter
        </label>
      </div>
    </form>
  );
}

export default SearchBar;
