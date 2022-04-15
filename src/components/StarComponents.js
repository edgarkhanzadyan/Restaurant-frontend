import React from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const StarComponents = ({ reviewRating, setReviewRating, size, disabled }) => {
  const starComponent = new Array(5).fill().map((_, idx) => {
    if (idx + 1 <= reviewRating)
      return (
        <StarButton
          disabled={disabled}
          onPress={() => setReviewRating && setReviewRating(idx + 1)}
        >
          <FontAwesome name="star" size={size} color="black" />
        </StarButton>
      );
    return (
      <StarButton
        disabled={disabled}
        onPress={() => setReviewRating && setReviewRating(idx + 1)}
      >
        <FontAwesome name="star-o" size={size} color="black" />
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
