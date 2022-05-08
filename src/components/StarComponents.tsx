import React from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  reviewRating: number;
  size: number;
  disabled: boolean;
} & (
  | {
      disabled: true;
    }
  | {
      disabled: false;
      setReviewRating: (reviewRating: number) => unknown;
    }
);

const StarComponents = (props: Props) => {
  const starComponent = new Array(5).fill(undefined).map((_, idx) => {
    if (idx + 1 <= props.reviewRating)
      return (
        <StarButton
          disabled={props.disabled}
          onPress={() => !props.disabled && props.setReviewRating(idx + 1)}
        >
          <FontAwesome name="star" size={props.size} color="black" />
        </StarButton>
      );
    return (
      <StarButton
        disabled={props.disabled}
        onPress={() => !props.disabled && props.setReviewRating(idx + 1)}
      >
        <FontAwesome name="star-o" size={props.size} color="black" />
      </StarButton>
    );
  });
  return <StarsContainer>{starComponent}</StarsContainer>;
};

export default React.memo(StarComponents);

const StarButton = styled.TouchableWithoutFeedback``;

const StarsContainer = styled.View`
  flex-direction: row;
`;
