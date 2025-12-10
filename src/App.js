import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Import Screens
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import InterestScreen from './screens/InterestScreen';
import PathDisplayScreen from './screens/PathDisplayScreen';
import SearchByIDScreen from './screens/SearchByIDScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import LoyaltyScreen from './screens/LoyaltyScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import AudioGuideScreen from './screens/AudioGuideScreen';
import TicketingScreen from './screens/TicketingScreen';
import { SettingsScreen, HelpScreen, AboutScreen } from './screens/SettingsScreen';
import OnboardingWizard from './screens/OnboardingWizard';
import SearchByIDResultScreen from './screens/SearchByIDResultScreen';


// Import Components
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AppContext } from './context/AppContext';

// --- Styled Components ---
const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  overflow: hidden;
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  overflow-y: auto; /* Allows scrolling within main content */
`;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, setUser, addXp, addToCollection, collection } = useContext(AppContext);

  const [language, setLanguage] = useState(null);
  const [timePeriods, setTimePeriods] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleNavigate = (newScreen) => {
    const map = {
      home: '/home',
      welcome: '/login', 
      interest: '/interest',
      pathDisplay: '/path',
      searchByID: '/search',
      favorites: '/favorites',
      loyalty: '/loyalty',
      audioGuide: '/audio',
      tickets: '/tickets',
      chatbot: '/chatbot',
      settings: '/settings',
      help: '/help',
      about: '/about',
    };
    const route = map[newScreen] || '/home';
    navigate(route);
    setSidebarOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfileModal(false);
  };

  const handleAddToCollection = (id, artifact) => {
    addToCollection(id, artifact);
    addXp(150);
  };

  const hideGlobalNav = location.pathname === '/login' || location.pathname === '/onboarding';

  return (
    <AppContainer>
      {!hideGlobalNav && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={handleNavigate}
        />
      )}

      <MainContent>
        {!hideGlobalNav && (
          <Header
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            user={user}
            onProfileClick={() => setShowProfileModal(true)}
            onAuthClick={() => setShowAuthModal(true)}
          />
        )}

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />

        <UserProfile
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={user}
          onLogout={handleLogout}
          onLoginClick={() => {
            setShowProfileModal(false);
            setShowAuthModal(true);
          }}
        />

        <Routes>
          <Route 
            path="/login" 
            element={
              <WelcomeScreen 
                onContinue={(lang) => { 
                  setLanguage(lang); 
                  navigate('/interest'); 
                }} 
              />
            } 
          />
          
          <Route 
            path="/home" 
            element={<HomeScreen user={user} collection={collection} />} 
          />
          
          <Route 
            path="/" 
            element={
              <OnboardingWizard />
            } 
          />

          <Route 
            path="/onboarding"
            element={<OnboardingWizard />}
          />
          
          <Route 
            path="/interest" 
            element={
              <InterestScreen 
                onContinue={(periods) => { 
                  setTimePeriods(periods); 
                  navigate('/path'); 
                }} 
                onBack={() => navigate('/home')} 
              />
            } 
          />
          
          <Route 
            path="/path" 
            element={
              <PathDisplayScreen 
                timePeriods={timePeriods} 
                language={language} 
                user={user} 
                onBack={() => navigate('/interest')}
              />
            } 
          />
          
          <Route 
            path="/search" 
            element={
              <SearchByIDScreen 
                onBack={() => navigate('/home')} 
              />
            } 
          />

          <Route 
            path="/search/:id" 
            element={
              <SearchByIDResultScreen
                onAddToCollection={handleAddToCollection}
              />
            } 
          />
          
          <Route 
            path="/details/:id" 
            element={
              <SearchByIDScreen 
                onBack={() => navigate('/home')} 
                onAddToCollection={handleAddToCollection} 
                user={user} 
              />
            } 
          />
          
          <Route 
            path="/favorites" 
            element={
              <FavoritesScreen 
                onBack={() => navigate('/home')} 
                user={user} 
                collection={collection} 
              />
            } 
          />
          
          <Route 
            path="/loyalty" 
            element={
              <LoyaltyScreen 
                onBack={() => navigate('/home')} 
                user={user} 
              />
            } 
          />
          
          <Route 
            path="/audio" 
            element={
              <AudioGuideScreen 
                onBack={() => navigate('/home')} 
                user={user} 
                onRequireLogin={() => setShowAuthModal(true)} 
              />
            } 
          />
          
          <Route 
            path="/tickets" 
            element={
              <TicketingScreen 
                onBack={() => navigate('/home')} 
                user={user} 
              />
            } 
          />
          
          <Route 
            path="/chatbot" 
            element={
              <ChatbotScreen 
                onBack={() => navigate('/home')} 
              />
            } 
          />
          
          <Route 
            path="/settings" 
            element={<SettingsScreen onBack={() => navigate('/home')} />} 
          />
          
          <Route 
            path="/help" 
            element={<HelpScreen onBack={() => navigate('/home')} />} 
          />
          
          <Route 
            path="/about" 
            element={<AboutScreen onBack={() => navigate('/home')} />} 
          />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}