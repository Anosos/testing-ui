import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  overflow-y: auto;
  color: #fff;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.9);
  border-bottom: 2px solid #C09943;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 15px;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    color: #C09943;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  flex: 1;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Section = styled.div`
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
  display: flex;
  align-items: center;
  gap: 10px;

  &:before {
    content: '';
    width: 4px;
    height: 20px;
    background: #C09943;
    border-radius: 2px;
  }
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid rgba(192, 153, 67, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.label`
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
`;

const SettingDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin: 5px 0 0 0;
`;

const Toggle = styled.input`
  width: 50px;
  height: 28px;
  cursor: pointer;
  accent-color: #C09943;
`;

const Select = styled.select`
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #C09943;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;

  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #C09943 0%, #a8773f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(192, 153, 67, 0.4);
  }
`;

// Settings Screen
export const SettingsScreen = ({ onBack }) => {
  const [settings, setSettings] = useState({
    language: 'en',
    notifications: true,
    darkMode: true,
    privateProfile: false,
    dataCollection: true,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value,
    }));
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>Settings ⚙️</Title>
      </Header>

      <Content>
        <Section>
          <SectionTitle>Appearance</SectionTitle>
          <SettingItem>
            <div>
              <SettingLabel>Dark Mode</SettingLabel>
              <SettingDescription>Enable dark theme for comfortable viewing</SettingDescription>
            </div>
            <Toggle
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Language & Region</SectionTitle>
          <SettingItem>
            <SettingLabel>Default Language</SettingLabel>
            <Select value={settings.language} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ar">العربية</option>
            </Select>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Notifications</SectionTitle>
          <SettingItem>
            <div>
              <SettingLabel>Push Notifications</SettingLabel>
              <SettingDescription>Receive updates about new exhibitions and events</SettingDescription>
            </div>
            <Toggle
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Privacy & Security</SectionTitle>
          <SettingItem>
            <div>
              <SettingLabel>Private Profile</SettingLabel>
              <SettingDescription>Hide your profile from other users</SettingDescription>
            </div>
            <Toggle
              type="checkbox"
              checked={settings.privateProfile}
              onChange={() => handleToggle('privateProfile')}
            />
          </SettingItem>
          <SettingItem>
            <div>
              <SettingLabel>Data Collection</SettingLabel>
              <SettingDescription>Allow anonymous usage analytics</SettingDescription>
            </div>
            <Toggle
              type="checkbox"
              checked={settings.dataCollection}
              onChange={() => handleToggle('dataCollection')}
            />
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Account</SectionTitle>
          <SettingItem>
            <Button>Change Password</Button>
          </SettingItem>
          <SettingItem>
            <Button>Delete Account</Button>
          </SettingItem>
        </Section>
      </Content>
    </Container>
  );
};

// Help & Support Screen
export const HelpScreen = ({ onBack }) => {
  const faqs = [
    {
      question: 'How do I book tickets?',
      answer: 'Go to the "Buy Tickets" section, select your date, time, and ticket type, then proceed to payment.',
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel up to 24 hours before your visit for a full refund.',
    },
    {
      question: 'How do audio guides work?',
      answer: 'Audio guides require a subscription. Subscribe to get access to all premium guides.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, and digital wallets.',
    },
    {
      question: 'How do I earn XP points?',
      answer: 'Visit artifacts, save them to your collection, and complete tours to earn XP.',
    },
  ];

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>Help & Support ❓</Title>
      </Header>

      <Content>
        <Section>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          {faqs.map((faq, index) => (
            <div key={index}>
              <SettingItem
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                style={{ cursor: 'pointer' }}
              >
                <SettingLabel>{faq.question}</SettingLabel>
                <span>{expandedFAQ === index ? '▼' : '▶'}</span>
              </SettingItem>
              {expandedFAQ === index && (
                <div style={{ padding: '15px 0', color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(192, 153, 67, 0.2)' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </Section>

        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <SettingItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <SettingLabel>Email Support</SettingLabel>
            <p style={{ color: '#C09943', margin: '10px 0 0 0' }}>support@gemmuseum.com</p>
          </SettingItem>
          <SettingItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <SettingLabel>Phone</SettingLabel>
            <p style={{ color: '#C09943', margin: '10px 0 0 0' }}>+20 (0)2 XXXX XXXX</p>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Resources</SectionTitle>
          <SettingItem>
            <Button>View Documentation</Button>
          </SettingItem>
          <SettingItem>
            <Button>Watch Tutorial Videos</Button>
          </SettingItem>
        </Section>
      </Content>
    </Container>
  );
};

// About Screen
export const AboutScreen = ({ onBack }) => {
  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>About GEM APP ℹ️</Title>
      </Header>

      <Content>
        <Section>
          <SectionTitle>About Us</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', margin: 0 }}>
            GEM APP is your gateway to exploring the wonders of ancient Egypt. With immersive experiences, 
            detailed artifact information, and interactive features, we bring museum exploration to life. 
            Our mission is to make cultural heritage accessible to everyone, everywhere.
          </p>
        </Section>

        <Section>
          <SectionTitle>App Information</SectionTitle>
          <SettingItem>
            <span>Version</span>
            <span style={{ color: '#C09943' }}>3.0.0</span>
          </SettingItem>
          <SettingItem>
            <span>Build Number</span>
            <span style={{ color: '#C09943' }}>2024.12.09</span>
          </SettingItem>
          <SettingItem>
            <span>Developer</span>
            <span style={{ color: '#C09943' }}>GEM Museum Team</span>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Team</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', margin: 0 }}>
            <strong>Developed by:</strong> Our dedicated team of developers, designers, and Egyptologists
            <br /><br />
            <strong>Special Thanks:</strong> Egyptian Ministry of Antiquities, Museum Partners, and our Community
          </p>
        </Section>

        <Section>
          <SectionTitle>Legal</SectionTitle>
          <SettingItem>
            <Button>Privacy Policy</Button>
          </SettingItem>
          <SettingItem>
            <Button>Terms of Service</Button>
          </SettingItem>
          <SettingItem>
            <Button>Licenses & Attribution</Button>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>Connect With Us</SectionTitle>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Button style={{ flex: 1 }}>📘 Facebook</Button>
            <Button style={{ flex: 1 }}>🐦 Twitter</Button>
            <Button style={{ flex: 1 }}>📷 Instagram</Button>
          </div>
        </Section>
      </Content>
    </Container>
  );
};
