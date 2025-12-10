import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 20px;
`;

const Header = styled.h2`
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #aaaaaa;
  font-size: 14px;
  margin-bottom: 40px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const TimePeriodBox = styled.button`
  width: 100%;
  padding: 30px 20px;
  border-radius: 15px;
  background-color: ${props => props.isSelected ? '#C09943' : '#1E1E1E'};
  border: 2px solid ${props => props.isSelected ? '#FFF' : '#333333'};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isSelected ? '0 0 20px rgba(192, 153, 67, 0.6)' : 'none'};
  transform: ${props => props.isSelected ? 'scale(1.05)' : 'scale(1)'};

  &:hover {
    border-color: #C09943;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TimePeriodIcon = styled.span`
  font-size: 36px;
  margin-bottom: 10px;
`;

const TimePeriodLabel = styled.p`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px 0;
`;

const TimePeriodDesc = styled.p`
  color: ${props => props.isSelected ? '#000' : '#aaa'};
  font-size: 12px;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 20px;
`;

const ContinueButton = styled.button`
  background-color: ${props => props.disabled ? '#555555' : '#C09943'};
  border: 2px solid #C09943;
  color: ${props => props.disabled ? '#999999' : '#000000'};
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 0 20px rgba(192, 153, 67, 0.6);
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  background-color: #333333;
  border: 2px solid #555555;
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #C09943;
  }
`;

export default function TimePeriodScreen({ onContinue, onBack }) {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const periods = [
    {
      key: '2034-1550',
      label: 'New Kingdom',
      desc: '1550 - 1070 BCE',
      icon: '👑',
      details: 'The age of pharaohs and temples'
    },
    {
      key: '1550-1069',
      label: 'Middle Kingdom',
      desc: '2034 - 1550 BCE',
      icon: '🏰',
      details: 'An era of stability and prosperity'
    },
  ];

  const handleContinue = () => {
    if (selectedPeriod) {
      onContinue(selectedPeriod);
    }
  };

  return (
    <Container>
      <Header>Which Time Period Fascinates You?</Header>
      <Subtitle>Select the era you'd like to explore</Subtitle>

      <Grid>
        {periods.map(period => (
          <TimePeriodBox
            key={period.key}
            isSelected={selectedPeriod === period.key}
            onClick={() => setSelectedPeriod(period.key)}
          >
            <TimePeriodIcon>{period.icon}</TimePeriodIcon>
            <TimePeriodLabel>{period.label}</TimePeriodLabel>
            <TimePeriodDesc isSelected={selectedPeriod === period.key}>
              {period.desc}
            </TimePeriodDesc>
          </TimePeriodBox>
        ))}
      </Grid>

      <ButtonContainer>
        <BackButton onClick={onBack}>← Back</BackButton>
        <ContinueButton disabled={!selectedPeriod} onClick={handleContinue}>
          Continue →
        </ContinueButton>
      </ButtonContainer>
    </Container>
  );
}
