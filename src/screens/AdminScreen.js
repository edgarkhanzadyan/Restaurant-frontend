import React from 'react';
import styled from 'styled-components';

const AdminScreen = ({ navigation }) => (
  <AdminScreenContainer>
    <NavigationButtonWrapper onPress={() => navigation.navigate('UserFeed')}>
      <NavigationButtonText>Users</NavigationButtonText>
    </NavigationButtonWrapper>
    <NavigationButtonWrapper
      onPress={() => navigation.navigate('RestaurantFeed')}
    >
      <NavigationButtonText>Restaurants</NavigationButtonText>
    </NavigationButtonWrapper>
  </AdminScreenContainer>
);

const AdminScreenContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const NavigationButtonWrapper = styled.TouchableOpacity`
  height: 100px;
  border: 1px solid black;
  justify-content: center;
`;
const NavigationButtonText = styled.Text`
  padding: 0px 20px;
  font-size: 20px;
  font-weight: 600;
`;

export default AdminScreen;
