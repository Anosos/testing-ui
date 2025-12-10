import React, { useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Dummy data - replace with actual API call
const dummyArtifact = {
  id: '12345',
  name: 'Golden Mask of Tutankhamun',
  imageUrl: 'https://i.imgur.com/6Zz2jJ5.jpeg', // Using a placeholder image
  description: 'The iconic death mask of the 18th-dynasty Ancient Egyptian Pharaoh Tutankhamun.',
  audioSrc: '/audio/tutankhamun.mp3'
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  overflow-y: auto;
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


const SearchByIDResultScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCollection } = useContext(AppContext);

  // In a real app, you would fetch data based on the id
  const artifact = dummyArtifact;

  const handleAudioGuide = () => {
    if (!user || user.role !== 'subscribed') {
      alert('Please subscribe to access the audio guide.');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
        <Title>Artifact Details</Title>
        <NavButton onClick={() => navigate('/home')}>Home</NavButton>
      </Header>
      <Content>
        <ArtifactImage src={artifact.imageUrl} alt={artifact.name} />
        <Info>
          <ArtifactName>{artifact.name}</ArtifactName>
          <ArtifactID>ID: {id}</ArtifactID>
          <ArtifactDescription>{artifact.description}</ArtifactDescription>
        </Info>
        <ButtonContainer>
          <ActionButton onClick={() => addToCollection(id, artifact)}>Add to Collection</ActionButton>
          <ActionButton onClick={handleAudioGuide} disabled={!user || user.role !== 'subscribed'}>
            {(!user || user.role !== 'subscribed') && '🔒'} Audio Guide
          </ActionButton>
        </ButtonContainer>
        {user && user.role === 'subscribed' && (
          <AudioPlayer controls src={artifact.audioSrc}>
            Your browser does not support the audio element.
          </AudioPlayer>
        )}
      </Content>
    </Container>
  );
};

export default SearchByIDResultScreen;
