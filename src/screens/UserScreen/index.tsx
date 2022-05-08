import React, { useState, useEffect } from 'react';
import { Button, FlatList, ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import type { Restaurant, User } from '../../types';
import { editInfoActionSheet } from '../../utility/userInteractionUtility';
import UpdatePasswordModal from '../../modals/UpdatePasswordModal';
import RestaurantCardComponent from '../../components/RestaurantCardComponent';
import RoleSelector from '../../components/RoleSelector';
import { USER_ROLE } from '../../constants';
import {
  deleteRestaurant,
  getRestaurantsByOwner,
  getUser,
  updateUser,
} from '../../utility/requests';
import { getUser as getUserStore } from '../../utility/secureStore';
import { RootStackParamList } from '../../navigation/types';

const UserScreen = ({
  navigation,
  route: {
    params: { userId },
  },
}: StackScreenProps<RootStackParamList, 'UserScreen'>) => {
  console.log(userId);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userInfoEdit, setUserInfoEdit] = useState<User | null>(null);
  const [thisUserInfo, setThisUserInfo] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    const response = await getRestaurantsByOwner({
      limit: 5,
      skip: 0,
      ownerUserId: userId,
    });
    setRestaurantData(response);
  };

  const fetchUser = async () => {
    const response = await getUser({
      userId,
    });
    setUserInfo(response);
    setUserInfoEdit(response);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getUserStore(), fetchRestaurants(), fetchUser()])
      .then(([user]) => {
        setThisUserInfo(user);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  const resetUser = () => {
    setIsEditing(false);
    if (userInfo) {
      setUserInfoEdit(userInfo);
    }
  };
  const updateDone = () => {
    if (
      userInfo &&
      userInfoEdit &&
      (userInfo.role !== userInfoEdit.role ||
        userInfo.name !== userInfoEdit.name)
    ) {
      updateUser({
        userId,
        name: userInfoEdit.name,
        role: userInfoEdit.role,
      }).then(() => {
        setIsEditing(false);
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditing ? (
          <Button
            onPress={() => {
              if (
                userInfo &&
                userInfoEdit &&
                (userInfo.role !== userInfoEdit.role ||
                  userInfo.name !== userInfoEdit.name)
              ) {
                editInfoActionSheet({
                  onEdit: updateDone,
                  onCancel: resetUser,
                });
              }
              resetUser();
            }}
            title="Done"
          />
        ) : (
          <Button onPress={() => setIsEditing(true)} title="Edit" />
        ),
    });
  });

  if (isLoading || !userInfo || !userInfoEdit || !thisUserInfo) {
    return <ActivityIndicator />;
  }
  const renderItem = ({ item }: { item: Restaurant }) => (
    <RestaurantCardComponent
      restaurant={item}
      navigate={() =>
        navigation.navigate('RestaurantScreen', {
          userData: userInfo,
          restaurantId: item._id,
        })
      }
      userData={userInfo}
      onDelete={() => {
        deleteRestaurant({ restaurantId: item._id }).then(() => {
          fetchRestaurants();
        });
      }}
    />
  );
  console.log('userInfo', userInfo);
  return (
    <UserScreenContainer>
      <SafeAreaContainer>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList<Restaurant>
            ListHeaderComponent={
              <>
                {isEditing ? (
                  <>
                    <NameWrapper>
                      <NameTitle>Name:</NameTitle>
                      <NameEditable
                        value={userInfoEdit.name}
                        onChangeText={(name) =>
                          setUserInfoEdit({ ...userInfoEdit, name })
                        }
                      />
                    </NameWrapper>
                    <EmailWrapper>
                      <EmailTitle>Email:</EmailTitle>
                      {thisUserInfo.role === USER_ROLE.ADMIN ? (
                        <EmailEditable
                          value={userInfoEdit.email}
                          onChangeText={(email) =>
                            setUserInfoEdit({ ...userInfoEdit, email })
                          }
                        />
                      ) : (
                        <Email>{userInfo.email}</Email>
                      )}
                    </EmailWrapper>
                    <RoleWrapper>
                      <RoleTitle>Role:</RoleTitle>
                      <RoleSelector
                        userRole={userInfoEdit.role}
                        setUserRole={(role) => {
                          setUserInfoEdit({ ...userInfoEdit, role });
                        }}
                        disabled={thisUserInfo.role !== USER_ROLE.ADMIN}
                        isCreatorAdmin
                      />
                      {thisUserInfo.role === USER_ROLE.ADMIN && (
                        <Button
                          title="Update password"
                          onPress={() => setModalIsOpen(true)}
                        />
                      )}
                    </RoleWrapper>
                  </>
                ) : (
                  <>
                    <NameWrapper>
                      <NameTitle>Name:</NameTitle>
                      <Name>{userInfo.name}</Name>
                    </NameWrapper>
                    <EmailWrapper>
                      <EmailTitle>Email:</EmailTitle>
                      <Email>{userInfo.email}</Email>
                    </EmailWrapper>
                    <RoleWrapper>
                      <RoleTitle>Role:</RoleTitle>
                      <RoleSelector
                        userRole={userInfo.role}
                        setUserRole={() => {}}
                        isCreatorAdmin={false}
                        disabled
                      />
                    </RoleWrapper>
                  </>
                )}
                {restaurantData.length !== 0 && (
                  <UserRestaurantsTitle>
                    Restaurants created by{' '}
                    {thisUserInfo._id === userInfo._id ? 'you' : userInfo.name}:
                  </UserRestaurantsTitle>
                )}
              </>
            }
            refreshing={isLoading}
            data={restaurantData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            initialNumToRender={3}
          />
        )}
      </SafeAreaContainer>
      <UpdatePasswordModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        userId={userInfo._id}
      />
    </UserScreenContainer>
  );
};

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
`;

const UserScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const PropertyWrapperCommon = css`
  margin-top: 30px;
  margin-left: 10px;
  align-items: center;
`;
const PropertyTitleCommon = css`
  margin: 0px 10px;
  padding: 5px;
  font-size: 18px;
`;
const NameWrapper = styled.View`
  ${PropertyWrapperCommon}
`;
const RoleWrapper = styled.View`
  ${PropertyWrapperCommon}
`;
const EmailWrapper = styled.View`
  ${PropertyWrapperCommon}
`;

const NameTitle = styled.Text`
  ${PropertyTitleCommon}
`;
const RoleTitle = styled.Text`
  ${PropertyTitleCommon}
`;
const EmailTitle = styled.Text`
  ${PropertyTitleCommon}
`;

const PropertyGeneral = css`
  color: black;
  font-size: 18px;
  font-weight: 800;
  padding: 5px;
`;

const PropertyEditable = css`
  ${PropertyGeneral}
  border: 1px solid black;
  border-radius: 5px;
`;

const Name = styled.Text`
  ${PropertyGeneral}
`;

const NameEditable = styled.TextInput`
  ${PropertyEditable}
`;

const Email = styled.Text`
  ${PropertyGeneral}
`;

const EmailEditable = styled.TextInput`
  ${PropertyEditable}
`;

const UserRestaurantsTitle = styled.Text`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
`;

export default UserScreen;
