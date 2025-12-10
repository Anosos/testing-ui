import React, { useState } from 'react';
import styled from 'styled-components';

const INTEREST_OPTIONS = [
  { key: 'master_builder', label: 'The Master Builder', icon: '🏗️' },
  { key: 'royal_heir', label: 'The Royal Heir', icon: '👑' },
  { key: 'warrior', label: 'The Warrior', icon: '🛡️' },
  { key: 'highest_priest', label: 'The Highest Priest', icon: '📜' },
  { key: 'artisan', label: 'The Artisan', icon: '🏺' },
  { key: 'explorer', label: 'The Explorer', icon: '🗺️' },
];

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  overflow: hidden;
`;

const Header = styled.h2`
  color: darkgoldenrod;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 22px;
    padding: 0 10px;
  }
`;

const Subtitle = styled.p`
  color: #333333;
  font-size: 14px;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 20px;
  }
`;

const SelectionInfo = styled.p`
  color: #C09943;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  padding: 20px;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
`;

const InterestBox = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background-color: ${props => props.isSelected ? '#C09943' : '#E0E0E0'}; /* Adjusted for off-white background */
  border: 2px solid ${props => props.isSelected ? '#FFF' : '#999999'}; /* Adjusted for off-white background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isSelected ? '0 0 20px rgba(192, 153, 67, 0.6)' : 'none'};
  transform: ${props => props.isSelected ? 'scale(1.05)' : 'scale(1)'};
  position: relative;

  &:hover {
    border-color: #C09943;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CheckIcon = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #4CAF50;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  opacity: ${props => props.show ? '1' : '0'};
  transition: opacity 0.3s ease;
`;

const InterestIcon = styled.span`
  font-size: 32px;
  margin-bottom: 8px;
`;

const InterestLabel = styled.p`
  color: ${props => props.isSelected ? '#333333' : '#333333'}; /* Adjusted for off-white background */
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  flex-wrap: wrap;
`;

const ContinueButton = styled.button`
  background-color: ${props => props.disabled ? '#CCCCCC' : '#C09943'};
  border: 2px solid #C09943;
  color: ${props => props.disabled ? '#999999' : '#333333'};
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 0 20px rgba(192, 153, 67, 0.6);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const BackButton = styled.button`
  background-color: #E0E0E0; /* Adjusted for off-white background */
  border: 2px solid #999999; /* Adjusted for off-white background */
  color: #333333; /* Adjusted for off-white background */
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #C09943;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const ClearButton = styled(BackButton)`
  background-color: #D32F2F;
  border-color: #D32F2F;
  color: white;
  padding: 12px 20px;
  font-size: 14px;

  &:hover {
    border-color: #FF5722;
  }
`;

export default function InterestScreen({ onContinue, onBack }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interestKey) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestKey)) {
        return prev.filter(p => p !== interestKey);
      } else {
        return [...prev, interestKey];
      }
    });
  };

  const handleContinue = () => {
    if (selectedInterests.length > 0) {
      onContinue(selectedInterests);
    }
  };

  const handleClear = () => {
    setSelectedInterests([]);
  };

  return (
    <Container>
      <Header>Select Your Interests</Header>
      <Subtitle>Choose one or more roles that resonate with you</Subtitle>
      
      {selectedInterests.length > 0 && (
        <SelectionInfo>
          ✓ {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
        </SelectionInfo>
      )}

      <Grid>
        {INTEREST_OPTIONS.map(interest => (
          <InterestBox
            key={interest.key}
            isSelected={selectedInterests.includes(interest.key)}
            onClick={() => toggleInterest(interest.key)}
          >
            <CheckIcon show={selectedInterests.includes(interest.key)}>✓</CheckIcon>
            <InterestIcon>{interest.icon}</InterestIcon>
            <InterestLabel isSelected={selectedInterests.includes(interest.key)}>
              {interest.label}
            </InterestLabel>
          </InterestBox>
        ))}
      </Grid>

      <ButtonContainer>
        <BackButton onClick={onBack}>← Back</BackButton>
        {selectedInterests.length > 0 && (
          <ClearButton onClick={handleClear}>Clear All</ClearButton>
        )}
        <ContinueButton disabled={selectedInterests.length === 0} onClick={handleContinue}>
          Continue → ({selectedInterests.length})
        </ContinueButton>
      </ButtonContainer>
    </Container>
  );
}
