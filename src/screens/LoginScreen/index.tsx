import React, { useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types';
import {
  handleAlerts,
  resetToMainScreen,
} from '../../utility/userInteractionUtility';
import SubmitButton from '../../components/SubmitButton';
import { login } from '../../utility/requests';
import {
  LoginPageContainer,
  InputContainer,
  Title,
  EmailInput,
  PasswordInput,
  RegisterText,
} from './styles';
import { setUser } from '../../utility/secureStore';

const LoginPage = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'LoginScreen'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    setIsLoading(true);
    try {
      const user = await login({ email, password });
      setEmail('');
      setPassword('');
      await setUser(user);
      navigation.reset({
        index: 0,
        routes: [{ name: resetToMainScreen(user.role) }],
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      handleAlerts(e);
    }
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
        <SubmitButton
          isInverse={false}
          disabled={isLoading}
          onPress={signIn}
          title="Log in"
        />
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

export default LoginPage;
