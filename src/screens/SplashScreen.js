import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator } from 'react-native';

const SplashScreen = () => (
  <SplashScreenContainer>
    <ActivityIndicator size="large" />
  </SplashScreenContainer>
);

const SplashScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

export default SplashScreen;
