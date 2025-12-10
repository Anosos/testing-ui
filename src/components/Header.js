import React from 'react';
import styled from 'styled-components';

const HeaderBar = styled.header`
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px; /* Increased padding */
  z-index: 120;
  background-color: rgba(30, 30, 30, 0.8); /* Dark, semi-transparent background */
  backdrop-filter: blur(8px); /* Frosted glass effect */
  border-bottom: 1px solid rgba(192, 153, 67, 0.2); /* Subtle gold-tinted bottom border */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); /* Depth effect */
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #C09943;
  font-weight: 700;
  font-size: 16px;
`;

const IconButton = styled.button`
  background: linear-gradient(135deg, #C09943 0%, #a8773f 100%);
  border: none;
  color: #fff;
  padding: 8px 14px; /* Adjusted padding */
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */

  &:hover {
    background-color: #a8773f; /* Darker gold on hover */
    transform: translateY(-1px); /* Slight lift effect */
  }

  &:active {
    transform: translateY(0); /* Return to original position on click */
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GuestBadge = styled.span`
  color: #C09943; /* Match gold accent */
  background: rgba(192, 153, 67, 0.15); /* Slightly darker, semi-transparent gold background */
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
`;

export default function Header({ onToggleSidebar, user, onProfileClick, onAuthClick }) {
  const isGuest = localStorage.getItem('isGuest') === 'true';

  return (
    <HeaderBar>
      <LeftGroup>
        <IconButton onClick={onToggleSidebar} aria-label="Open menu">☰</IconButton>
        <Brand>
          <span>💠</span>
          GEM NEXUS
        </Brand>
      </LeftGroup>

      <RightGroup>
        {isGuest && <GuestBadge>Guest</GuestBadge>}
        {user ? (
          <IconButton onClick={onProfileClick}>👤</IconButton>
        ) : (
          <IconButton onClick={onAuthClick}>Login</IconButton>
        )}
      </RightGroup>
    </HeaderBar>
  );
}
