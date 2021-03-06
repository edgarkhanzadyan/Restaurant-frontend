import React, { useState } from 'react';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { resetToMainScreen } from '../../utility/userInteractionUtility';
import SubmitButton from '../../components/SubmitButton';
import RestaurantImage from '../../components/RestaurantImage';
import { createRestaurant } from '../../utility/requests';

import { RootStackParamList } from '../../navigation/types';

const windowWidth = Dimensions.get('window').width;

const AddRestaurantScreen = ({
  navigation,
  route: {
    params: { role },
  },
}: StackScreenProps<RootStackParamList, 'AddRestaurantScreen'>) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [address, setAddress] = useState('');
  const [imgB64, setImgB64] = useState('');
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

      if (!result.cancelled && result.base64) {
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
  return (
    <AddRestaurantScreenContainer
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <InputContainer>
        <Title>Add restaurant</Title>
        <ImageWrapper onPress={pickImage}>{imageComponent()}</ImageWrapper>
        <NameInput
          value={restaurantName}
          onChangeText={setRestaurantName}
          autoCorrect={false}
          placeholder="Restaurant name"
        />
        <DescriptionInput
          multiline
          value={restaurantDescription}
          onChangeText={setRestaurantDescription}
          placeholder="Description"
        />
        <AddressInput
          value={address}
          onChangeText={setAddress}
          autoCorrect={false}
          placeholder="Address"
        />
        <SubmitButton
          disabled={imgLoading}
          isInverse={false}
          onPress={() => {
            createRestaurant({
              name: restaurantName.trim(),
              description: restaurantDescription.trim(),
              location: address.trim(),
              image: imgB64,
            })
              .then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: resetToMainScreen(role) }],
                });
              })
              .catch((error) => {
                console.warn(error);
              });
          }}
          title="Register"
        />
        <SubmitButton
          disabled={imgLoading}
          isInverse
          onPress={() => navigation.pop()}
          title="Back"
        />
      </InputContainer>
    </AddRestaurantScreenContainer>
  );
};

const AddRestaurantScreenContainer = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;
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
const Title = styled.Text`
  color: black;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  align-items: center;
  width: 70%;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const FieldInput = styled.TextInput`
  border: 1px black solid;
  width: 100%;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 10px;
  height: 44px;
`;
const NameInput = styled(FieldInput)``;
const DescriptionInput = styled(FieldInput)`
  height: 150px;
`;
const AddressInput = styled(FieldInput)``;

export default AddRestaurantScreen;
