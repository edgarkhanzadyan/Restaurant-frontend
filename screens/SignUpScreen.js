import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import * as SecureStore from 'expo-secure-store';

import {
  signUpWithFirebase,
  createUserFirebase,
} from '../utility/firebaseUtility';
import {
  handleAlerts,
  resetToMainScreen,
} from '../utility/userInteractionUtility';
import { USER_ROLE } from '../constants';

import SubmitButton from '../components/SubmitButton';
import RoleSelector from '../components/RoleSelector';

const SignUpScreen = ({
  navigation,
  route: {
    params: { isCreatorAdmin },
  },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(USER_ROLE.REGULAR);
  const [confirmPassword, setConfirmPassword] = useState('');
  const createAnotherUser = () => {
    if (password === confirmPassword) {
      createUserFirebase({
        name: name.trim(),
        email: email.trim(),
        password,
        userRole,
      })
        .then(() => {
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          Alert.alert('User created');
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };
  const signUp = () => {
    if (password === confirmPassword) {
      try {
        setIsLoading(true);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
          routes: [{ name: resetToMainScreen(userRole) }],
        });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        handleAlerts(error);
      }
    } else {
      Alert.alert('Passwords do not match');
    }
  };
  return (
    <SignUpPageContainer>
      <InputContainer>
        <Title>Sign Up</Title>
        <NameInput
          value={name}
          onChangeText={setName}
          autoCompleteType="name"
          autoCorrect={false}
          placeholder="name"
        />
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
          textContentType="username"
          placeholder="password"
        />
        <PasswordInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          textContentType="username"
          placeholder="confirm password"
        />
        <RoleSelector
          userRole={userRole}
          setUserRole={setUserRole}
          isCreatorAdmin={isCreatorAdmin}
        />
        <SubmitButton
          disabled={isLoading}
          onPress={isCreatorAdmin ? createAnotherUser : signUp}
          title="Register"
        />
        <SubmitButton
          disabled={isLoading}
          isInverse
          onPress={() => navigation.pop()}
          title="Back"
        />
      </InputContainer>
    </SignUpPageContainer>
  );
};

const SignUpPageContainer = styled.View`
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
const NameInput = styled(FieldInput)``;
const PasswordInput = styled(FieldInput)``;

export default SignUpScreen;
