import React, { useState, useEffect } from 'react';
import { generatePath, searchPieceInGallery } from '../api';
import styled from 'styled-components';
import PieceCardModal from '../components/PieceCard';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
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
  background-color: #111;
  border-bottom: 2px solid #333;
  display: flex;
  align-items: center;
  gap: 15px;
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
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const HeaderTitle = styled.h2`
  color: #C09943;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const UserBadge = styled.div`
  background-color: #333333;
  border: 1px solid #C09943;
  color: #C09943;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.3);
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 10px;
  }
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
`;

const GalleryRow = styled.div`
  background-color: #1E1E1E;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #C09943;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2d2d2d;
    transform: translateX(3px);
  }
`;

const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const GalleryName = styled.p`
  color: #C09943;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const CrowdBadge = styled.span`
  background-color: ${props => {
    if (props.crowd < 20) return '#4CAF50';
    if (props.crowd < 40) return '#FFC107';
    return '#F44336';
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
`;

const GalleryDesc = styled.p`
  color: #aaa;
  font-size: 12px;
  margin: 0 0 10px 0;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  background-color: #2E2E2E;
  color: white;
  padding: 8px 10px;
  border: 1px solid #444;
  border-radius: 6px;
  font-size: 12px;

  &::placeholder {
    color: #777;
  }

  &:focus {
    outline: none;
    border-color: #C09943;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    font-size: 11px;
  }
`;

const SearchButton = styled.button`
  background-color: #C09943;
  color: #000;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 0 8px rgba(192, 153, 67, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 11px;
  }
`;

const TakeMeButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 11px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  border-top: 1px solid #333;
  background-color: #111;
  gap: 10px;
  padding: 0 10px;
`;

const FooterButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: rgba(192, 153, 67, 0.1);
    color: #C09943;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 8px;

    span {
      font-size: 16px;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #C09943;
  font-size: 18px;
`;

const Spinner = styled.div`
  border: 4px solid #2E2E2E;
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
  background-color: rgba(192, 153, 67, 0.2);
  color: #C09943;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-right: 5px;
`;

export default function PathDisplayScreen({ onBack, timePeriods, language, user, onProfileClick, onAuthClick }) {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [showPieceModal, setShowPieceModal] = useState(false);
  const [gallerySearches, setGallerySearches] = useState({});

  const isSignedUp = !!user;
  const isSubscribed = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate path from all selected periods
      const allGalleries = [];
      if (Array.isArray(timePeriods) && timePeriods.length > 0) {
        timePeriods.forEach(period => {
          const periodPath = generatePath(period);
          allGalleries.push(...periodPath);
        });
        // Remove duplicates
        const uniqueGalleries = Array.from(new Map(allGalleries.map(g => [g.id, g])).values());
        setPath(uniqueGalleries);
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timePeriods]);

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

  const handleTakeMeThere = (gallery) => {
    alert(`🗺️ Navigation Activated!\n\nStarting indoor map guidance to: ${gallery.name}\n\n(BLE Beacon System would activate here)`);
  };

  const handleAddToGallery = (piece) => {
    alert(`✨ Piece Collected!\n\n"${piece.name}" has been added to your gallery.`);
  };

  const handleNavigateSidebar = (page) => {
    if (page === 'home') {
      onBack();
    } else {
      alert(`${page.toUpperCase()} feature coming soon!`);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center' }}>
          <Spinner />
          <p style={{ marginTop: '20px' }}>Generating your journey...</p>
        </div>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage="galleries"
        onNavigate={handleNavigateSidebar}
      />

      <MainContent>
        <Header>
          <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>☰</MenuButton>
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
          {Array.isArray(timePeriods) && timePeriods.length > 0 && (
            <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #333' }}>
              <p style={{ color: '#C09943', fontSize: '12px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                Selected Periods:
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {timePeriods.map(period => (
                  <PeriodTag key={period}>{period}</PeriodTag>
                ))}
              </div>
            </div>
          )}

          {path.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#aaa', paddingTop: '40px' }}>
              <p>No galleries found</p>
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
                    placeholder={`Search ${gallery.id}...`}
                    value={gallerySearches[gallery.id] || ''}
                    onChange={(e) => setGallerySearches(prev => ({ ...prev, [gallery.id]: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchInGallery(gallery.id, gallerySearches[gallery.id]);
                      }
                    }}
                  />
                  <SearchButton onClick={() => handleSearchInGallery(gallery.id, gallerySearches[gallery.id])}>
                    🔍
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

        <Footer>
          <FooterButton onClick={onBack} title="Go back to time period selection">
            <span>⬅️</span>
            <span>Back</span>
          </FooterButton>
          <FooterButton onClick={() => window.location.reload()} title="Return to home screen">
            <span>🏠</span>
            <span>Home</span>
          </FooterButton>
          <FooterButton onClick={user ? onProfileClick : onAuthClick} title={user ? `View ${user.fullName}'s profile` : 'Login or create account'}>
            <span>👤</span>
            <span>{user ? 'Profile' : 'Login'}</span>
          </FooterButton>
        </Footer>
      </MainContent>
    </Container>
  );
}
