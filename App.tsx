import React from 'react';
import styled from 'styled-components';

import Navigation from './src/navigation';
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

const ContainerView = styled.view`
  flex: 1;
`;
