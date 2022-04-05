import React, { useState } from 'react';
import styled from 'styled-components';
import * as SecureStore from 'expo-secure-store';

import {
  handleAlerts,
  resetToMainScreen,
} from '../utility/userInteractionUtility';
import SubmitButton from '../components/SubmitButton';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const signIn = () => {
    try {
      setIsLoading(true);
      setEmail('');
      setPassword('');
      SecureStore.setItemAsync(
        'user',
        JSON.stringify({
          name: 'asd',
          role: 'REGULAR',
          userUid: '1',
          userEmail: 'someemail@gmail.com',
        })
      );
      navigation.reset({
        index: 0,
        routes: [{ name: resetToMainScreen('REGULAR') }],
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      handleAlerts(e);
    }

    // signInWithFirebase({ email, password })
    //   .then((userDataSnapshot) => {
    //     setEmail('');
    //     setPassword('');
    //     // const { uid: userUid, email: userEmail } = firebase.auth().currentUser;
    //     // const userData = userDataSnapshot.val();
    //     // const { name, role } = userData;
    //     // SecureStore.setItemAsync(
    //     //   'user',
    //     //   JSON.stringify({ name, role, userUid, userEmail })
    //     // );
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: resetToMainScreen('REGULAR') }],
    //     });
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {

    //   });
  };
  return (
    <LoginPageContainer>
      <InputContainer>
        <Title>Restaurant Project</Title>
        <EmailInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="email"
        />
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="password"
        />
        <SubmitButton disabled={isLoading} onPress={signIn} title="Log in" />
        <RegisterText>OR</RegisterText>
        <SubmitButton
          isInverse
          disabled={isLoading}
          onPress={() =>
            navigation.navigate('SignUpScreen', { isCreatorAdmin: false })
          }
          title="Register"
        />
      </InputContainer>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: black;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  align-items: center;
  width: 60%;
`;

const FieldInput = styled.TextInput`
  border: 1px black solid;
  width: 100%;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 10px;
  height: 44px;
`;
const EmailInput = styled(FieldInput)``;
const PasswordInput = styled(FieldInput)``;

const RegisterText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px;
`;

export default LoginPage;
