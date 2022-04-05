import { FieldsAreEmpty } from './firebaseUtility/helpers';

const backendUrl = `http://localhost:3456`;

type UserRole = 'Regular' | 'RestaurantOwner' | 'Admin';

type BackendSignupRequestBody = {
  email: string;
  password: string;
  name: string;
  userRole: UserRole;
};

export const backendSignup = ({
  email,
  password,
  name,
  userRole,
}: BackendSignupRequestBody) => {
  if (!email || !password || !name || !userRole) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  fetch(`${backendUrl}/signup`, {
    method: 'POST',
    body: JSON.stringify({
      password,
      email,
      name,
      role: userRole,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());

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

// export const signup = ({ email, password, role }) =>