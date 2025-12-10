import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';

const Container = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  color: white;
`;

const AuthBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #C09943;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px 15px;
  border: none;
  background: ${props => props.active ? '#C09943' : 'rgba(0,0,0,0.3)'};
  color: ${props => props.active ? '#000' : 'white'};
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
  &:not(:last-child) {
    margin-right: 2px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #1E1E1E;
  color: white;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #C09943;
    box-shadow: 0 0 8px rgba(192, 153, 67, 0.5);
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #1E1E1E;
  color: white;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2C114.7L153.3%2C248.4c-3.1%2C3.1-7.2%2C4.7-11.3%2C4.7s-8.2-1.6-11.3-4.7L5.4%2C114.7C-1.8%2C107.5-1.8%2C95.3%2C5.4%2C88.1s18.4-7.2%2C25.6%2C0L142%2C204.9c3.1%2C3.1%2C7.2%2C4.7%2C11.3%2C4.7s8.2-1.6%2C11.3-4.7l111-111c7.2-7.2%2C18.4-7.2%2C25.6%2C0C294.2%2C95.3%2C294.2%2C107.5%2C287%2C114.7z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  option {
    background-color: #1E1E1E;
    color: white;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #1E1E1E;
  cursor: pointer;
  &:checked {
    background-color: #C09943;
    border-color: #C09943;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #aaa;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #C09943;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 15px rgba(192, 153, 67, 0.7);
  }
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
`;


const AuthScreen = ({ onLoginSuccess, onSignUpSuccess, onBack }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const { login, signup } = useContext(AppContext); // Get login and signup from context
  const [error, setError] = useState(null);


  // Placeholder for login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Placeholder for signup state
  const [signupFullName, setSignupFullName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupNationality, setSignupNationality] = useState('');
  const [signupAge, setSignupAge] = useState('');
  const [signupGender, setSignupGender] = useState('');
  const [signupVisitorType, setSignupVisitorType] = useState('');
  const [signupAccessibilityNeeds, setSignupAccessibilityNeeds] = useState(false);
  const [signupNewsletterOptIn, setSignupNewsletterOptIn] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await login(loginEmail, loginPassword);
      if (onLoginSuccess) onLoginSuccess(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    const userData = {
      fullName: signupFullName,
      username: signupUsername,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword,
      nationality: signupNationality,
      age: parseInt(signupAge, 10), // Ensure age is a number
      gender: signupGender,
      visitorType: signupVisitorType,
      accessibilityNeeds: signupAccessibilityNeeds,
      newsletterOptIn: signupNewsletterOptIn,
    };

    // Basic client-side validation for password strength (example: min 6 chars)
    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      setError('Please enter a valid email address.');
      return;
    }


    try {
      const user = await signup(userData);
      if (onSignUpSuccess) onSignUpSuccess(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <AuthBox>
        <TabContainer>
          <Tab active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Login</Tab>
          <Tab active={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>Sign Up</Tab>
        </TabContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {activeTab === 'login' ? (
          <Form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Email or Username"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <Button type="submit">Login</Button>
          </Form>
        ) : (
          <Form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="Full Name"
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Username (Unique for Gamification)"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email (Valid Email)"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
            <Input
              type="tel" // Use type="tel" for phone numbers
              placeholder="Phone"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
              // phone number typically not required, but can be
            />
            <Input
              type="password"
              placeholder="Password (Secure)"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />

            <Select value={signupNationality} onChange={(e) => setSignupNationality(e.target.value)} required>
              <option value="">Select Nationality</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Foreigner">Foreigner</option>
            </Select>

            <Input
              type="number"
              placeholder="Age"
              value={signupAge}
              onChange={(e) => setSignupAge(e.target.value)}
              min="0"
              required
            />

            <Select value={signupGender} onChange={(e) => setSignupGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>

            <Select value={signupVisitorType} onChange={(e) => setSignupVisitorType(e.target.value)} required>
              <option value="">Select Visitor Type</option>
              <option value="Resident">Resident</option>
              <option value="Tourist">Tourist</option>
            </Select>

            <CheckboxContainer>
              <Checkbox
                id="accessibilityNeeds"
                checked={signupAccessibilityNeeds}
                onChange={(e) => setSignupAccessibilityNeeds(e.target.checked)}
              />
              <Label htmlFor="accessibilityNeeds">Wheelchair access required?</Label>
            </CheckboxContainer>

            <CheckboxContainer>
              <Checkbox
                id="newsletterOptIn"
                checked={signupNewsletterOptIn}
                onChange={(e) => setSignupNewsletterOptIn(e.target.checked)}
              />
              <Label htmlFor="newsletterOptIn">Opt-in to Newsletter</Label>
            </CheckboxContainer>

            <Button type="submit">Sign Up</Button>
          </Form>
        )}
      </AuthBox>
    </Container>
  );
};

export default AuthScreen;