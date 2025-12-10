import React from 'react';
import styled from 'styled-components';

const eraOptions = [
  "1069-394 BC",
  "1550-1069 BC",
  "2034-1550 BC",
  "700000-2034 BC",
  "All Centuries"
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
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OptionButton = styled.button`
  padding: 12px 20px;
  background: ${({ selected }) => (selected ? 'linear-gradient(135deg, #C09943 0%, #a8773f 100%)' : 'rgba(0, 0, 0, 0.5)')};
  color: #fff;
  border: 2px solid #C09943;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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

const EraStep = ({ onBack, onFinish, eras, setEras }) => {
  const handleEraClick = (era) => {
    const isAllSelected = eras.includes("All Centuries");
    const isCurrentSelected = eras.includes(era);

    if (era === "All Centuries") {
      if (isAllSelected) {
        setEras([]);
      } else {
        setEras(["All Centuries"]);
      }
    } else {
      if (isAllSelected) return;

      if (isCurrentSelected) {
        setEras(eras.filter(e => e !== era));
      } else {
        if (eras.length < 2) {
          setEras([...eras, era]);
        }
      }
    }
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Select The Era(s)</SectionTitle>
        <OptionsContainer>
          {eraOptions.map(e => {
            const isAllSelected = eras.includes("All Centuries");
            const isSelected = eras.includes(e);
            const isDisabled = e !== "All Centuries" && isAllSelected;

            return (
              <OptionButton
                key={e}
                selected={isSelected}
                disabled={isDisabled}
                onClick={() => handleEraClick(e)}
              >
                {e}
              </OptionButton>
            );
          })}
        </OptionsContainer>
      </Section>
      <ButtonContainer>
        <NavButton onClick={onBack}>Back</NavButton>
        <NavButton onClick={onFinish} disabled={eras.length === 0}>Start Journey</NavButton>
      </ButtonContainer>
    </Container>
  );
};

export default EraStep;
