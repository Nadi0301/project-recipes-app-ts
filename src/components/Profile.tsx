import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav('/');
  };
  return (
    <>
      <Header profileIsVisible searchIsVisible={ false } title="Profile" />
      <h1>Profile Component</h1>
      <Footer />
      <h2>Profile</h2>
      <h3
        data-testid="profile-email"
      >
        {userEmail}
      </h3>
      <Button
        data-testid="profile-done-btn"
        onClick={ () => nav('/done-recipes') }
      >
        Done Recipes
      </Button>
      <Button
        data-testid="profile-favorite-btn"
        onClick={ () => nav('/favorite-recipes') }
      >
        Favorite Recipes
      </Button>
      <Button
        variant="danger"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </Button>
    </>
  );
}

export default Profile;
