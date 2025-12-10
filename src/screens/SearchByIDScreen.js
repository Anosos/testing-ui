import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const Content = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 2px solid #C09943;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  border-radius: 8px;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #C09943 0%, #a8773f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(192, 153, 67, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 107, 0.2);
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SearchByIDScreen = ({ onBack }) => {
  const [searchID, setSearchID] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    const id = searchID.trim();
    
    if (!id) {
      setError('Please enter an artifact ID');
      return;
    }

    navigate(`/search/${id}`);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>Search by ID</Title>
      </Header>

      <Content>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Enter artifact ID (e.g., EG001)"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            autoFocus
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
      </Content>
    </Container>
  );
};

export default SearchByIDScreen;
