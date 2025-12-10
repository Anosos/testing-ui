import React, { useState } from 'react';
import styled from 'styled-components';
import { TIME_PERIODS } from '../api';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background removed to use global off-white background */
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  overflow: hidden;
`;

const Header = styled.h2`
  color: darkgoldenrod; /* Adjusted for off-white background */
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
  color: #333333; /* Adjusted for off-white background */
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

const PeriodBox = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background-color: ${props => props.isSelected ? '#C09943' : '#E0E0E0'}; /* Adjusted for off-white background */
  border: 2px solid ${props => props.isSelected ? '#FFF' : '#999999'}; /* Adjusted for off-white background */
  display: flex;
  flex-direction: column;
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

const PeriodIcon = styled.span`
  font-size: 32px;
  margin-bottom: 8px;
`;

const PeriodLabel = styled.p`
  color: #333333; /* Adjusted for off-white background */
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 5px 0;
`;

const PeriodDesc = styled.p`
  color: ${props => props.isSelected ? '#000' : '#666666'}; /* Adjusted for off-white background */
  font-size: 11px;
  margin: 0;
  text-align: center;
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
  color: ${props => props.disabled ? '#999999' : '#333333'}; /* Adjusted for light background */
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
  color: white; /* Keep white for clear button for contrast */
  padding: 12px 20px;
  font-size: 14px;

  &:hover {
    border-color: #FF5722;
  }
`;

export default function TimePeriodScreen({ onContinue, onBack }) { // Changed component name here
  const [selectedPeriods, setSelectedPeriods] = useState([]);

  const togglePeriod = (periodKey) => {
    setSelectedPeriods(prev => {
      if (prev.includes(periodKey)) {
        return prev.filter(p => p !== periodKey);
      } else {
        return [...prev, periodKey];
      }
    });
  };

  const handleContinue = () => {
    if (selectedPeriods.length > 0) {
      onContinue(selectedPeriods);
    }
  };

  const handleClear = () => {
    setSelectedPeriods([]);
  };

  return (
    <Container>
      <Header>Select Time Period(s)</Header>
      <Subtitle>Choose one or more eras you want to explore</Subtitle>
      
      {selectedPeriods.length > 0 && (
        <SelectionInfo>
          ✓ {selectedPeriods.length} period{selectedPeriods.length !== 1 ? 's' : ''} selected
        </SelectionInfo>
      )}

      <Grid>
        {TIME_PERIODS.map(period => (
          <PeriodBox
            key={period.key}
            isSelected={selectedPeriods.includes(period.key)}
            onClick={() => togglePeriod(period.key)}
          >
            <CheckIcon show={selectedPeriods.includes(period.key)}>✓</CheckIcon>
            <PeriodIcon>{period.icon}</PeriodIcon>
            <PeriodLabel>{period.label}</PeriodLabel>
            <PeriodDesc isSelected={selectedPeriods.includes(period.key)}>
              {period.desc}
            </PeriodDesc>
          </PeriodBox>
        ))}
      </Grid>

      <ButtonContainer>
        <BackButton onClick={onBack}>← Back</BackButton>
        {selectedPeriods.length > 0 && (
          <ClearButton onClick={handleClear}>Clear All</ClearButton>
        )}
        <ContinueButton disabled={selectedPeriods.length === 0} onClick={handleContinue}>
          Continue → ({selectedPeriods.length})
        </ContinueButton>
      </ButtonContainer>
    </Container>
  );
}