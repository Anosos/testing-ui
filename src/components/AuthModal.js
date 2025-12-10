import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1a1a1a;
  border: 2px solid #C09943;
  border-radius: 15px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(192, 153, 67, 0.5);
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 20px;
    width: 95%;
  }
`;

const Title = styled.h2`
  color: #C09943;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
`;

const Input = styled.input`
  background-color: #333333;
  border: 2px solid #555555;
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #C09943;
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.3);
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 13px;
  }
`;

const ErrorMessage = styled.p`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #333333;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: ${props => props.active ? '#C09943' : '#888888'};
  border-bottom: 3px solid ${props => props.active ? '#C09943' : 'transparent'};
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    color: #C09943;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #C09943;
  border: none;
  color: #000000;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    box-shadow: 0 0 20px rgba(192, 153, 67, 0.6);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  color: #C09943;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ModalWrapper = styled.div`
  position: relative;
`;

const SuccessMessage = styled.p`
  color: #4CAF50;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 2px solid #555555;
  background-color: transparent;
  color: #ffffff;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: rgba(192, 153, 67, 0.2);
    border-color: #C09943;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 15px 0;
  color: #888888;
  font-size: 12px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #333333;
  }

  span {
    background: #1a1a1a;
    padding: 0 10px;
    position: relative;
  }
`;

export default function AuthModal({ isOpen, onClose, onLogin, onSignUp }) {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Mock login - in production, this would call a backend API
    const userData = {
      id: Date.now(),
      email: formData.email,
      name: formData.email.split('@')[0],
      loginDate: new Date().toLocaleDateString(),
    };

    setSuccess('✓ Login successful!');
    setTimeout(() => {
      onLogin(userData);
      setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
      setSuccess('');
    }, 1000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock sign up - in production, this would call a backend API
    const userData = {
      id: Date.now(),
      email: formData.email,
      name: formData.fullName,
      createdDate: new Date().toLocaleDateString(),
    };

    setSuccess('✓ Account created successfully!');
    setTimeout(() => {
      onSignUp(userData);
      setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
      setSuccess('');
    }, 1000);
  };

  const handleGmailLogin = () => {
    const userData = {
      id: Date.now(),
      email: 'user@gmail.com',
      name: 'Gmail User',
      loginDate: new Date().toLocaleDateString(),
      provider: 'google',
    };
    setSuccess('✓ Gmail login successful!');
    setTimeout(() => {
      onLogin(userData);
      setSuccess('');
    }, 1000);
  };

  const handleGuestLogin = () => {
    const userData = {
      id: Date.now(),
      name: 'Guest User',
      email: null,
      loginDate: new Date().toLocaleDateString(),
      isGuest: true,
    };
    setSuccess('✓ Continuing as guest...');
    setTimeout(() => {
      onLogin(userData);
      setSuccess('');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalWrapper>
          <CloseButton onClick={onClose}>×</CloseButton>

          <Title>🏛️ GEM APP</Title>

          <TabContainer>
            <TabButton
              active={activeTab === 'login'}
              onClick={() => setActiveTab('login')}
            >
              Login
            </TabButton>
            <TabButton
              active={activeTab === 'signup'}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </TabButton>
          </TabContainer>

          {success && <SuccessMessage>{success}</SuccessMessage>}

          {activeTab === 'login' ? (
            <>
              <SocialButton onClick={handleGmailLogin}>
                📧 Login with Gmail
              </SocialButton>
              <SocialButton onClick={handleGuestLogin}>
                👤 Continue as Guest
              </SocialButton>

              <Divider><span>OR</span></Divider>

              <form onSubmit={handleLogin}>
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type="submit">Login</SubmitButton>
              </form>
            </>
          ) : (
            <form onSubmit={handleSignUp}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </FormGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <SubmitButton type="submit">Create Account</SubmitButton>
            </form>
          )}
        </ModalWrapper>
      </ModalContent>
    </Overlay>
  );
}
