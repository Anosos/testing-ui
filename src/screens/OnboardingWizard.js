import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Import Steps
import WelcomeStep from '../components/onboarding/WelcomeStep';
import PersonaStep from '../components/onboarding/PersonaStep';
import EraStep from '../components/onboarding/EraStep';

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const { generateAndSetPath } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('English');
  const [personas, setPersonas] = useState([]);
  const [eras, setEras] = useState([]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleFinish = () => {
    generateAndSetPath(personas, eras);
    navigate('/home'); 
  };

  switch (step) {
    case 1:
      return (
        <WelcomeStep
          onNext={nextStep}
          language={language}
          setLanguage={setLanguage}
        />
      );
    case 2:
      return (
        <PersonaStep
          onNext={nextStep}
          onBack={prevStep}
          personas={personas}
          setPersonas={setPersonas}
        />
      );
    case 3:
      return (
        <EraStep
          onBack={prevStep}
          onFinish={handleFinish}
          eras={eras}
          setEras={setEras}
        />
      );
    default:
      return null;
  }
};

export default OnboardingWizard;