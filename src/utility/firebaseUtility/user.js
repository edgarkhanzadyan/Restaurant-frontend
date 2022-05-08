import * as SecureStore from 'expo-secure-store';

import { FieldsAreEmpty } from './helpers';

const dummyUserData = [];

export const signOut = () => SecureStore.deleteItemAsync('user');
// firebase
//   .auth()
//   .signOut()
//   .then(() => SecureStore.deleteItemAsync('user'))
//   .catch((error) => {
//     console.warn(error);
//   });

const signUserOutWithListeners = ({ setUserLoggedIn, setUserData }) => {
  // firebase.auth().signOut();
  SecureStore.deleteItemAsync('user');
  setUserLoggedIn(false);
  setUserData(null);
  // RootNavigation.reset({
  //   index: 0,
  //   routes: [{ name: 'LoginScreen' }],
  // });
};

export const userStateListener = ({ setUserLoggedIn, setUserData }) => {
  SecureStore.getItemAsync('user').then((user) => {
    const userData = JSON.parse(user);
    setUserData(userData);
    if (userData) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  });
  return Promise.resolve({});
};

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     setUserLoggedIn(true);
//   } else {
//     SecureStore.deleteItemAsync('user');
//     setUserData(null);
//     setUserLoggedIn(false);
//   }
// });

export const userStateListenerDatabase = ({ setUserLoggedIn, setUserData }) => {
  SecureStore.getItemAsync('user').then((user) => {
    console.warn(user);
    const userData = JSON.parse(user);
    if (userData && userData.role !== snapshot.child('role').val()) {
      signUserOutWithListeners({ setUserLoggedIn, setUserData });
    }
  });
};
// firebase
//   .database()
//   .ref(`users/${firebase.auth().currentUser.uid}`)
//   .on('value', (snapshot) => {
//     if (snapshot) {
//       if (snapshot.exists()) {
//         SecureStore.getItemAsync('user').then((user) => {
//           const userData = JSON.parse(user);
//           if (userData && userData.role !== snapshot.child('role').val()) {
//             signUserOutWithListeners({ setUserLoggedIn, setUserData });
//           }
//         });
//       } else {
//         signUserOutWithListeners({ setUserLoggedIn, setUserData });
//       }
//     }
//   });

// export const signInWithFirebase = ({ email, password }) => Promise.resolve();
// firebase
//   .auth()
//   .signInWithEmailAndPassword(email, password)
//   .then(() =>
//     firebase
//       .database()
//       .ref(`users/${firebase.auth().currentUser.uid}`)
//       .once('value')
//   );

export const createUserFirebase = ({ email, password, name, userRole }) => {
  if (!email || !password || !name || !userRole) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({});
  // const secondaryFirebase = firebase.apps.find(
  //   (app) => app.name === 'Secondary'
  // );
  // return secondaryFirebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(() =>
  //     firebase
  //       .database()
  //       .ref(`users/${secondaryFirebase.auth().currentUser.uid}`)
  //       .set({
  //         name,
  //         role: userRole,
  //       })
  //   )
  //   .then(() => secondaryFirebase.auth().signOut());
};

export const signUpWithFirebase = ({ email, password, name, userRole }) => {
  if (!email || !password || !name || !userRole) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({});
  // return firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(() =>
  //     firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).set({
  //       name,
  //       role: userRole,
  //     })
  //   );
};

export const deleteUserFirebase = ({ userUid }) => Promise.resolve({});
// firebase.database().ref(`users/${userUid}`).remove();

export const updateUserData = ({ userUid, userName, userRole }) => {
  if (!userName || !userRole) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({});
  // return firebase.database().ref(`users/${userUid}`).update({
  //   name: userName,
  //   role: userRole,
  // });
};

export const getUsers = ({ setUsers, setIsLoading, selfUserUid }) => {
  setUsers(dummyUserData);
  return Promise.resolve();
};

// firebase
//   .database()
//   .ref('users')
//   .on('value', (snapshot) => {
//     if (snapshot) {
//       setIsLoading(false);
//       const data = snapshot.val();
//       if (data === null) {
//         setUsers([]);
//       } else if (data) {
//         const arrData = Object.entries(data)
//           .map((entry) => ({
//             ...entry[1],
//             id: entry[0],
//           }))
//           .filter((arr) => arr.id !== selfUserUid);

//         setUsers(arrData);
//       }
//     }
//   });

export const getUser = ({ userUid, setUserInfo }) =>
  Promise.resolve(dummyUserData[0]);
// firebase
//   .database()
//   .ref(`users/${userUid}`)
//   .on('value', (snapshot) => {
//     if (snapshot) {
//       const data = snapshot.val();
//       if (data) {
//         setUserInfo(data);
//       }
//     }
//   });
