import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
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

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #C09943;
    border-radius: 10px;
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled.div`
  background: ${props => (props.isUser ? 'linear-gradient(135deg, #C09943 0%, #a8773f 100%)' : 'rgba(255, 255, 255, 0.1)')};
  color: ${props => (props.isUser ? '#000' : '#fff')};
  padding: 15px 20px;
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;
  border: ${props => (props.isUser ? 'none' : '2px solid #C09943')};
  line-height: 1.4;

  @media (max-width: 600px) {
    max-width: 85%;
  }
`;

const InputSection = styled.div`
  padding: 20px;
  border-top: 2px solid #C09943;
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.5);
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #C09943;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button`
  padding: 12px 25px;
  background: linear-gradient(135deg, #C09943 0%, #a8773f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(192, 153, 67, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const VoiceButton = styled.button`
  padding: 12px 20px;
  background: ${props => (props.isListening ? '#ff6b6b' : 'rgba(255, 255, 255, 0.1)')};
  color: ${props => (props.isListening ? '#fff' : '#C09943')};
  border: 2px solid #C09943;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => (props.isListening ? '#ff5252' : 'rgba(192, 153, 67, 0.2)')};
  }
`;

const ModeToggle = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  border-bottom: 2px solid #C09943;
`;

const ModeButton = styled.button`
  flex: 1;
  padding: 10px;
  background: ${props => (props.active ? '#C09943' : 'rgba(255, 255, 255, 0.1)')};
  color: ${props => (props.active ? '#000' : '#fff')};
  border: 2px solid #C09943;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => (props.active ? '#C09943' : 'rgba(192, 153, 67, 0.2)')};
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
`;

const WelcomeIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const chatbotResponses = {
  greeting: [
    'Hello! 👋 Welcome to the GEM Museum AI Assistant. How can I help you today?',
    'Hi there! 🏛️ I\'m here to help you explore the museum. What would you like to know?',
    'Welcome! 🎭 Feel free to ask me about artifacts, history, or museum information.',
  ],
  artifact: [
    'That\'s a fascinating artifact! 🖼️ Would you like more information about it?',
    'Great question! This artifact tells an amazing story. 📖 What else would you like to know?',
    'I love discussing artifacts! ✨ This one is particularly interesting...',
  ],
  tour: [
    'Our museum offers incredible tours! 🗺️ Would you like to hear about a specific period?',
    'Tours are a wonderful way to learn! 🎫 Which era interests you most?',
  ],
  help: [
    'I can help you with:\n• Artifact information\n• Museum tours\n• Navigation\n• Collection tips',
    'How can I assist? You can ask me about:\n• Historical periods\n• Specific artifacts\n• Museum services',
  ],
  default: [
    'That\'s interesting! Can you tell me more? 🤔',
    'I appreciate your curiosity! Would you like to know more? 📚',
    'Great question! Let me help you explore. 🔍',
  ]
};

const ChatbotScreen = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 Welcome to the GEM Museum AI Assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState('text');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.language = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setInputValue(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
    } else if (
      lowerMessage.includes('artifact') ||
      lowerMessage.includes('statue') ||
      lowerMessage.includes('ancient')
    ) {
      return chatbotResponses.artifact[Math.floor(Math.random() * chatbotResponses.artifact.length)];
    } else if (
      lowerMessage.includes('tour') ||
      lowerMessage.includes('navigate') ||
      lowerMessage.includes('guide')
    ) {
      return chatbotResponses.tour[Math.floor(Math.random() * chatbotResponses.tour.length)];
    } else if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('what can you do')
    ) {
      return chatbotResponses.help[Math.floor(Math.random() * chatbotResponses.help.length)];
    } else {
      return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
    }
  };

  const handleSendMessage = (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getResponse(messageText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Text-to-speech for bot response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botMessage.text);
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
      }
    }, 500);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>Chat Support</Title>
      </Header>

      <ModeToggle>
        <ModeButton
          active={mode === 'text'}
          onClick={() => setMode('text')}
        >
          💬 Text Chat
        </ModeButton>
        <ModeButton
          active={mode === 'voice'}
          onClick={() => setMode('voice')}
        >
          🎙️ Voice Chat
        </ModeButton>
      </ModeToggle>

      <MessagesContainer>
        {messages.length === 1 && (
          <WelcomeMessage>
            <WelcomeIcon>🤖</WelcomeIcon>
            <p>Ask me anything about the museum!</p>
          </WelcomeMessage>
        )}
        {messages.map((message) => (
          <Message key={message.id} isUser={message.isUser}>
            <MessageBubble isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {mode === 'text' ? (
        <InputSection>
          <InputField
            type="text"
            placeholder="Ask me about artifacts, tours, or museum info..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <SendButton onClick={() => handleSendMessage()}>📤 Send</SendButton>
        </InputSection>
      ) : (
        <InputSection>
          <VoiceButton
            isListening={isListening}
            onClick={startListening}
          >
            {isListening ? '⏹️ Stop' : '🎤 Listen'}
          </VoiceButton>
          <span style={{ flex: 1, display: 'flex', alignItems: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
            {isListening ? 'Listening...' : 'Click to speak'}
          </span>
        </InputSection>
      )}
    </Container>
  );
};

export default ChatbotScreen;
