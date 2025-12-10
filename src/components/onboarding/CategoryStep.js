import React from 'react';
import styled from 'styled-components';

const categoryOptions = ["Warriors", "Jewelry", "Artifacts/Artisan"];

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
  flex-wrap: wrap;
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

const CategoryStep = ({ onBack, onFinish, selectedCategories, setSelectedCategories }) => {

  const handleCategoryClick = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Choose Visual Categories</SectionTitle>
        <OptionsContainer>
          {categoryOptions.map(category => (
            <OptionButton
              key={category}
              selected={selectedCategories.includes(category)}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </OptionButton>
          ))}
        </OptionsContainer>
      </Section>
      <ButtonContainer>
        <NavButton onClick={onBack}>Back</NavButton>
        <NavButton onClick={onFinish}>Finish</NavButton>
      </ButtonContainer>
    </Container>
  );
};

export default CategoryStep;