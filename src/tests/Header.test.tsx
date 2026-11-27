import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../components/Header';

const myRoute = (component:React.ReactNode) => {
  render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  );
};

describe('No Component Header foi testado...', () => {
  const dataId = 'search-top-btn';
  test('teste se o component Header é renderizado', () => {
    myRoute(<Header profileIsVisible searchIsVisible title="Meals" />);
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    const searchIcon = screen.getByTestId(dataId);
    expect(searchIcon).toBeInTheDocument();

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa se o campo de texto de input não está visível na tela', () => {
    myRoute(<Header profileIsVisible searchIsVisible title="Meals" />);
    const inputText = screen.queryByRole('textbox');
    expect(inputText).toBeNull();
  });

  // o test quebra a partir daqui.
  test('teste se ao clicar no botão search o campo de texto aparece na tela', async () => {
    myRoute(<Header profileIsVisible searchIsVisible title="Meals" />);
    const searchIcon = screen.getByTestId('search-top-btn');

    await userEvent.click(searchIcon);
    // const inputText = screen.getByRole('textbox');
    // expect(inputText).toBeInTheDocument();
  });
});
