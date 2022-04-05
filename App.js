import React from 'react';
import styled from 'styled-components';

import Navigation from './navigation';
// import { initializeFirebaseApps } from './utility/firebaseUtility';

// // Initialize Firebase
// initializeFirebaseApps();

export default function App() {
  return (
    <ContainerView>
      <Navigation />
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
`;
