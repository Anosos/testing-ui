import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Slightly lighter overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #FFFFFF; /* Off-white background */
  border: 2px solid #C09943;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(192, 153, 67, 0.3);
`;

const PieceName = styled.h2`
  color: darkgoldenrod; /* Adjusted for off-white theme */
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const PieceImage = styled.div`
  font-size: 80px;
  text-align: center;
  margin: 20px 0;
`;

const PieceInfo = styled.p`
  color: #333333; /* Adjusted for off-white theme */
  font-size: 14px;
  line-height: 1.6;
  margin: 15px 0;
  text-align: justify;
`;

const PieceGallery = styled.p`
  color: #666666; /* Adjusted for off-white theme */
  font-size: 12px;
  margin: 10px 0;
  padding: 10px;
  background-color: #EFEFEF; /* Lighter background for the tag */
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 25px;
`;

const StyledButton = styled.button`
  background-color: ${props => {
    if (props.disabled) return '#CCCCCC'; // Lighter disabled background
    if (props.color === 'secondary') return '#E0E0E0'; // Lighter secondary button
    return '#C09943';
  }};
  color: ${props => props.disabled ? '#999999' : props.color === 'secondary' ? '#333333' : '#333333'}; // Adjusted text colors
  border: 2px solid ${props => props.disabled ? '#999999' : props.color === 'secondary' ? '#999999' : '#C09943'}; // Adjusted border colors
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 0 15px rgba(192, 153, 67, 0.4);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const WarningMessage = styled.p`
  color: #D32F2F; /* More prominent warning color */
  font-size: 12px;
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(211, 47, 47, 0.1); /* Lighter background for warning */
  border-radius: 5px;
  border-left: 3px solid #D32F2F;
`;

export default function PieceCardModal({ piece, onClose, onAdd, isSignedUp, isSubscribed }) {
  const { xp, collection, visitedPieces } = useContext(AppContext); // Use AppContext

  if (!piece) return null;

  const handleAudioGuide = () => {
    if (!isSubscribed) {
      alert('🔒 Audio Guide Locked\n\nAudio guides require an active subscription.\nPlease sign up and subscribe to unlock this feature.');
      return;
    }
    alert(`🎧 Playing Audio Guide\n\n"${piece.name}"\n\nEnjoy learning about this magnificent artifact!`);
  };

  const handleGemWrap = () => {
    if (!isSignedUp) {
      alert('📝 Sign Up Required\n\nYou must sign up to save your collected pieces and generate the GEM Wrap summary.');
      return;
    }
    alert('✨ Generating your GEM Wrap...\n\nYour personalized museum experience summary is being created.');
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
🏛️ Pieces Collected: ${collection.length}
🚶‍♂️ Pieces Visited: ${visitedPieces.length}

Your journey through the Grand Egyptian Museum has been unique!
Continue exploring to enrich your experience.
    `;
    alert(wrapSummary);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <PieceName>{piece.name}</PieceName>
        <PieceImage>{piece.image}</PieceImage>
        <PieceInfo>{piece.info}</PieceInfo>
        <PieceGallery>📍 Located in: {piece.gallery}</PieceGallery>

        <ButtonGroup>
          {/* Audio Guide Button */}
          <StyledButton
            onClick={handleAudioGuide}
            disabled={!isSubscribed}
            color={isSubscribed ? 'primary' : 'disabled'}
          >
            {isSubscribed ? '🎧 Play Audio Guide' : '🔒 Audio Guide (Subscribe Required)'}
          </StyledButton>
          {!isSubscribed && (
            <WarningMessage>
              💡 Subscribe to unlock audio guides and expert commentary
            </WarningMessage>
          )}

          {/* Add to Gallery Button */}
          <StyledButton onClick={() => onAdd(piece)} color="primary">
            ➕ Add to My Gallery
          </StyledButton>

          {/* Generate GEM Wrap Button */}
          <StyledButton
            onClick={handleGenerateWrap}
            disabled={!isSignedUp}
            color={isSignedUp ? 'secondary' : 'disabled'}
          >
            {isSignedUp ? '📋 Generate GEM Wrap' : '📝 Sign Up to Generate GEM Wrap'}
          </StyledButton>
          {!isSignedUp && (
            <WarningMessage>
              ✨ Sign up to create a personalized summary of your museum journey
            </WarningMessage>
          )}

          {/* Close Button */}
          <StyledButton onClick={onClose} color="secondary">
            Close
          </StyledButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}
