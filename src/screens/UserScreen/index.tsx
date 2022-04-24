import React, { useState, useEffect } from 'react';
import { Button, FlatList, ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import type { Restaurant } from '../../types';
import {
  updateUserData,
  getRestaurantDataFilteredByOwner,
} from '../../utility/firebaseUtility';
import {
  getUserBackend,
  updateUserEmailBackend,
} from '../../utility/backendUtility';
import {
  editInfoActionSheet,
  adminChangeOwnRole,
  adminChangeOtherRole,
} from '../../utility/userInteractionUtility';
import UpdatePasswordModal from '../../modals/UpdatePasswordModal';
import RestaurantCardComponent from '../../components/RestaurantCardComponent';
import RoleSelector from '../../components/RoleSelector';
import { USER_ROLE } from '../../constants';
import { getRestaurantsByOwner, getUser } from '../../utility/requests';

const UserScreen = ({
  navigation,
  route: {
    params: { userUid },
  },
}) => {
  const [thisUserInfo, setThisUserInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState(USER_ROLE.REGULAR);
  const [userEmail, setUserEmail] = useState('');
  const [userEmailEditable, setUserEmailEditable] = useState(userEmail);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(
    () => {
      const fetchRestaurants = async () => {
        const response = await getRestaurantsByOwner({
          limit: 5,
          skip: 0,
          ownerUserId: userUid,
        });
        setRestaurantData(response);
      };
      fetchRestaurants();
    },
    // getRestaurantDataFilteredByOwner({
    //   setRestaurantData,
    //   setIsLoading,
    //   userUid,
    // }),
    []
  );
  useEffect(
    () => {
      const fetchUser = async () => {
        const response = await getUser({
          userId: userUid,
        });
        console.log('res', response);
        setUserEmail(response.email);
        setUserEmailEditable(response.email);
        setUserName(response.name);
        setUserRole(response.role);
      };
      fetchUser();
    },
    // getRestaurantDataFilteredByOwner({
    //   setRestaurantData,
    //   setIsLoading,
    //   userUid,
    // }),
    []
  );
  // useEffect(() => {
  //   getUserBackend({ userUid }).then((res) => {
  //     if (res.success) {
  //       setUserEmail(res.email);
  //       setUserEmailEditable(res.email);
  //     }
  //   });
  // }, []);
  // useEffect(() => getUser({ userUid, setUserInfo }), []);
  // useEffect(() => {
  //   setUserName(userInfo.name);
  //   setUserRole(userInfo.role);
  // }, [userInfo]);
  // useEffect(() => {
  //   SecureStore.getItemAsync('user')
  //     .then((user) => setThisUserInfo(JSON.parse(user)))
  //     .catch((err) => console.warn(err));
  // }, []);
  const resetUser = () => {
    setIsEditing(false);
    setUserName(userInfo.name);
    setUserRole(userInfo.role);
    setUserEmailEditable(userEmail);
  };
  const updateDone = () => {
    if (userInfo.role !== userRole || userInfo.name !== userName) {
      updateUserData({
        userUid,
        userName: userName.trim(),
        userRole,
      }).then(() => {
        setIsEditing(false);
      });
    }
    if (userEmail !== userEmailEditable) {
      updateUserEmailBackend({ userUid, email: userEmailEditable }).then(
        (res) => {
          setIsEditing(false);
          if (res.success) {
            setUserEmail(userEmailEditable);
            setUserEmailEditable(userEmailEditable);
          } else {
            resetUser();
          }
        }
      );
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditing ? (
          <Button
            onPress={() => {
              if (
                userInfo.role !== userRole ||
                userInfo.name !== userName ||
                userEmail !== userEmailEditable
              ) {
                if (userInfo.role !== userRole) {
                  if (
                    userInfo.role === USER_ROLE.ADMIN &&
                    userUid === thisUserInfo.userUid
                  ) {
                    editInfoActionSheet({
                      onEdit: () =>
                        adminChangeOwnRole({
                          updateDone,
                          updateCancel: resetUser,
                        }),
                      onCancel: resetUser,
                    });
                    return;
                  }
                  editInfoActionSheet({
                    onEdit: () =>
                      adminChangeOtherRole({
                        updateDone,
                        updateCancel: resetUser,
                      }),
                    onCancel: resetUser,
                  });
                  return;
                }
                editInfoActionSheet({
                  onEdit: updateDone,
                  onCancel: resetUser,
                });
                return;
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
  const renderItem = ({ item }: { item: Restaurant }) => (
    <RestaurantCardComponent
      item={item}
      navigation={navigation}
      userData={userInfo}
    />
  );
  console.log('username', userName);
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
                        value={userName}
                        onChangeText={setUserName}
                      />
                    </NameWrapper>
                    <EmailWrapper>
                      <EmailTitle>Email:</EmailTitle>
                      {thisUserInfo.role === USER_ROLE.ADMIN ? (
                        <EmailEditable
                          value={userEmailEditable}
                          onChangeText={setUserEmailEditable}
                        />
                      ) : (
                        <Email>{userEmail}</Email>
                      )}
                    </EmailWrapper>
                    <RoleWrapper>
                      <RoleTitle>Role:</RoleTitle>
                      <RoleSelector
                        userRole={userRole}
                        setUserRole={setUserRole}
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
                      <Name>{userName}</Name>
                    </NameWrapper>
                    <EmailWrapper>
                      <EmailTitle>Email:</EmailTitle>
                      <Email>{userEmail}</Email>
                    </EmailWrapper>
                    <RoleWrapper>
                      <RoleTitle>Role:</RoleTitle>
                      <RoleSelector
                        userRole={userRole}
                        setUserRole={setUserRole}
                        disabled
                      />
                    </RoleWrapper>
                  </>
                )}
                {restaurantData.length !== 0 && (
                  <UserRestaurantsTitle>
                    Restaurants created by{' '}
                    {thisUserInfo.userUid === userUid ? 'you' : userName}:
                  </UserRestaurantsTitle>
                )}
              </>
            }
            refreshing={isLoading}
            data={restaurantData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender={3}
          />
        )}
      </SafeAreaContainer>
      <UpdatePasswordModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        userUid={userUid}
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
