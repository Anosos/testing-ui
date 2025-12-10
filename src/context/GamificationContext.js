import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext'; // Assuming AppContext holds the main user object

// Gamification Hierarchy (as provided by the user)
const gamificationLevels = {
  1: {
    name: 'Sobek (سوبيك)',
    theme: 'The Warrior / Raw Power.',
    symbol: '🐊',
    description: 'The stage of proving existence and strength. The beginning of the journey.',
    perks: [
      '"Nile Shield" Badge on profile.',
      'Access to commenting and community participation.',
      '5% Discount on tickets/store.',
      'Access to general content.',
    ],
    xpThreshold: 0,
  },
  2: {
    name: 'Anubis (أنوبيس)',
    theme: 'The Guardian / Responsibility.',
    symbol: '🐺',
    description: 'The user has proven loyalty. They are now a trusted guardian of the community.',
    perks: [
      'Fast Track (Priority entry/registration).',
      'Profile Customization (Themes/Dark Mode).',
      'Access to "Behind the Scenes" exclusive content.',
      'Priority Technical Support.',
    ],
    xpThreshold: 1000, // Example XP threshold
  },
  3: {
    name: 'Thoth (تحوت)',
    theme: 'The Sage / Wisdom.',
    symbol: '🪶',
    description: 'The stage of knowledge maturity. The user is an expert and a scholar.',
    perks: [
      'Access to the "Knowledge Library" (Free courses/books).',
      '"Grand Scribe" Badge.',
      'Publishing Rights (Can write articles/proposals).',
      'Certified Attendance Certificates.',
    ],
    xpThreshold: 3000, // Example XP threshold
  },
  4: {
    name: 'Osiris (أوزيريس)',
    theme: 'The Ruler / Authority.',
    symbol: '👑',
    description: 'The VIP Elite. A ruler who commands respect and has high status.',
    perks: [
      'VIP Lounge Access (Physical or Digital).',
      'High Discount (25-50%).',
      'Voting Rights on community decisions.',
      '"+1" Free Invitation for a friend.',
    ],
    xpThreshold: 6000, // Example XP threshold
  },
  5: {
    name: 'Amun (آمون)',
    theme: 'The Legend / Supreme Power.',
    symbol: '☀',
    description: 'The absolute peak. Founders, partners of success, and living legends.',
    perks: [
      'Lifetime Free Access to all events.',
      'Private meetings/dinner with Founders.',
      'Exclusive luxury Merch Box.',
      'Permanent name on the "Hall of Fame".',
    ],
    xpThreshold: 10000, // Example XP threshold
  },
};

export const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const { user, setUser } = useContext(AppContext);
  const [userLevel, setUserLevel] = useState(gamificationLevels[1]); // Default to Sobek
  const [userXp, setUserXp] = useState(0);

  // Function to calculate level based on XP
  const calculateLevel = (xp) => {
    let level = 1;
    for (const lvl in gamificationLevels) {
      if (xp >= gamificationLevels[lvl].xpThreshold) {
        level = parseInt(lvl);
      } else {
        break;
      }
    }
    return gamificationLevels[level];
  };

  // Effect to update level when userXp changes
  useEffect(() => {
    if (user) {
      // In a real app, user XP would come from the user object or a backend call
      // For now, let's assume user.xp exists or default to 0
      const currentXp = user.xp || 0;
      setUserXp(currentXp);
      setUserLevel(calculateLevel(currentXp));
    } else {
      // If no user, reset to default Sobek level
      setUserLevel(gamificationLevels[1]);
      setUserXp(0);
    }
  }, [user]);

  const addXp = (amount) => {
    if (user) {
      const newXp = userXp + amount;
      setUserXp(newXp);
      setUserLevel(calculateLevel(newXp));
      // In a real app, you'd update the user object in AppContext and persist to backend
      setUser(prevUser => ({ ...prevUser, xp: newXp }));
      alert(`🎉 Gained ${amount} XP! Your new XP: ${newXp}. You are now a ${calculateLevel(newXp).name}!`);
    } else {
      alert("Please log in to gain XP!");
    }
  };

  const getNextLevelInfo = () => {
    const currentLevelNum = Object.keys(gamificationLevels).find(key => gamificationLevels[key].name === userLevel.name);
    const nextLevelNum = parseInt(currentLevelNum) + 1;
    if (gamificationLevels[nextLevelNum]) {
      const nextLevel = gamificationLevels[nextLevelNum];
      const xpNeeded = nextLevel.xpThreshold - userXp;
      return { nextLevel, xpNeeded };
    }
    return null; // Max level reached
  };

  return (
    <GamificationContext.Provider value={{ userLevel, userXp, gamificationLevels, addXp, getNextLevelInfo }}>
      {children}
    </GamificationContext.Provider>
  );
};