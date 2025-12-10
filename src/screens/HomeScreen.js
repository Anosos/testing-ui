import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 80px;
  background: linear-gradient(135deg, #141417 0%, #24242a 100%);
  color: #fff;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 980px;
  padding: 28px;
`;

const Card = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 18px;
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  color: #C09943;
`;

const PathList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const GalleryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GalleryInfo = styled.div`
  h3 {
    margin: 0 0 5px 0;
    color: #C09943;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const CrowdStatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: ${({ status }) => {
    if (status === 'Low') return 'green';
    if (status === 'Medium') return 'orange';
    return 'red';
  }};
`;

const TakeMeThereButton = styled.button`
  padding: 10px 15px;
  background: linear-gradient(135deg, #C09943, #a8773f);
  border: none;
  color: #0b0b0b;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #C09943;
  color: #fff;
  border-radius: 6px;
`;

export default function HomeScreen() {
  const { user, path } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchId) {
      navigate(`/search/${searchId}`);
    }
  };

  return (
    <Container>
      <Content>
        <Card>
        <Title>Search for an Artifact</Title>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Enter Piece ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={handleSearch}
            />
          </SearchContainer>
        </Card>
        <Card>
          <Title>Your Dynamic Path</Title>
          {path.length > 0 ? (
            <PathList>
              {path.map(gallery => (
                <GalleryCard key={gallery.id}>
                  <GalleryInfo>
                    <h3>{gallery.name}</h3>
                    <p>Crowd Density: <CrowdStatusBadge status={gallery.crowdStatus}>{gallery.crowdStatus}</CrowdStatusBadge></p>
                  </GalleryInfo>
                  <TakeMeThereButton>Take Me There</TakeMeThereButton>
                </GalleryCard>
              ))}
            </PathList>
          ) : (
            <p>Please complete the onboarding to generate your path.</p>
          )}
        </Card>
      </Content>
    </Container>
  );
}
