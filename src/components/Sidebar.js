import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---

const SidebarContainer = styled.div`
  position: fixed;
  left: ${props => (props.isOpen ? '0' : '-280px')};
  top: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
  box-shadow: ${props => (props.isOpen ? '2px 0 10px rgba(0, 0, 0, 0.5)' : 'none')};
  transition: left 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  padding-top: 20px;

  @media (max-width: 768px) {
    width: 250px;
  }

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: #C09943;
    border-radius: 3px;
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 999;
  backdrop-filter: blur(2px);
`;

// This was missing in your previous code
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  transition: color 0.3s ease;

  &:hover {
    color: #C09943;
    transform: scale(1.1);
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 2px solid #C09943;
  margin-bottom: 20px;
  margin-top: 20px; /* Added space so logo isn't behind close button */
`;

const AppLogo = styled.h2`
  color: #fff;
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 24px;
  }
`;

const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  color: #fff;
  padding: 15px 25px;
  text-align: left;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  border-left: 4px solid transparent;
  font-weight: 500;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-left-color: #C09943;
    color: #C09943;
  }

  svg,
  span {
    font-size: 18px;
  }
`;

const SidebarDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 15px 0;
`;

const SectionLabel = styled.div`
  color: #C09943;
  font-size: 11px;
  padding: 10px 25px 5px 25px;
  margin-top: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
`;

// --- Main Component ---

const Sidebar = ({ isOpen, onClose, onNavigate }) => {
  const handleMenuClick = (screen) => {
    // Navigate to the screen
    if (onNavigate) onNavigate(screen);
    // Close the sidebar
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay to close when clicking outside */}
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />

      <SidebarContainer isOpen={isOpen}>
        {/* The Close Button 'X' */}
        <CloseButton onClick={onClose}>✕</CloseButton>

        <SidebarHeader>
          <AppLogo>
            <span>🏛️</span>
            GEM APP
          </AppLogo>
        </SidebarHeader>

        <SidebarMenu>
          <SectionLabel>🎮 EXPLORE</SectionLabel>
          
          <MenuItem onClick={() => handleMenuClick('home')}>
            <span>🏠</span>
            Home
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuClick('searchByID')}>
            <span>🔍</span>
            Search by ID
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuClick('favorites')}>
            <span>❤️</span>
            My Favorites
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuClick('loyalty')}>
            <span>🏆</span>
            Loyalty & XP
          </MenuItem>

          <SidebarDivider />

          <SectionLabel>🎧 PREMIUM</SectionLabel>
          
          <MenuItem onClick={() => handleMenuClick('audioGuide')}>
            <span>🎧</span>
            Audio Guides
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuClick('tickets')}>
            <span>🎫</span>
            Buy Tickets
          </MenuItem>

          <SidebarDivider />

          <SectionLabel>💬 TOOLS</SectionLabel>
          
          <MenuItem onClick={() => handleMenuClick('chatbot')}>
            <span>🤖</span>
            Chat Support
          </MenuItem>

          <SidebarDivider />

          <SectionLabel>⚙️ MORE</SectionLabel>
          
          <MenuItem onClick={() => handleMenuClick('settings')}>
            <span>⚙️</span>
            Settings
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuClick('help')}>
            <span>❓</span>
            Help & Support
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuClick('about')}>
            <span>ℹ️</span>
            About GEM APP
          </MenuItem>
        </SidebarMenu>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;