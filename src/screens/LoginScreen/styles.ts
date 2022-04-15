import styled from 'styled-components/native';

export const LoginPageContainer = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: black;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const InputContainer = styled.View`
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
export const EmailInput = styled(FieldInput)``;
export const PasswordInput = styled(FieldInput)``;

export const RegisterText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px;
`;
