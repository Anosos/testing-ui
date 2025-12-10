import React, { useState, useRef, useEffect } from 'react';
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
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const GuideSection = styled.div`
  margin-bottom: 30px;
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

const GuideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const GuideCard = styled.div`
  background: rgba(192, 153, 67, 0.1);
  border: 2px solid #C09943;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => (props.locked ? 0.6 : 1)};

  &:hover {
    background: rgba(192, 153, 67, 0.15);
    transform: translateY(-5px);
  }
`;

const GuideIcon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const GuideName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${props => (props.locked ? 'rgba(255, 255, 255, 0.5)' : '#C09943')};
  margin-bottom: 5px;
`;

const GuideDuration = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const LockBadge = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #ffc107;
  margin-top: 10px;
`;

const guides = [
  { name: 'Pharaohs of Egypt', icon: '👑', duration: '15 min', locked: false, audioSrc: '/audio/pharaohs.mp3' },
  { name: 'Ancient Hieroglyphics', icon: '📖', duration: '12 min', locked: false, audioSrc: '/audio/hieroglyphics.mp3' },
  { name: 'Mummification Process', icon: '🪦', duration: '18 min', locked: true, audioSrc: '/audio/mummification.mp3' },
  { name: 'Pyramids Architecture', icon: '🔺', duration: '20 min', locked: true, audioSrc: '/audio/pyramids.mp3' },
  { name: 'Daily Life in Ancient Egypt', icon: '🏠', duration: '25 min', locked: true, audioSrc: '/audio/daily-life.mp3' },
  { name: 'Religious Beliefs & Rituals', icon: '🏛️', duration: '22 min', locked: true, audioSrc: '/audio/rituals.mp3' },
];

const AudioGuideScreen = ({ onBack, user, onRequireLogin }) => {
  const [hasSubscription, setHasSubscription] = useState(() => {
    try {
      return localStorage.getItem('gem_hasSubscription') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, selectedGuide]);

  const handleSubscribe = (planType) => {
    if (!user) {
      if (onRequireLogin) onRequireLogin();
      else alert('Please log in to subscribe.');
      return;
    }

    if (planType === 'premium' || planType === 'family') {
      setHasSubscription(true);
      try {
        localStorage.setItem('gem_hasSubscription', 'true');
      } catch (e) {}
      alert('Subscription successful — enjoy premium audio guides!');
    }
  };

  const handlePlayGuide = (guide) => {
    if (guide.locked && !hasSubscription) {
      if (!user) {
        if (onRequireLogin) onRequireLogin();
        else alert('Please log in to subscribe and access this guide.');
        return;
      }

      alert('Please subscribe to access this audio guide');
      return;
    }

    if (selectedGuide?.name === guide.name) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedGuide(guide);
      setIsPlaying(true);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>Audio Guides 🎧</Title>
      </Header>

      <Content>
        {/* ... (subscription banner and plans are the same) */}

        <GuideSection>
          <SectionTitle>Available Audio Guides</SectionTitle>
          <GuideGrid>
            {guides.map((guide, index) => (
              <GuideCard
                key={index}
                locked={guide.locked && !hasSubscription}
                onClick={() => handlePlayGuide(guide)}
              >
                <GuideIcon>{guide.icon}</GuideIcon>
                <GuideName locked={guide.locked && !hasSubscription}>
                  {guide.name}
                </GuideName>
                <GuideDuration>{guide.duration}</GuideDuration>
                {guide.locked && !hasSubscription && (
                  <LockBadge>🔒 Premium Only</LockBadge>
                )}
                {selectedGuide?.name === guide.name && (
                  <LockBadge style={{ color: '#4CAF50', marginTop: '10px' }}>
                    {isPlaying ? '▶️ Playing' : '⏸️ Paused'}
                  </LockBadge>
                )}
              </GuideCard>
            ))}
          </GuideGrid>
        </GuideSection>

        {selectedGuide && (
          <audio
            ref={audioRef}
            src={selectedGuide.audioSrc}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </Content>
    </Container>
  );
};

export default AudioGuideScreen;