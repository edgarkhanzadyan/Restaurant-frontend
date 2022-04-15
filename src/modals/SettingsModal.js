import React from 'react';
import { Button, InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import { signOut } from '../utility/firebaseUtility';

const SettingsModal = ({ setModalIsOpen, modalIsOpen, userUid }) => {
  const navigation = useNavigation();
  return (
    <Modal
      isVisible={modalIsOpen}
      style={{ margin: 0, justifyContent: 'flex-end' }}
      onBackdropPress={() => setModalIsOpen(false)}
      swipeDirection="down"
      onSwipeComplete={() => setModalIsOpen(false)}
    >
      <ModalWrapper>
        <Button
          onPress={() => {
            setModalIsOpen(false);
            InteractionManager.runAfterInteractions(() => {
              navigation.navigate('UserScreen', { userUid });
            });
          }}
          title="Profile"
        />
        <Dash />
        <Button
          color="#ff453a"
          onPress={() => {
            signOut().then(() => {
              setModalIsOpen(false);
              InteractionManager.runAfterInteractions(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'LoginScreen', immediate: true }],
                });
              });
            });
          }}
          title="Sign Out"
        />
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 150px;
  width: 100%;
  border-radius: 25px;
  padding-bottom: 30px;
  padding-top: 20px;
  background-color: #ffffff;
`;
const Dash = styled.View`
  width: 80%;
  height: 1px;
  background-color: black;
  opacity: 0.3;
  border-radius: 1px;
`;

export default SettingsModal;
