import React, { useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getPieceInfo } from '../api'; // Import getPieceInfo

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtifactImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  border: 4px solid #C09943;
  margin-bottom: 20px;
`;

const Info = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ArtifactName = styled.h2`
  color: #C09943;
  font-size: 28px;
  margin: 0 0 10px 0;
`;

const ArtifactID = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px 0;
`;

const ArtifactDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #C09943 0%, #a8773f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(192, 153, 67, 0.4);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid #C09943;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: rgba(192, 153, 67, 0.2);
  }
`;

const AudioPlayer = styled.audio`
  margin-top: 20px;
  width: 100%;
`;


const SearchByIDResultScreen = ({ isSignedUp, isSubscribed }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCollection } = useContext(AppContext);

  const artifact = getPieceInfo(id);

  const handleAudioGuide = () => {
    if (!isSubscribed) {
      alert('🔒 Audio Guide Locked\n\nAudio guides require an active subscription.\nPlease sign up and subscribe to unlock this feature.');
      return;
    }
    alert(`🎧 Playing Audio Guide\n\n"${artifact.name}"\n\nEnjoy learning about this magnificent artifact!`);
  };

  if (!artifact || !artifact.id || artifact.name === 'Unknown Artifact') { // Handle case where artifact is not found
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
          <Title>Artifact Not Found</Title>
          <NavButton onClick={() => navigate('/home')}>Home</NavButton>
        </Header>
        <Content>
          <Info>
            <ArtifactName>Artifact with ID "{id}" not found.</ArtifactName>
            <ArtifactDescription>Please check the ID and try again.</ArtifactDescription>
          </Info>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
        <Title>Artifact Details</Title>
        <NavButton onClick={() => navigate('/home')}>Home</NavButton>
      </Header>
      <Content>
        <ArtifactImage src={artifact.image} alt={artifact.name} />
        <Info>
          <ArtifactName>{artifact.name}</ArtifactName>
          <ArtifactID>ID: {id}</ArtifactID>
          <ArtifactDescription>{artifact.info}</ArtifactDescription>
        </Info>
        <ButtonContainer>
          <ActionButton onClick={() => addToCollection(id, artifact)}>➕ Add to Collection</ActionButton>
          <ActionButton onClick={handleAudioGuide} disabled={!isSubscribed}>
            {!isSubscribed && '🔒'} Audio Guide
          </ActionButton>
        </ButtonContainer>
        {isSubscribed && (
          <AudioPlayer controls src={artifact.audioSrc}>
            Your browser does not support the audio element.
          </AudioPlayer>
        )}
      </Content>
    </Container>
  );
};

export default SearchByIDResultScreen;
