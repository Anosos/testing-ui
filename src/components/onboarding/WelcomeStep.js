import React from 'react';
import styled from 'styled-components';

const languages = [
  "English", "Spanish", "French", "German", "Arabic", "Mandarin", "Hindi", "Russian", "Portuguese", "Bengali",
  "Urdu", "Indonesian", "Japanese", "Swahili", "Turkish", "Korean", "Vietnamese", "Italian", "Polish", "Ukrainian",
  "Dutch", "Greek", "Czech", "Swedish", "Romanian", "Hungarian", "Danish", "Finnish", "Norwegian", "Slovak",
  "Croatian", "Serbian", "Bulgarian", "Lithuanian", "Latvian", "Estonian", "Slovenian", "Maltese", "Icelandic",
  "Irish", "Luxembourgish", "Basque", "Catalan", "Galician", "Welsh", "Scottish Gaelic", "Corsican", "Frisian",
  "Javanese", "Sundanese", "Malay", "Filipino", "Thai", "Lao", "Khmer", "Burmese", "Amharic", "Somali",
  "Yoruba", "Zulu", "Xhosa", "Afrikaans", "Hausa", "Igbo", "Oromo", "Tigrinya", "Pashto", "Dari"
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

const WelcomeText = styled.h1`
  font-size: 48px;
  color: #C09943;
  margin-bottom: 30px;
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

const LanguageSelector = styled.select`
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #C09943;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
`;

const NextButton = styled.button`
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

const WelcomeStep = ({ onNext, language, setLanguage }) => {
  return (
    <Container>
      <WelcomeText>Welcome</WelcomeText>
      <Section>
        <SectionTitle>Select Your Language</SectionTitle>
        <LanguageSelector value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
        </LanguageSelector>
      </Section>
      <NextButton onClick={onNext}>Next</NextButton>
    </Container>
  );
};

export default WelcomeStep;
