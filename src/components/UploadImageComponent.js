import React, { useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';

import RestaurantImage from './RestaurantImage';
// import { uploadImage } from '../utility/firebaseUtility';

const windowWidth = Dimensions.get('window').width;

const UploadImageComponent = ({ setImgB64, imgB64 }) => {
  const [imgLoading, setImgLoading] = useState(false);
  const pickImage = async () => {
    setImgLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
        base64: true,
      });

      if (!result.cancelled) {
        setImgB64(result.base64);
      }
      setImgLoading(false);
    } catch (e) {
      console.warn(e);
    }
  };
  const imageComponent = () => {
    if (imgLoading) return <ActivityIndicator />;
    if (imgB64)
      return (
        <RestaurantImage
          source={{
            uri: `data:image/png;base64,${imgB64}`,
          }}
        />
      );
    return <ImagePlaceholder>Press to{'\n'}add picture</ImagePlaceholder>;
  };
  return <ImageWrapper onPress={pickImage}>{imageComponent()}</ImageWrapper>;
};

export default UploadImageComponent;

const ImageWrapper = styled.TouchableOpacity`
  width: 100%;
  height: ${windowWidth / 1.3}px;
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholder = styled.Text`
  font-size: 26px;
  opacity: 0.5;
  text-align: center;
`;
