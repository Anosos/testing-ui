import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Adjust height as needed */
  background-color: #C09943; /* Egyptian Gold color */
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0 10px;
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  color: #333333; /* Dark text for contrast */
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  span {
    font-size: 24px; /* Icon size */
    margin-bottom: 2px;
  }
`;

export default function Footer() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext); // Assuming user context might be needed for profile access

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleProfileClick = () => {
    // This could navigate to a profile screen or open a profile modal
    // For now, let's assume it navigates to a /profile route (which needs to be added to App.js)
    navigate('/profile'); 
  };

  return (
    <FooterContainer>
      <FooterButton onClick={handleHomeClick}>
        <span>🏠</span>
        Home
      </FooterButton>
      <FooterButton onClick={handleProfileClick}>
        <span>{user ? '👤' : '🚪'}</span> {/* User icon if logged in, door if not */}
        Profile
      </FooterButton>
    </FooterContainer>
  );
}
