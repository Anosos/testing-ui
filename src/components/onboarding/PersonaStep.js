import React from 'react';
import styled from 'styled-components';

const personaOptions = [
  "The Master Builder",
  "The Royal Heir",
  "The Warrior",
  "The High Priest",
  "The Artisan",
  "The Explorer"
];

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #C09943;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h2`
  color: #C09943;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const OptionCard = styled.div`
  padding: 20px;
  background: ${({ selected }) => (selected ? 'linear-gradient(135deg, #C09943 0%, #a8773f 100%)' : 'rgba(0, 0, 0, 0.5)')};
  color: #fff;
  border: 2px solid #C09943;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NavButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #C09943 0%, #a8773f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(192, 153, 67, 0.4);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const SelectAllButton = styled.button`
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid #C09943;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: rgba(192, 153, 67, 0.2);
  }
`;

const PersonaStep = ({ onNext, onBack, personas, setPersonas }) => {
  const handlePersonaClick = (persona) => {
    if (personas.includes(persona)) {
      setPersonas(personas.filter(p => p !== persona));
    } else {
      setPersonas([...personas, persona]);
    }
  };

  const handleSelectAll = () => {
    if (personas.length === personaOptions.length) {
      setPersonas([]);
    } else {
      setPersonas(personaOptions);
    }
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Select Your Persona(s)</SectionTitle>
        <SelectAllButton onClick={handleSelectAll}>
          {personas.length === personaOptions.length ? 'Deselect All' : 'Select All'}
        </SelectAllButton>
        <OptionsContainer>
          {personaOptions.map(p => (
            <OptionCard
              key={p}
              selected={personas.includes(p)}
              onClick={() => handlePersonaClick(p)}
            >
              {p}
            </OptionCard>
          ))}
        </OptionsContainer>
      </Section>
      <ButtonContainer>
        <NavButton onClick={onBack}>Back</NavButton>
        <NavButton onClick={onNext} disabled={personas.length === 0}>Next</NavButton>
      </ButtonContainer>
    </Container>
  );
};

export default PersonaStep;
