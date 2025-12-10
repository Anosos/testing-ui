import React, { useState } from 'react';
import styled from 'styled-components';

// Simple landing / auth screen for GEM NEXUS
// Exports a component that accepts optional callbacks:
// - onAuthSuccess(userObj) called when a simulated login/signup succeeds
// - onContinue(guestFlag) called for "Continue as Guest"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #0b1020 0%, #1b2233 100%);
  color: #fff;
  padding: 24px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.6);
`;

const Logo = styled.h1`
  margin: 0 0 18px 0;
  font-size: 22px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Sub = styled.p`
  margin: 0 0 18px 0;
  color: #cfcfcf;
  font-size: 13px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background: ${props => props.variant === 'ghost' ? 'transparent' : (props.primary ? '#C09943' : 'rgba(255,255,255,0.06)')};
  color: ${props => props.variant === 'ghost' ? '#C09943' : (props.primary ? '#0b0b0b' : '#fff')};
  border: ${props => props.variant === 'ghost' ? '1px solid rgba(192,153,67,0.25)' : 'none'};

  &:hover { transform: translateY(-1px); }
`;

const Small = styled.small`
  display: block;
  text-align: center;
  margin-top: 12px;
  color: #bdbdbd;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  color: #fff;
  outline: none;
`;

export default function LoginScreen({ onAuthSuccess, onContinue }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const simulateGoogleLogin = () => {
    // Simulate a successful Google OAuth login
    const user = { id: 'google_sim_1', name: 'GEM Visitor', email: 'visitor@gmail.com', provider: 'google' };
    localStorage.setItem('isGuest', 'false');
    localStorage.setItem('accessLevel', 'full');
    localStorage.setItem('user', JSON.stringify(user));
    if (onAuthSuccess) onAuthSuccess(user);
    else alert('Simulated Google login successful.');
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password (simulation).');
      return;
    }
    const user = { id: `local_${Date.now()}`, name: email.split('@')[0], email, provider: 'local' };
    localStorage.setItem('isGuest', 'false');
    localStorage.setItem('accessLevel', 'full');
    localStorage.setItem('user', JSON.stringify(user));
    if (onAuthSuccess) onAuthSuccess(user);
    else alert('Simulated login successful.');
  };

  const simulateSignUp = () => {
    // For now just simulate signup flow
    alert('Sign Up flow is simulated. Opening Email/Password form.');
    setShowEmailForm(true);
  };

  const continueAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('accessLevel', 'guest');
    localStorage.removeItem('user');
    if (onContinue) onContinue({ guest: true });
    else alert('Continuing as Guest. Some features will be limited.');
  };

  return (
    <Container>
      <Card>
        <Logo>
          <span>💠</span>
          GEM NEXUS
        </Logo>
        <Sub>Welcome to GEM NEXUS — identify yourself to continue.</Sub>

        <Button onClick={simulateGoogleLogin}>
          <span>🔒</span> Login with Gmail (Simulate)
        </Button>

        <Button onClick={() => setShowEmailForm(s => !s)}>
          <span>✉️</span> Login with Email/Password
        </Button>

        {showEmailForm && (
          <Form onSubmit={handleEmailLogin}>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button primary type="submit">Sign In</Button>
          </Form>
        )}

        <Button onClick={simulateSignUp} variant="ghost">Create New Account (Sign Up)</Button>

        <Button onClick={continueAsGuest} style={{ marginTop: 16 }}>Continue as Guest</Button>

        <Small>
          By continuing you accept our simulated Terms. Guest sessions have limited access to Audio Guide and Loyalty features.
        </Small>
      </Card>
    </Container>
  );
}
