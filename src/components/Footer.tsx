import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer
      className=" text-center fixed-bottom bg-light p-1 mt-1"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drinks-icon" />
      </Link>
      <Link to="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Meals-icon" />
      </Link>
    </footer>
  );
}

export default Footer;
