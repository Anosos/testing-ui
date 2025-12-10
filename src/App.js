import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// Import Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginPage from './screens/LoginPage'; // Import LoginPage
import HomeScreen from './screens/HomeScreen';
import InterestScreen from './screens/InterestScreen'; // This is the new InterestScreen
import TimePeriodScreen from './screens/TimePeriodScreen'; // Corrected import for TimePeriodScreen
import PathDisplayScreen from './screens/PathDisplayScreen';
import SearchByIDScreen from './screens/SearchByIDScreen';
import UserGalleryScreen from './screens/UserGalleryScreen';
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
import Footer from './components/Footer'; // Import Footer
import { AppContext } from './context/AppContext';
import { GamificationProvider } from './context/GamificationContext'; // Import GamificationProvider

// --- Styled Components ---
const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  /* background removed to use global off-white background */
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
  const [selectedInterests, setSelectedInterests] = useState([]); // State for interests
  const [selectedTimePeriods, setSelectedTimePeriods] = useState([]); // State for time periods
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status


  const handleNavigate = (newScreen) => {
    const map = {
      home: '/home',
      welcome: '/', // Welcome is now the root
      interest: '/interest',
      timePeriod: '/time-period', // New path for time periods
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
    const route = map[newScreen] || '/'; // Default to welcome screen
    navigate(route);
    setSidebarOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    setIsLoggedIn(true); // Set loggedIn to true
    navigate('/home'); // Navigate to home after successful login
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

  const hideGlobalNav = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/interest' || location.pathname === '/time-period' || location.pathname === '/onboarding'; // Updated hideGlobalNav

  const isSignedUp = !!user; // Define isSignedUp
  const isSubscribed = user?.isSubscribed || false; // Define isSubscribed

  return (
    <GamificationProvider>
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
              path="/"
              element={isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <WelcomeScreen
                  onContinue={(lang) => {
                    setLanguage(lang);
                    navigate('/login'); // After language selection, go to login
                  }}
                />
              )}
            />
            
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLogin} />}
            />
            <Route 
              path="/home" 
              element={isLoggedIn ? <HomeScreen user={user} collection={collection} /> : <LoginPage onLoginSuccess={handleLogin} />} 
            />
            
            <Route 
              path="/onboarding" 
              element={isLoggedIn ? <OnboardingWizard /> : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/interest" 
              element={isLoggedIn ? (
                <InterestScreen 
                  onContinue={(interests) => { 
                    setSelectedInterests(interests); 
                    navigate('/time-period'); 
                  }} 
                  onBack={() => navigate('/home')} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />

            <Route
              path="/time-period"
              element={isLoggedIn ? (
                <TimePeriodScreen 
                  onContinue={(periods) => {
                    setSelectedTimePeriods(periods);
                    navigate('/path');
                  }}
                  onBack={() => navigate('/interest')} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/path" 
              element={isLoggedIn ? (
                <PathDisplayScreen
                  selectedInterests={selectedInterests}
                  selectedTimePeriods={selectedTimePeriods}
                  language={language}
                  user={user}
                  onBack={() => navigate('/time-period')}
                  onAddToCollection={addToCollection} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/search" 
              element={isLoggedIn ? (
                <SearchByIDScreen 
                  onBack={() => navigate('/home')} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />

            <Route 
              path="/search/:id" 
              element={isLoggedIn ? (
                <SearchByIDResultScreen
                  onAddToCollection={handleAddToCollection}
                  isSignedUp={isSignedUp}
                  isSubscribed={isSubscribed}
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/details/:id" 
              element={isLoggedIn ? (
                <SearchByIDScreen 
                  onBack={() => navigate('/home')} 
                  onAddToCollection={handleAddToCollection} 
                  user={user} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/favorites" 
              element={isLoggedIn ? (
                <UserGalleryScreen 
                  onBack={() => navigate('/home')} 
                  user={user} 
                  collection={collection} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/loyalty" 
              element={isLoggedIn ? (
                <LoyaltyScreen 
                  onBack={() => navigate('/home')} 
                  user={user} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/audio" 
              element={isLoggedIn ? (
                <AudioGuideScreen 
                  onBack={() => navigate('/home')} 
                  user={user} 
                  onRequireLogin={() => setShowAuthModal(true)} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/tickets" 
              element={isLoggedIn ? (
                <TicketingScreen 
                  onBack={() => navigate('/home')} 
                  user={user} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/chatbot" 
              element={isLoggedIn ? (
                <ChatbotScreen 
                  onBack={() => navigate('/home')} 
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />
            
            <Route 
              path="/settings" 
              element={isLoggedIn ? <SettingsScreen onBack={() => navigate('/home')} /> : <LoginPage onLoginSuccess={handleLogin} />} 
            />
            
            <Route 
              path="/help" 
              element={isLoggedIn ? <HelpScreen onBack={() => navigate('/home')} /> : <LoginPage onLoginSuccess={handleLogin} />} 
            />
            
            <Route 
              path="/about" 
              element={isLoggedIn ? <AboutScreen onBack={() => navigate('/home')} /> : <LoginPage onLoginSuccess={handleLogin} />} 
            />

            <Route 
              path="/profile"
              element={isLoggedIn ? (
                <UserProfile
                  isOpen={true} 
                  onClose={() => navigate('/home')} 
                  user={user}
                  onLogout={handleLogout}
                  onLoginClick={() => {
                    navigate('/'); 
                    setShowAuthModal(true);
                  }}
                />
              ) : <LoginPage onLoginSuccess={handleLogin} />}
            />

          </Routes>
        </MainContent>

        {!hideGlobalNav && ( // Conditionally render Footer
          <Footer />
        )}
      </AppContainer>
    </GamificationProvider>
  );
}