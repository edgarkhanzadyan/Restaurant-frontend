import React from 'react';
import styled from 'styled-components/native';

import Navigation from './src/navigation';

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
