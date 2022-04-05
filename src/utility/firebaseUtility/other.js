// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';

// import env from '../../environment';

// export const initializeFirebaseApps = () => {
//   if (!firebase.apps.some((app) => app.name === '[DEFAULT]')) {
//     firebase.initializeApp(env.firebaseConfig);
//   }
//   if (!firebase.apps.some((app) => app.name === 'Secondary')) {
//     firebase.initializeApp(env.firebaseConfig, 'Secondary');
//   }
// };

// export const uploadImage = (uri) => {
//   const imgId = uuidv4();
//   return fetch(uri)
//     .then((res) => res.blob())
//     .then((blob) => {
//       const ref = firebase.storage().ref().child(`restaurantImages/${imgId}`);
//       return ref.put(blob);
//     })
//     .then(() =>
//       firebase
//         .storage()
//         .ref()
//         .child(`restaurantImages/${imgId}`)
//         .getDownloadURL()
//     );
// };
