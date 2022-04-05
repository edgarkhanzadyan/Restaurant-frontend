import React from 'react';
import styled from 'styled-components';

const SubmitButton = ({ title, disabled, isInverse, onPress, style }) => (
  <SubmitButtonWrapper
    disabled={disabled}
    isInverse={isInverse}
    onPress={onPress}
    style={style}
  >
    <SubmitButtonText disabled={disabled} isInverse={isInverse}>
      {title}
    </SubmitButtonText>
  </SubmitButtonWrapper>
);

export default SubmitButton;

const SubmitButtonWrapper = styled.TouchableOpacity`
  background-color: ${(props) => {
    if (props.isInverse) {
      return 'white';
    }
    if (props.disabled) {
      return 'grey';
    }
    return 'blue';
  }};
  border: 1px solid ${(props) => (props.disabled ? 'grey' : 'blue')};
  height: 44px;
  width: 100px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
`;

const SubmitButtonText = styled.Text`
  color: ${(props) => {
    if (props.isInverse) {
      if (props.disabled) {
        return 'grey';
      }
      return 'blue';
    }
    return 'white';
  }};
`;
