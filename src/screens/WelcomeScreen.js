import React, { useState } from 'react';
import styled from 'styled-components';
import { SUPPORTED_LANGUAGES } from '../api';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;

const Title = styled.h1`
  color: #C09943;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  color: #C09943;
  font-weight: bold;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const LanguageSelect = styled.select`
  background-color: #333333;
  border: 2px solid #555555;
  color: #ffffff;
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;

  &:hover {
    border-color: #C09943;
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #C09943;
    box-shadow: 0 0 15px rgba(192, 153, 67, 0.5);
  }

  option {
    background-color: #333333;
    color: #ffffff;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 12px;
  }
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
  margin-top: 10px;

  &:hover:not(:disabled) {
    box-shadow: 0 0 20px rgba(192, 153, 67, 0.6);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 12px 30px;
  }
`;


export default function WelcomeScreen({ onContinue }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleContinue = () => {
    if (selectedLanguage) {
      onContinue(selectedLanguage);
    }
  };

  return (
    <Container>
      <Title>🏛️ GEM APP</Title>
      <Subtitle>
        Discover the wonders of ancient Egypt through personalized journeys tailored to your interests.
      </Subtitle>

      <FormContainer>
        <FormGroup>
          <Label>Select Your Language</Label>
          <LanguageSelect
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">-- Choose Language --</option>
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.icon} {lang.name}
              </option>
            ))}
          </LanguageSelect>
        </FormGroup>

        <ContinueButton
          disabled={!selectedLanguage}
          onClick={handleContinue}
        >
          Continue →
        </ContinueButton>
      </FormContainer>
    </Container>
  );
}
