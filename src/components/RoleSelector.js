import React from 'react';
import styled from 'styled-components/native';

import { USER_ROLE, USER_MAP } from '../../constants';

const RoleSelector = ({ userRole, setUserRole, disabled, isCreatorAdmin }) => {
  if (disabled) {
    return (
      <RoleButton active disabled>
        <RoleButtonText>{USER_MAP[userRole]}</RoleButtonText>
      </RoleButton>
    );
  }
  return Object.values(USER_ROLE)
    .filter((constRole) => isCreatorAdmin || constRole !== USER_ROLE.ADMIN)
    .map((constRole) => (
      <RoleButton
        active={userRole === constRole}
        onPress={() => setUserRole(constRole)}
      >
        <RoleButtonText>{USER_MAP[constRole]}</RoleButtonText>
      </RoleButton>
    ));
};

const RoleButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? '#009ed3' : '#70dbff')};
  padding: 10px;
  border-radius: 5px;
  margin: 3px;
`;
const RoleButtonText = styled.Text``;

export default RoleSelector;
