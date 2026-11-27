import { Outlet, Route, Routes } from 'react-router-dom';
import Drinks from './Drinks';
import Login from './Login';
import Meals from './Meals';
import Profile from './Profile';
import FavoriteRecipes from './FavoriteRecipes';
import Recipes from './Recipes';
import DoneRecipes from './DoneRecipes';

function Layout() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/" element={ <Recipes /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
        </Route>
        <Route path="/meals/:id-da-receita" element />
        <Route path="/drink/:id-da-receita" element />
        <Route path="/meals/:id-da-receita/in-pregress" element />
        <Route path="/drinks/:id-da-receita/in-progress" element />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
      <Outlet />
    </>
  );
}

export default Layout;
