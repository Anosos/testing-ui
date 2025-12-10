import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GamificationContext } from '../context/GamificationContext';

const ChatbotContainer = styled.div`
  background-color: #F0F0F0; /* Light background for the chatbot */
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #333333;
`;

const HarasMessage = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555555;
`;

const HarasTitle = styled.h3`
  color: #C09943; /* Dark Goldenrod equivalent */
  font-size: 20px;
  margin-bottom: 10px;
`;

const HarasOptionButton = styled.button`
  background-color: #C09943;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #A6873D;
  }
`;

const HarasResponse = styled.div`
  background-color: #FFFFFF;
  border-left: 4px solid #C09943;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
`;

const LevelDetail = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E0E0E0;
`;

const PerkList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 5px;
`;

const PerkItem = styled.li`
  margin-bottom: 5px;
  &::before {
    content: "📜 "; /* Ancient Egyptian aesthetic */
    margin-right: 5px;
  }
`;

export default function HarasChatbot() {
  const { userLevel, userXp, gamificationLevels, getNextLevelInfo } = useContext(GamificationContext);
  const [response, setResponse] = useState('');

  const handleExplainLevels = () => {
    let explanation = `Greetings, seeker! I, Haras, shall illuminate the path of ascension for you. 📜\n\n`;
    explanation += `Our sacred hierarchy guides you from the strength of Sobek 🐊 to the supreme power of Amun ☀. Each step fortifies your spirit and bestows upon you unique blessings.\n\n`;

    for (let i = 1; i <= Object.keys(gamificationLevels).length; i++) {
      const level = gamificationLevels[i];
      explanation += `\n**Level ${i}: ${level.name} ${level.symbol}**\n`;
      explanation += `*Theme:* ${level.theme}\n`;
      explanation += `*Description:* ${level.description}\n`;
      explanation += `*Perks:*\n`;
      level.perks.forEach(perk => {
        explanation += `  - ${perk}\n`;
      });
    }
    explanation += `\nAscend, for the glory of the Pantheon awaits! 👑`;
    setResponse(explanation);
  };

  const handleCheckStatus = () => {
    const nextLevelInfo = getNextLevelInfo();
    let statusMessage = `Behold, brave Traveler! I have consulted the Golden Book for your standing. 📜\n\n`;
    statusMessage += `You currently walk the path as a **${userLevel.name} ${userLevel.symbol}**.\n`;
    statusMessage += `Your spirit's energy measures **${userXp} XP**.\n\n`;
    statusMessage += `*Your current blessings include:*\n`;
    userLevel.perks.forEach(perk => {
      statusMessage += `  - ${perk}\n`;
    });

    if (nextLevelInfo) {
      statusMessage += `\nTo ascend to the next glorious realm, that of **${nextLevelInfo.nextLevel.name} ${nextLevelInfo.nextLevel.symbol}**, you require **${nextLevelInfo.xpNeeded} more XP**.\n`;
      statusMessage += `Continue your journey, for greatness beckons! 🐺`;
    } else {
      statusMessage += `\nYou have reached the pinnacle, a true **Amun**! Your legend shines eternal! ☀`;
    }
    setResponse(statusMessage);
  };

  return (
    <ChatbotContainer>
      <HarasTitle>Haras (The Guardian) 🐺</HarasTitle>
      <HarasMessage>
        Welcome, Traveler. I am Haras, the Keeper of the Records. Are you here to check your rank in the Golden Book, or do you seek knowledge about the path to becoming an Amun?
      </HarasMessage>
      <div>
        <HarasOptionButton onClick={handleCheckStatus} style={{ marginRight: '10px' }}>
          What is my level? 👑
        </HarasOptionButton>
        <HarasOptionButton onClick={handleExplainLevels}>
          Explain the Levels 📜
        </HarasOptionButton>
      </div>

      {response && (
        <HarasResponse>
          {response.split('\n').map((item, key) => {
            // Basic Markdown-like rendering for bold
            if (item.startsWith('**') && item.endsWith('**')) {
              return <p key={key} style={{ fontWeight: 'bold' }}>{item.substring(2, item.length - 2)}</p>;
            }
            if (item.startsWith('- ')) {
              return <PerkItem key={key}>{item.substring(2)}</PerkItem>;
            }
            return <p key={key}>{item}</p>;
          })}
        </HarasResponse>
      )}
    </ChatbotContainer>
  );
}
