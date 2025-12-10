import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Slightly lighter overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ProfileCard = styled.div`
  background-color: #FFFFFF; /* Off-white background */
  border: 2px solid #C09943;
  border-radius: 15px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(192, 153, 67, 0.3); /* Adjusted shadow */

  @media (max-width: 480px) {
    padding: 20px;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  color: #333333; /* Darker close button */
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: darkgoldenrod; /* Adjusted for off-white theme */
  font-size: 24px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const ProfileIcon = styled.div`
  font-size: 64px;
  margin-bottom: 15px;
`;

const InfoSection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  color: #C09943;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  border-bottom: 1px solid #E0E0E0; /* Lighter border */
  padding-bottom: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: #333333; /* Darker text */
  border-bottom: 1px solid #F0F0F0; /* Lighter border */

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: #666666; /* Darker label */
  font-size: 13px;
  font-weight: bold;
`;

const Value = styled.span`
  color: #333333; /* Darker value */
  font-size: 14px;
  font-weight: bold;
  text-align: right;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  border: 2px solid transparent;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #D32F2F;
  color: white;
  border-color: #D32F2F;

  &:hover {
    box-shadow: 0 0 15px rgba(211, 47, 47, 0.5);
    transform: translateY(-2px);
  }
`;

const EditButton = styled(Button)`
  background-color: #C09943;
  color: #333333; /* Darker text */
  border-color: #C09943;

  &:hover {
    box-shadow: 0 0 15px rgba(192, 153, 67, 0.5);
    transform: translateY(-2px);
  }
`;

const NoUserMessage = styled.div`
  text-align: center;
  padding: 30px 20px;
  color: #333333; /* Darker text */

  p {
    margin-bottom: 15px;
  }
`;

const LoginPromptButton = styled(EditButton)`
  width: 100%;
`;

export default function UserProfile({ isOpen, onClose, user, onLogout, onLoginClick }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ProfileCard onClick={e => e.stopPropagation()}>
        <ProfileWrapper>
          <CloseButton onClick={onClose}>×</CloseButton>

          {user ? (
            <>
              <Header>
                <ProfileIcon>👤</ProfileIcon>
                <Title>{user.fullName}</Title>
              </Header>

              <InfoSection>
                <SectionTitle>Account Information</SectionTitle>
                <InfoRow>
                  <Label>Email:</Label>
                  <Value>{user.email}</Value>
                </InfoRow>
                <InfoRow>
                  <Label>Member Since:</Label>
                  <Value>{user.createdDate || user.loginDate}</Value>
                </InfoRow>
                <InfoRow>
                  <Label>User ID:</Label>
                  <Value>#{user.id}</Value>
                </InfoRow>
              </InfoSection>

              <InfoSection>
                <SectionTitle>Profile Statistics</SectionTitle>
                <InfoRow>
                  <Label>Galleries Visited:</Label>
                  <Value>12</Value>
                </InfoRow>
                <InfoRow>
                  <Label>Items Collected:</Label>
                  <Value>28</Value>
                </InfoRow>
                <InfoRow>
                  <Label>Tours Completed:</Label>
                  <Value>5</Value>
                </InfoRow>
              </InfoSection>

              <ButtonGroup>
                <EditButton onClick={() => alert('Edit profile coming soon!')}>
                  ✏️ Edit
                </EditButton>
                <LogoutButton onClick={onLogout}>
                  🚪 Logout
                </LogoutButton>
              </ButtonGroup>
            </>
          ) : (
            <NoUserMessage>
              <p>📱 Welcome to GEM APP</p>
              <p>You are not logged in. Please login or create an account to access your profile and save your preferences.</p>
              <LoginPromptButton onClick={onLoginClick}>
                🔐 Login / Sign Up
              </LoginPromptButton>
            </NoUserMessage>
          )}
        </ProfileWrapper>
      </ProfileCard>
    </Overlay>
  );
}
