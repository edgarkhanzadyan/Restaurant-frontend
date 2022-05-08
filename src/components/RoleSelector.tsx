import React from 'react';
import styled from 'styled-components/native';

import { USER_ROLE, USER_MAP } from '../constants';
import type { UserRole } from '../types';

const RoleSelector = ({
  userRole,
  setUserRole,
  disabled,
  isCreatorAdmin,
}: {
  userRole: UserRole;
  setUserRole: (role: UserRole) => unknown;
  disabled: boolean;
  isCreatorAdmin: boolean;
}) => {
  if (disabled) {
    return (
      <RoleButton active disabled>
        <RoleButtonText>{USER_MAP[userRole]}</RoleButtonText>
      </RoleButton>
    );
  }
  const roleSelectorContent = Object.values(USER_ROLE)
    .filter((constRole) => isCreatorAdmin || constRole !== USER_ROLE.ADMIN)
    .map((constRole) => (
      <RoleButton
        active={userRole === constRole}
        onPress={() => setUserRole(constRole)}
      >
        <RoleButtonText>{USER_MAP[constRole]}</RoleButtonText>
      </RoleButton>
    ));

  return <>{roleSelectorContent}</>;
};

const RoleButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${({ active }: { active: boolean }) =>
    active ? '#009ed3' : '#70dbff'};
  padding: 10px;
  border-radius: 5px;
  margin: 3px;
`;
const RoleButtonText = styled.Text``;

export default RoleSelector;
