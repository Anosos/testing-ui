import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext'; // Import AppContext

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

const Counter = styled.span`
  background: #C09943;
  color: #000;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #C09943;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(192, 153, 67, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #333 0%, #222 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: relative;
`;

const CardContent = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardID = styled.p`
  font-size: 12px;
  color: #C09943;
  margin: 0 0 8px 0;
  font-weight: bold;
  text-transform: uppercase;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #fff;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  flex: 1;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px;
  background: none;
  border: 1px solid #C09943;
  color: #C09943;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #C09943;
    color: #000;
  }
`;

const RemoveButton = styled(ActionButton)`
  border-color: #ff6b6b;
  color: #ff6b6b;

  &:hover {
    background: #ff6b6b;
    color: #fff;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.6);
`;

const EmptyIcon = styled.div`
  font-size: 100px;
  margin-bottom: 20px;
`;

const EmptyText = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(192, 153, 67, 0.1);
  border: 2px solid #C09943;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #C09943;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const GemWrapButton = styled.button`
  display: block;
  width: fit-content;
  margin: 30px auto;
  padding: 15px 30px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); /* Gold gradient */
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: gray;
    color: #eee;
    box-shadow: none;
  }
`;

const UserGalleryScreen = ({ onBack, user }) => { // Changed component name
  const { collection, xp, visitedPieces } = useContext(AppContext); // Get collection, xp, visitedPieces from context
  const [galleryItems, setGalleryItems] = useState(collection); // Initialize with collection from context

  const isSignedUp = !!user; // Check if user is signed up

  const handleRemove = (id) => {
    // In a real app, you would dispatch an action to update global collection
    setGalleryItems(galleryItems.filter(item => item.id !== id));
    alert('Item removed from your gallery (local state only for now).');
  };

  const handleGenerateWrap = () => {
    if (!isSignedUp) {
      alert('📝 Sign Up Required\n\nYou must sign up to generate your GEM Wrap journey summary.');
      return;
    }

    const wrapSummary = `
📋 GEM Wrap Summary!
----------------------
🌟 Total XP: ${xp}
🏛️ Pieces Collected: ${galleryItems.length}
🚶‍♂️ Pieces Visited: ${visitedPieces.length}

Your journey through the Grand Egyptian Museum has been unique!
Continue exploring to enrich your experience.
    `;
    alert(wrapSummary);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>My Gallery</Title>
        <Counter>{galleryItems.length}</Counter>
      </Header>

      <Content>
        <GemWrapButton onClick={handleGenerateWrap} disabled={!isSignedUp}>
          {isSignedUp ? '✨ Generate GEM Wrap' : '📝 Sign Up to Generate GEM Wrap'}
        </GemWrapButton>

        {galleryItems.length > 0 ? (
          <>
            <Stats>
              <StatCard>
                <StatNumber>{galleryItems.length}</StatNumber>
                <StatLabel>Items Collected</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{xp}</StatNumber> {/* Display actual XP */}
                <StatLabel>Total XP</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{visitedPieces.length}</StatNumber> {/* Display actual visited pieces count */}
                <StatLabel>Pieces Visited</StatLabel>
              </StatCard>
            </Stats>

            <Grid>
              {galleryItems.map((item) => (
                <Card key={item.id}>
                  <CardImage>{item.image || '🏺'}</CardImage>
                  <CardContent>
                    <CardID>{item.id}</CardID>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.info}</CardDescription> {/* Display item.info */}
                    <CardActions>
                      <ActionButton>📤 Share</ActionButton>
                      <RemoveButton onClick={() => handleRemove(item.id)}>
                        🗑️ Remove
                      </RemoveButton>
                    </CardActions>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>❤️</EmptyIcon>
            <EmptyText>Your Gallery is Empty</EmptyText>
            <p>Start exploring and add pieces to your collection!</p>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
};

export default UserGalleryScreen;
