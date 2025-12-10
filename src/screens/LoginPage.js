import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #F8F8F8; /* Off-white background */
  color: #333333;
  padding: 20px;
  text-align: center;
`;

const LoginForm = styled.form`
  background-color: #FFFFFF;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #C09943;
  margin-bottom: 20px;
  font-size: 24px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #C09943;
    box-shadow: 0 0 5px rgba(192, 153, 67, 0.3);
  }
`;

const Button = styled.button`
  background-color: #C09943;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #A6873D;
    box-shadow: 0 4px 10px rgba(192, 153, 67, 0.3);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const ErrorMessage = styled.p`
  color: #D32F2F;
  font-size: 14px;
  margin-top: -10px;
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: #C09943;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;

  &:hover {
    color: #A6873D;
  }
`;

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Initialize a default user for demonstration
  useEffect(() => {
    const defaultUser = { username: 'user', password: '123456', fullName: 'Traveler', xp: 0 };
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const defaultUserExists = registeredUsers.some(u => u.username === defaultUser.username);
    if (!defaultUserExists) {
      registeredUsers.push(defaultUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');

    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    if (isRegistering) {
      // Sign Up logic
      if (!fullName || !username || !password) {
        setError('Please fill in all fields.');
        return;
      }
      if (registeredUsers.some(u => u.username === username)) {
        setError('Username already exists. Please choose another.');
        return;
      }

      const newUser = { username, password, fullName, xp: 0 };
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      onLoginSuccess(newUser);
      alert('Registration successful! Welcome to the Pantheon!');
    } else {
      // Login logic
      if (username === 'user') {
        if (password === '123456') {
          // Mock user object for the static 'user' account
          onLoginSuccess({ username: 'user', fullName: 'Guest User', xp: 0 });
        } else {
          setError('Invalid username or password.');
        }
        return;
      }

      const userFound = registeredUsers.find(
        u => u.username === username && u.password === password
      );

      if (userFound) {
        onLoginSuccess(userFound);
      } else {
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleAuth}>
        <Title>{isRegistering ? 'Join the Pantheon!' : 'Welcome, Traveler!'}</Title>
        {isRegistering && (
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">{isRegistering ? 'Forge Your Legend' : 'Enter the Realm'}</Button>
        <ToggleLink onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </ToggleLink>
      </LoginForm>
    </LoginPageContainer>
  );
}
