import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';

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
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProfileSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #C09943;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  text-align: center;
`;

const UserLevel = styled.div`
  font-size: 60px;
  margin-bottom: 15px;
`;

const UserName = styled.h2`
  font-size: 28px;
  margin: 10px 0;
  color: #fff;
`;

const UserTitle = styled.p`
  font-size: 16px;
  color: #C09943;
  margin: 5px 0;
  font-weight: bold;
`;

const XPContainer = styled.div`
  margin-top: 25px;
`;

const XPLabel = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
`;

const XPBar = styled.div`
  width: 100%;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #C09943;
`;

const XPProgress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #C09943 0%, #a8773f 100%);
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(192, 153, 67, 0.1);
  border: 2px solid #C09943;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(192, 153, 67, 0.15);
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #C09943;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  color: #fff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:before {
    content: '';
    width: 4px;
    height: 25px;
    background: #C09943;
    border-radius: 2px;
  }
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
`;

const AchievementBadge = styled.div`
  background: ${props => (props.unlocked ? 'rgba(192, 153, 67, 0.2)' : 'rgba(0, 0, 0, 0.3)')};
  border: 2px solid ${props => (props.unlocked ? '#C09943' : 'rgba(192, 153, 67, 0.3)')};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => (props.unlocked ? 1 : 0.6)};

  &:hover {
    transform: scale(1.05);
    background: ${props => (props.unlocked ? 'rgba(192, 153, 67, 0.3)' : 'rgba(0, 0, 0, 0.4)')};
  }
`;

const BadgeIcon = styled.div`
  font-size: 50px;
  margin-bottom: 10px;
`;

const BadgeName = styled.p`
  font-size: 12px;
  color: ${props => (props.unlocked ? '#C09943' : 'rgba(255, 255, 255, 0.5)')};
  margin: 0;
  font-weight: bold;
`;

const LevelProgressSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #C09943;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
`;

const LevelItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid rgba(192, 153, 67, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const LevelName = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
`;

const LevelIcon = styled.div`
  font-size: 30px;
`;

const LevelInfo = styled.div``;

const LevelTitle = styled.p`
  font-size: 16px;
  color: #fff;
  margin: 0;
  font-weight: bold;
`;

const LevelReq = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 5px 0 0 0;
`;

const LevelStatus = styled.div`
  font-size: 14px;
  color: ${props => (props.achieved ? '#4CAF50' : '#C09943')};
  font-weight: bold;
`;

const achievements = [
  { name: 'First Steps', icon: '🏃', unlocked: true, req: 'Visit 1 artifact' },
  { name: 'Explorer', icon: '🗺️', unlocked: true, req: 'Visit 10 artifacts' },
  { name: 'Collector', icon: '🎯', unlocked: false, req: 'Save 5 items' },
  { name: 'Historian', icon: '📚', unlocked: false, req: 'Reach 50,000 XP' },
  { name: 'Master', icon: '👑', unlocked: false, req: 'Reach 100,000 XP' },
  { name: 'Scholar', icon: '🧠', unlocked: false, req: 'Complete all tours' },
];

const levels = [
  { icon: '🥚', title: 'Newcomer', minXP: 0, maxXP: 1000 },
  { icon: '🌱', title: 'Apprentice', minXP: 1000, maxXP: 5000 },
  { icon: '⭐', title: 'Enthusiast', minXP: 5000, maxXP: 10000 },
  { icon: '🏅', title: 'Connoisseur', minXP: 10000, maxXP: 50000 },
  { icon: '👑', title: 'Master', minXP: 50000, maxXP: 100000 },
];

const LoyaltyScreen = ({ onBack, user }) => {
  const { xp, visitedPieces, collection } = useContext(AppContext);
  const currentXP = xp || 0;
  const artifactsVisited = visitedPieces?.length || 0;
  const savedItems = collection?.length || 0;

  const getCurrentLevel = () => {
    return levels.find(
      (l, i) => currentXP >= l.minXP && (currentXP < l.maxXP || i === levels.length - 1)
    ) || levels[0];
  };

  const currentLevel = getCurrentLevel();
  const nextLevelXP = currentLevel.maxXP;
  const xpPercentage = nextLevelXP ? (currentXP / nextLevelXP) * 100 : 100;

  const unlockedAchievements = achievements.filter(a => {
    if (a.name === 'First Steps') return artifactsVisited >= 1;
    if (a.name === 'Explorer') return artifactsVisited >= 10;
    if (a.name === 'Collector') return savedItems >= 5;
    if (a.name === 'Historian') return currentXP >= 50000;
    if (a.name === 'Master') return currentXP >= 100000;
    return a.unlocked;
  });

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>Loyalty & Progress</Title>
      </Header>

      <Content>
        <ProfileSection>
          <UserLevel>{currentLevel.icon}</UserLevel>
          <UserName>{user?.name || 'Museum Enthusiast'}</UserName>
          <UserTitle>{currentLevel.title}</UserTitle>
          <XPContainer>
            <XPLabel>{currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</XPLabel>
            <XPBar>
              <XPProgress percentage={xpPercentage}>
                {Math.floor(xpPercentage)}%
              </XPProgress>
            </XPBar>
          </XPContainer>
        </ProfileSection>

        <StatsGrid>
          <StatCard>
            <StatIcon>🎭</StatIcon>
            <StatNumber>{artifactsVisited}</StatNumber>
            <StatLabel>Artifacts Visited</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>❤️</StatIcon>
            <StatNumber>{savedItems}</StatNumber>
            <StatLabel>Saved Items</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>🏛️</StatIcon>
            <StatNumber>12</StatNumber>
            <StatLabel>Tours Completed</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>🎯</StatIcon>
            <StatNumber>{unlockedAchievements.length}</StatNumber>
            <StatLabel>Achievements Unlocked</StatLabel>
          </StatCard>
        </StatsGrid>

        <LevelProgressSection>
          <SectionTitle>Level Progression</SectionTitle>
          {levels.map((level, index) => (
            <LevelItem key={index}>
              <LevelName>
                <LevelIcon>{level.icon}</LevelIcon>
                <LevelInfo>
                  <LevelTitle>{level.title}</LevelTitle>
                  <LevelReq>{level.minXP.toLocaleString()} - {level.maxXP.toLocaleString()} XP</LevelReq>
                </LevelInfo>
              </LevelName>
              <LevelStatus achieved={currentXP >= level.minXP}>
                {currentXP >= level.minXP ? '✓ Unlocked' : 'Locked'}
              </LevelStatus>
            </LevelItem>
          ))}
        </LevelProgressSection>

        <div style={{ marginBottom: '30px' }}>
          <SectionTitle>Achievements</SectionTitle>
          <AchievementGrid>
            {achievements.map((achievement, index) => (
              <AchievementBadge key={index} unlocked={unlockedAchievements.includes(achievement)}>
                <BadgeIcon>{achievement.icon}</BadgeIcon>
                <BadgeName unlocked={unlockedAchievements.includes(achievement)}>
                  {achievement.name}
                </BadgeName>
                <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', margin: '5px 0 0 0' }}>
                  {achievement.req}
                </p>
              </AchievementBadge>
            ))}
          </AchievementGrid>
        </div>
      </Content>
    </Container>
  );
};

export default LoyaltyScreen;
