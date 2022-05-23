import React, { useState } from 'react';
import { Alert, Button } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => unknown;
};

const UpdatePasswordModal = ({ modalIsOpen, setModalIsOpen }: Props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal
      isVisible={modalIsOpen}
      onBackdropPress={() => setModalIsOpen(false)}
      swipeDirection="down"
      onSwipeComplete={() => setModalIsOpen(false)}
    >
      <ModalWrapper>
        <ModalTitle>Change Password</ModalTitle>
        <PasswordContainer
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry
          textContentType="password"
        />
        <PasswordContainer
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="confirm password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          title="Update password"
          onPress={() => {
            if (password === confirmPassword) {
              setIsLoading(true);
              Promise.resolve({ success: true })
                .then((res) => {
                  if (res.success) {
                    setModalIsOpen(false);
                    setIsLoading(false);
                    setPassword('');
                    setConfirmPassword('');
                  } else {
                    setIsLoading(false);
                    Alert.alert('Error', 'Password update failed');
                  }
                })
                .catch(() => {
                  setIsLoading(false);
                  Alert.alert('Error', 'Password update failed');
                });
            } else {
              Alert.alert('Error', 'Passwords do not match');
            }
          }}
          disabled={isLoading}
        />
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 250px;
  border-radius: 25px;
  padding-bottom: 20px;
  background-color: #ffffff;
`;

const ModalTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;

const PasswordContainer = styled.TextInput`
  width: 80%;
  border: 1px black solid;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export default UpdatePasswordModal;
