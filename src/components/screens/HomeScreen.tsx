import React from 'react';
import styled from 'styled-components/native';

export const HomeScreen: React.FC = () => {
  return (
    <Container>
      <StyledText>Home Screen</StyledText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: #333;
`;

export default HomeScreen;
