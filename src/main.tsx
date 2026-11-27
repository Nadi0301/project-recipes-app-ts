import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UseRecipesProvider from './context/RecipesProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <UseRecipesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UseRecipesProvider>,
  );
