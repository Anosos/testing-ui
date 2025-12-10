import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';

// --- Styled Components ---

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background: linear-gradient(135deg, #0f1014 0%, #1a1b23 100%);
  overflow-y: auto;
  color: #fff;
  font-family: 'Cinzel', serif; /* Font fitting the theme */
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.95);
  border-bottom: 2px solid #C09943;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 15px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(192, 153, 67, 0.2);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #C09943;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    color: #fff;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  flex: 1;
  color: #C09943;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProfileSection = styled.div`
  background: radial-gradient(circle at center, rgba(192, 153, 67, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%);
  border: 1px solid #C09943;
  border-radius: 16px;
  padding: 40px 20px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, transparent, #C09943, transparent);
  }
`;

const UserLevelIcon = styled.div`
  font-size: 70px;
  margin-bottom: 10px;
  text-shadow: 0 0 30px rgba(192, 153, 67, 0.6);
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const UserName = styled.h2`
  font-size: 32px;
  margin: 10px 0;
  color: #fff;
`;

const UserTitle = styled.p`
  font-size: 18px;
  color: #C09943;
  margin: 5px 0;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const UserDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  font-style: italic;
`;

const XPContainer = styled.div`
  margin-top: 30px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const XPLabel = styled.p`
  font-size: 14px;
  color: #C09943;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const XPBar = styled.div`
  width: 100%;
  height: 20px;
  background: #2a2a2a;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #555;
`;

const XPProgress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #b8860b 0%, #ffd700 100%);
  width: ${props => props.percentage}%;
  transition: width 1s ease-in-out;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #fff;
  margin-bottom: 25px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(192, 153, 67, 0.3);
  padding-bottom: 10px;

  span { color: #C09943; }
`;

const LevelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const LevelCard = styled.div`
  background: ${props => props.isActive ? 'rgba(192, 153, 67, 0.15)' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${props => props.isActive ? '#C09943' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(192, 153, 67, 0.08);
  }

  ${props => props.isLocked && `
    opacity: 0.6;
    filter: grayscale(0.8);
  `}
`;

const LevelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const LevelLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LevelIcon = styled.div`
  font-size: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  border: 1px solid #C09943;
`;

const LevelInfo = styled.div``;

const LevelName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.isActive ? '#ffd700' : '#fff'};
`;

const LevelTheme = styled.div`
  font-size: 12px;
  color: #C09943;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LevelStatus = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.unlocked ? '#4CAF50' : '#888'};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PerksList = styled.ul`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const PerkItem = styled.li`
  font-size: 13px;
  color: #ddd;
  margin-bottom: 5px;
  list-style-marker-color: #C09943;
  
  &::marker {
    color: #C09943;
  }
`;

const ToggleText = styled.span`
  font-size: 10px;
  color: #aaa;
  margin-left: 10px;
  text-decoration: underline;
`;

// --- DATA: The Egyptian Hierarchy ---

const egyptianLevels = [
  {
    id: 1,
    name: 'Sobek (سوبيك)',
    theme: 'The Warrior',
    icon: '🐊',
    minXP: 0,
    maxXP: 1000,
    desc: 'The stage of proving existence. The beginning of the journey.',
    perks: [
      '"Nile Shield" Badge on profile',
      'Access to community participation',
      '5% Discount on tickets/store',
      'Access to general content'
    ]
  },
  {
    id: 2,
    name: 'Anubis (أنوبيس)',
    theme: 'The Guardian',
    icon: '🐺',
    minXP: 1000,
    maxXP: 5000,
    desc: 'A trusted guardian of the community.',
    perks: [
      'Fast Track (Priority entry)',
      'Profile Customization (Dark Mode)',
      'Exclusive "Behind the Scenes" content',
      'Priority Technical Support'
    ]
  },
  {
    id: 3,
    name: 'Thoth (تحوت)',
    theme: 'The Sage',
    icon: '🪶',
    minXP: 5000,
    maxXP: 15000,
    desc: 'The stage of knowledge maturity. Expert and scholar.',
    perks: [
      'Access to "Knowledge Library" (Courses)',
      '"Grand Scribe" Badge',
      'Publishing Rights (Articles)',
      'Certified Attendance Certificates'
    ]
  },
  {
    id: 4,
    name: 'Osiris (أوزيريس)',
    theme: 'The Ruler',
    icon: '👑',
    minXP: 15000,
    maxXP: 50000,
    desc: 'The VIP Elite. Commands respect and high status.',
    perks: [
      'VIP Lounge Access',
      'High Discount (25-50%)',
      'Voting Rights on decisions',
      '"+1" Free Invitation for a friend'
    ]
  },
  {
    id: 5,
    name: 'Amun (آمون)',
    theme: 'The Legend',
    icon: '☀',
    minXP: 50000,
    maxXP: 1000000, // Effectively infinite
    desc: 'The absolute peak. Living legend.',
    perks: [
      'Lifetime Free Access to all events',
      'Private meetings with Founders',
      'Exclusive luxury Merch Box',
      'Permanent name on "Hall of Fame"'
    ]
  }
];

// --- Main Component ---

const LoyaltyScreen = ({ onBack, user }) => {
  const { xp } = useContext(AppContext); // Assuming context provides { xp: 1200, ... }
  const currentXP = xp || 0;

  // Toggle state for showing perks
  const [expandedLevel, setExpandedLevel] = useState(null);

  const toggleLevel = (id) => {
    setExpandedLevel(expandedLevel === id ? null : id);
  };

  // Logic to find current level
  const getCurrentLevel = () => {
    // Find the highest level where currentXP >= minXP
    return egyptianLevels.slice().reverse().find(l => currentXP >= l.minXP) || egyptianLevels[0];
  };

  const currentLevel = getCurrentLevel();
  
  // Calculate Progress to next level
  const nextLevel = egyptianLevels.find(l => l.minXP > currentXP);
  let xpPercentage = 100;
  let nextLevelXP = currentLevel.maxXP;
  
  if (nextLevel) {
    nextLevelXP = nextLevel.minXP;
    const range = nextLevel.minXP - currentLevel.minXP;
    const progress = currentXP - currentLevel.minXP;
    xpPercentage = (progress / range) * 100;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅</BackButton>
        <Title>The Path of Ascension</Title>
      </Header>

      <Content>
        {/* User Status Card */}
        <ProfileSection>
          <UserLevelIcon>{currentLevel.icon}</UserLevelIcon>
          <UserName>{user?.name || 'Traveler'}</UserName>
          <UserTitle>{currentLevel.name}</UserTitle>
          <UserDesc>"{currentLevel.theme}"</UserDesc>
          
          <XPContainer>
            <XPLabel>
              <span>Current XP: {currentXP.toLocaleString()}</span>
              {nextLevel && <span>Target: {nextLevelXP.toLocaleString()}</span>}
            </XPLabel>
            <XPBar>
              <XPProgress percentage={xpPercentage} />
            </XPBar>
            {nextLevel ? (
              <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                {(nextLevelXP - currentXP).toLocaleString()} XP to reach {nextLevel.name}
              </p>
            ) : (
              <p style={{ fontSize: '12px', color: '#ffd700', marginTop: '5px' }}>Maximum Power Achieved!</p>
            )}
          </XPContainer>
        </ProfileSection>

        {/* Levels List */}
        <SectionTitle><span>📜</span> The Sacred Hierarchy</SectionTitle>
        <LevelList>
          {egyptianLevels.map((level) => {
            const isUnlocked = currentXP >= level.minXP;
            const isActive = currentLevel.id === level.id;
            const isOpen = expandedLevel === level.id || isActive;

            return (
              <LevelCard 
                key={level.id} 
                isActive={isActive} 
                isLocked={!isUnlocked}
                onClick={() => toggleLevel(level.id)}
              >
                <LevelHeader>
                  <LevelLeft>
                    <LevelIcon>{level.icon}</LevelIcon>
                    <LevelInfo>
                      <LevelName isActive={isActive}>{level.name}</LevelName>
                      <LevelTheme>{level.theme}</LevelTheme>
                    </LevelInfo>
                  </LevelLeft>
                  <LevelStatus unlocked={isUnlocked}>
                    {isUnlocked ? (isActive ? 'Current Rank' : 'Completed') : 'Locked'}
                    {isOpen ? ' ▲' : ' ▼'}
                  </LevelStatus>
                </LevelHeader>

                {/* Perks Section (Collapsible) */}
                <PerksList isOpen={isOpen}>
                  <p style={{fontSize:'12px', color:'#aaa', marginBottom:'10px', fontStyle:'italic'}}>
                    {level.desc}
                  </p>
                  {level.perks.map((perk, idx) => (
                    <PerkItem key={idx}>{perk}</PerkItem>
                  ))}
                </PerksList>
              </LevelCard>
            );
          })}
        </LevelList>

      </Content>
    </Container>
  );
};

export default LoyaltyScreen;