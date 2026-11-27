import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

const myRoute = (component:React.ReactNode) => {
  render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  );
};

describe('No component Login foi testado...', () => {
  const email = 'oopaopa@gmail.com';
  test('verifique se o existe um input com o texto "email".', () => {
    myRoute(<Login />);
    const loginTitle = screen.getByText(/email:/i);
    expect(loginTitle).toBeInTheDocument();
  });

  test('test se existe um input para a senha na pagina', () => {
    myRoute(<Login />);
    const passwordInput = screen.getByLabelText(/senha:/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('test se o botão inicia desabilitado.', () => {
    myRoute(<Login />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeDisabled();
  });

  test('test se ao preencher apenas o campo de email o botão continua desabilitado.', async () => {
    myRoute(<Login />);
    const loginTitle = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);
    await userEvent.type(loginTitle, email);
    await userEvent.type(passwordInput, '12345');
    expect(loginTitle).toHaveValue(email);
    expect(passwordInput).toHaveValue('12345');
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeDisabled();
  });

  it('salva o email no Local Storage ao fazer o login', async () => {
    myRoute(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
    const userData = localStorage.getItem('user');
    expect(userData).toBeTruthy();
  });
});
