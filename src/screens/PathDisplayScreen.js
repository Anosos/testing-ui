import React, { useState, useEffect } from 'react';
import { generatePath, searchPieceInGallery, generateAIRecommendedPath } from '../api';
import styled from 'styled-components';
import PieceCardModal from '../components/PieceCard';

// --- OFF-WHITE THEME PALETTE ---
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F9F7F2;
  margin-left: 0;
  transition: margin-left 0.3s ease;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 15px 20px;
  background-color: #F0EAD6;
  border-bottom: 2px solid #D4C5A5;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #C09943;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #8B6B23;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const HeaderTitle = styled.h2`
  color: #8B6B23;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  flex: 1;
  font-family: 'Cinzel', serif;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const UserBadge = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #D4C5A5;
  color: #555555;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #F9F7F2;
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.2);
  }
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
`;

const GalleryRow = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E6DCC3;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #C09943;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  transition: all 0.3s ease;

  &:hover {
    background-color: #FFFCF5;
    transform: translateX(3px);
    box-shadow: 0 4px 12px rgba(192, 153, 67, 0.15);
  }
`;

const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const GalleryName = styled.p`
  color: #8B6B23;
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

const CrowdBadge = styled.span`
  background-color: ${props => {
    if (props.crowd < 20) return '#6CAE75';
    if (props.crowd < 40) return '#E2B04A';
    return '#D65A5A';
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
`;

const GalleryDesc = styled.p`
  color: #666666;
  font-size: 13px;
  margin: 0 0 10px 0;
  line-height: 1.5;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  background-color: #FAFAFA;
  color: #333333;
  padding: 8px 10px;
  border: 1px solid #D4C5A5;
  border-radius: 6px;
  font-size: 12px;

  &::placeholder {
    color: #AAAAAA;
  }

  &:focus {
    outline: none;
    border-color: #C09943;
    background-color: #FFFFFF;
  }
`;

const SearchButton = styled.button`
  background-color: #C09943;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #A67C2E;
  }
`;

const TakeMeButton = styled.button`
  background-color: #5D8AA8;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4A6E86;
    box-shadow: 0 2px 6px rgba(93, 138, 168, 0.3);
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #C09943;
  border: 1px solid #C09943;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(192, 153, 67, 0.1);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F9F7F2;
  color: #C09943;
  font-size: 18px;
`;

const Spinner = styled.div`
  border: 4px solid #E6DCC3;
  border-top: 4px solid #C09943;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const PeriodTag = styled.span`
  background-color: #EBE6D8;
  color: #555;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-right: 5px;
  border: 1px solid #D4C5A5;
`;

// --- NEW STYLES FOR VIDEO SCREEN ---
const VideoScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VideoPlayer = styled.video`
  width: 90%;
  max-width: 1000px;
  border: 2px solid #C09943;
  border-radius: 8px;
  box-shadow: 0 0 50px rgba(192, 153, 67, 0.3);
`;

const CloseVideoButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid #C09943;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #C09943;
    color: black;
    transform: rotate(90deg);
  }
`;

// --- Main Component ---

export default function PathDisplayScreen({ onBack, selectedInterests, selectedTimePeriods, language, user, onProfileClick, onAuthClick, onAddToCollection }) {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [showPieceModal, setShowPieceModal] = useState(false);
  const [gallerySearches, setGallerySearches] = useState({});
  
  // New State for Video
  // const [showVideo, setShowVideo] = useState(false); // Removed

  const isSignedUp = !!user;
  const isSubscribed = user?.isSubscribed || false;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Array.isArray(selectedTimePeriods) && selectedTimePeriods.length > 0) {
        const recommendedPath = generateAIRecommendedPath(selectedInterests, selectedTimePeriods);
        setPath(recommendedPath);
      } else {
        setPath([]); // Clear path if no time periods selected
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedInterests, selectedTimePeriods]); // Depend on both interests and time periods

  const handleSearchInGallery = (galleryId, pieceId) => {
    if (!pieceId.trim()) return;
    const piece = searchPieceInGallery(galleryId, pieceId);
    if (piece) {
      setSelectedPiece({ ...piece, gallery: galleryId });
      setShowPieceModal(true);
    } else {
      alert(`❌ Piece ID "${pieceId}" not found in ${galleryId}`);
    }
    setGallerySearches(prev => ({ ...prev, [galleryId]: '' }));
  };

  // --- UPDATED: Open Video Screen ---
  const handleTakeMeThere = (gallery) => {
    alert(`🗺️ Navigating to ${gallery.name} on the museum map...`);
  };

  const handleAddToGallery = (piece) => {
    onAddToCollection(piece.id, piece);
    alert(`✨ Piece Collected!\n\n"${piece.name}" has been added to your gallery.`);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center' }}>
          <Spinner />
          <p style={{ marginTop: '20px', color: '#8B6B23' }}>Generating your journey...</p>
        </div>
      </LoadingContainer>
    );
  }



  return (
    <Container>
      <MainContent>
        <Header>
          <MenuButton onClick={onProfileClick}>☰</MenuButton>
          <HeaderTitle>🎯 Your Journey</HeaderTitle>
          {user ? (
            <UserBadge onClick={onProfileClick} title={`Click to view ${user.fullName}'s profile`}>
              👤 {user.fullName.split(' ')[0]}
            </UserBadge>
          ) : (
            <UserBadge onClick={onAuthClick} title="Login to save your preferences">
              🔐 Login
            </UserBadge>
          )}
        </Header>

        <ScrollContainer>
          {Array.isArray(selectedTimePeriods) && selectedTimePeriods.length > 0 && (
            <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #D4C5A5' }}>
              <p style={{ color: '#8B6B23', fontSize: '12px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                Selected Periods:
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedTimePeriods.map(period => (
                  <PeriodTag key={period}>{period}</PeriodTag>
                ))}
              </div>
            </div>
          )}

          {path.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666666', paddingTop: '40px' }}>
              <p>No galleries found for your selection. Please go back and try different options.</p>
              <ButtonRow style={{justifyContent: 'center'}}>
                <BackButton onClick={onBack}>← Back to Time Periods</BackButton>
              </ButtonRow>
            </div>
          ) : (
            path.map((gallery, index) => (
              <GalleryRow key={gallery.id}>
                <GalleryHeader>
                  <div>
                    <GalleryName>{`${index + 1}. ${gallery.name}`}</GalleryName>
                  </div>
                  <CrowdBadge crowd={gallery.crowd}>
                    {gallery.crowd < 20 ? '✅ Low' : gallery.crowd < 40 ? '⚠️ Medium' : '🔴 Busy'}
                  </CrowdBadge>
                </GalleryHeader>

                <GalleryDesc>{gallery.description}</GalleryDesc>

                <SearchRow>
                  <SearchInput
                    type="text"
                    placeholder={`Search ${gallery.id} by Piece ID...`}
                    value={gallerySearches[gallery.id] || ''}
                    onChange={(e) => setGallerySearches(prev => ({ ...prev, [gallery.id]: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchInGallery(gallery.id, gallerySearches[gallery.id]);
                      }
                    }}
                  />
                  <SearchButton onClick={() => handleSearchInGallery(gallery.id, gallerySearches[gallery.id])}>
                    🔍 Search
                  </SearchButton>
                </SearchRow>

                <ButtonRow>
                  <TakeMeButton onClick={() => handleTakeMeThere(gallery)}>
                    📍 Take Me There
                  </TakeMeButton>
                </ButtonRow>
              </GalleryRow>
            ))
          )}
        </ScrollContainer>

        {showPieceModal && (
          <PieceCardModal
            piece={selectedPiece}
            onClose={() => setShowPieceModal(false)}
            onAdd={handleAddToGallery}
            isSignedUp={isSignedUp}
            isSubscribed={isSubscribed}
          />
        )}
      </MainContent>
    </Container>
  );
}