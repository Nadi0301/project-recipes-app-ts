import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const naviGate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(newPassword.length > 6);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveUserEmail(email);
    naviGate('/meals');
  };

  const saveUserEmail = (userEmail: string) => {
    const userData = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const validateEmail = (Email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(Email);
  };

  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={ handleSubmit }>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className={ `form-control ${isEmailValid ? 'is-valid' : 'is-invalid'}` }
            type="email"
            id="email"
            value={ email }
            onChange={ handleEmailChange }
            data-testid="email-input"
          />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>
        <div className="md-3">
          <label htmlFor="password" className="form-label">
            Senha:
          </label>
          <input
            className={ `form-control ${isPasswordValid ? 'is-valid' : 'is-invalid'}` }
            type="password"
            id="password"
            value={ password }
            onChange={ handlePasswordChange }
            data-testid="password-input"
            required
          />
          <div className="invalid-feedback">
            Passord must be at least 6 characters long.
          </div>
        </div>
        <button
          className="mt-2 btn btn-primary"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isFormValid }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
