import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;
const RestaurantImage = ({ source }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <RestaurantImgWrapper>
      {isLoading && <ActivityIndicatorAbsolute size="large" />}
      <RestaurantImg source={source} onLoadStart={() => setIsLoading(true)} />
    </RestaurantImgWrapper>
  );
};

export default RestaurantImage;

const RestaurantImgWrapper = styled.View`
  height: ${windowWidth / 1.3}px;
`;

const RestaurantImg = styled.Image`
  width: ${windowWidth}px;
  height: ${windowWidth / 1.3}px;
`;

const ActivityIndicatorAbsolute = styled.ActivityIndicator`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
