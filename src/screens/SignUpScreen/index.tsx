import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import {
  handleAlerts,
  resetToMainScreen,
} from '../../utility/userInteractionUtility';

import SubmitButton from '../../components/SubmitButton';
import RoleSelector from '../../components/RoleSelector';
import { createUser, signUp } from '../../utility/requests';
import { RootStackParamList } from '../../navigation/types';
import { UserRole } from '../../types';
import {
  SignUpPageContainer,
  Title,
  InputContainer,
  EmailInput,
  NameInput,
  PasswordInput,
} from './styles';
import { setUser } from '../../utility/secureStore';

const SignUpScreen = ({
  navigation,
  route: {
    params: { isCreatorAdmin, onBack },
  },
}: StackScreenProps<RootStackParamList, 'SignUpScreen'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('regular');
  const [confirmPassword, setConfirmPassword] = useState('');
  const createAnotherUser = () => {
    if (password === confirmPassword) {
      setIsLoading(true);
      createUser({
        email,
        password,
        name,
        role: userRole,
      })
        .then(() => {
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setIsLoading(false);
          Alert.alert('User created');
        })
        .catch((e) => {
          setIsLoading(false);
          handleAlerts(e);
        });
    } else {
      Alert.alert('Passwords do not match');
    }
  };
  const signUpAction = () => {
    if (password === confirmPassword) {
      setIsLoading(true);
      signUp({
        email,
        password,
        name,
        role: userRole,
      })
        .then((user) => {
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          return setUser(user);
        })
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: resetToMainScreen(userRole) }],
          });
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          handleAlerts(e);
        });
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
          disabled={false}
          userRole={userRole}
          setUserRole={setUserRole}
          isCreatorAdmin={isCreatorAdmin}
        />
        <SubmitButton
          isInverse={false}
          disabled={isLoading}
          onPress={isCreatorAdmin ? createAnotherUser : signUpAction}
          title="Register"
        />
        <SubmitButton
          disabled={isLoading}
          isInverse
          onPress={() => {
            navigation.pop();
            if (onBack) {
              onBack();
            }
          }}
          title="Back"
        />
      </InputContainer>
    </SignUpPageContainer>
  );
};

export default SignUpScreen;
