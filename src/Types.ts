export type SearchType = 'ingredient' | 'name_search' | 'first_letter';
export type PropsType = {
  title: string;
  searchIsVisible: boolean;
  profileIsVisible: boolean;
  typeCategory: TypeCategory;
  fethMealsOrDrinks: () => Promise<void>
};

export type OptionalProps = {
  title: string;
  searchIsVisible: boolean;
  profileIsVisible: boolean;
  typeCategory?: never;
  fethMealsOrDrinks?: never;
};

export type CombinedPropsType = OptionalProps | PropsType;

export type RadioSelectType = {
  option: 'ingredient' | 'name_search' | 'first_letter';
};

export type ContextType = {
  meals: MealsTypes[];
  setMeals: (meals:MealsTypes[]) => void;
  drinks: DrinksTypes[];
  setDrinks: (drinks:DrinksTypes[]) => void;
  isLoading: boolean;
  setIsLoading: (boelano: boolean) => void;
  searchVisible: boolean;
  setSeachVisible: (boleano:boolean) => void;
  inputSearch: string;
  setInputSearch: (string: string) => void;
  radioSelect: RadioSelectType;
  setRadioSelect: (string:RadioSelectType) => void;
};

export type RecipeTypes = {
  dateModified: null;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: null;
  strDrinkAlternate: null;
  strImageSource: null;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strTags: null;
  strYoutube: string;
};
export type TypeDrinks = {
  drinks: DrinksTypes[];
};
export type MealsType = {
  meals:MealsTypes[];
};

export type MealsTypes = {
  idMeal: string;
  strMeal:string;
  strMealThumb:string;
};

export type DrinksTypes = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
};

export type TypeProps = {
  whatIsYourFeth: (searchType:SearchType, valueInput: string) => void;
};

export type MealsData = {
  meals: [
    strCategory: string,
  ]
};

export type DrinksData = {
  drinks: [
    strCategory: string,
  ]
};
export type TypeCategory = 'URL_CATEGORY_MEALS_API' | 'URL_CATEGORY_DRINKS_API';

export type CategoryName =
  'Beef' | 'Breakfast' | 'Chicken' | 'Dessert' | 'Goat' | 'Ordinary Drink' | 'Cocktail'
  | 'Shake' | 'Other/Unknown' | 'Cocoa';
