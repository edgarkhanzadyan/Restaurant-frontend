import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { FieldsAreEmpty } from './helpers';

const dummyRestaurantData = [
  {
    id: uuidv4(),
    name: 'restaurantName',
    description: 'restaurantDescription',
    location: 'address',
    reviews: [],
    creatorUid: 'currentUser.uid',
    image: 'imgUrl',
  },
  {
    id: uuidv4(),
    name: 'restaurantName',
    description: 'restaurantDescription',
    location: 'address',
    reviews: [],
    creatorUid: 'currentUser.uid',
    image: 'imgUrl',
  },
];

export const createRestaurant = ({
  restaurantName,
  restaurantDescription,
  address,
  imgUrl,
}) => {
  if (!restaurantName || !restaurantDescription || !address || !imgUrl) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  const newRestaurant = {
    id: uuidv4(),
    name: 'restaurantName',
    description: 'restaurantDescription',
    location: 'address',
    reviews: [],
    creatorUid: 'currentUser.uid',
    image: 'imgUrl',
  };
  dummyRestaurantData.push(newRestaurant);
  return newRestaurant;
};

export const updateRestaurantData = ({
  restaurantName,
  restaurantDescription,
  restaurantLocation,
  imgUrl,
  restaurantId,
}) => {
  if (
    !restaurantName ||
    !restaurantDescription ||
    !restaurantLocation ||
    !imgUrl
  ) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({
    name: 'restaurantName',
    description: 'restaurantDescription',
    location: 'restaurantLocation',
    image: 'imgUrl',
  });
  // return firebase.database().ref(`restaurants/${restaurantId}`).update({
  //   name: restaurantName,
  //   description: restaurantDescription,
  //   location: restaurantLocation,
  //   image: imgUrl,
  // });
};

export const getRestaurantInfo = ({ restaurantId, setRestaurantInfo }) => {
  setRestaurantInfo({
    id: uuidv4(),
    name: 'restaurantName',
    description: 'restaurantDescription',
    location: 'address',
    reviews: [],
    creatorUid: 'currentUser.uid',
    image: 'imgUrl',
  });
  return Promise.resolve({});
};
// firebase
//   .database()
//   .ref(`restaurants/${restaurantId}`)
//   .on('value', async (snapshot) => {
//     if (snapshot) {
//       const data = snapshot.val();
//       if (data) {
//         if (data.reviews) {
//           let arrData = Object.entries(data.reviews).map((entry) => ({
//             ...entry[1],
//             id: entry[0],
//           }));
//           arrData = await Promise.all(
//             arrData.map((rev) =>
//               firebase
//                 .database()
//                 .ref(`users/${rev.creatorId}/name`)
//                 .once('value')
//                 .then((userSnap) => {
//                   const userName = userSnap.val();
//                   return { ...rev, userName };
//                 })
//             )
//           );
//           arrData = await Promise.all(
//             arrData.map((rev) => {
//               if (!rev.reply) {
//                 return rev;
//               }
//               return firebase
//                 .database()
//                 .ref(`users/${rev.reply.replierId}/name`)
//                 .once('value')
//                 .then((userSnap) => {
//                   const userName = userSnap.val();
//                   return { ...rev, reply: { ...rev.reply, userName } };
//                 });
//             })
//           );
//           // sort reviews by date of creation, then put highest rated first
//           // lowest rated second.
//           arrData = arrData.sort(
//             (a, b) => a.dateOfCreation - b.dateOfCreation
//           );
//           const swap = (idx1, idx2) => {
//             const tmp = arrData[idx1];
//             arrData[idx1] = arrData[idx2];
//             arrData[idx2] = tmp;
//           };
//           const maxScoreReviewIdx = arrData.reduce((acc, curVal, idx) => {
//             if (curVal.score > arrData[acc].score) {
//               return idx;
//             }
//             return acc;
//           }, 0);
//           swap(maxScoreReviewIdx, 0);
//           if (arrData.length > 2) {
//             const minScoreReviewIdx = arrData.reduce((acc, curVal, idx) => {
//               if (curVal.score < arrData[acc].score) {
//                 return idx;
//               }
//               return acc;
//             }, 0);
//             swap(minScoreReviewIdx, 1);
//           }
//           data.reviews = arrData;

//           // Add average score to the restaurantInfo
//           const averageScore =
//             arrData.reduce((acc, curVal) => acc + curVal.score, 0) /
//             arrData.length;
//           data.averageScore = averageScore;
//         }
//         setRestaurantInfo(data);
//       }
//     }
//   });

export const deleteRestaurant = ({ restaurantId }) => Promise.resolve({}); // firebase.database().ref(`restaurants/${restaurantId}`).remove();

// const addAverageScoreToData = (data) => {
//   let arr = Object.values(data).map((rest) => {
//     if (rest.reviews) {
//       const reviewsArr = Object.values(rest.reviews);
//       const averageScore =
//         reviewsArr.reduce((acc, curVal) => acc + curVal.score, 0) /
//         reviewsArr.length;
//       return { ...rest, averageScore };
//     }
//     return rest;
//   });
//   arr = arr.sort((a, b) => {
//     if (!a.averageScore) return 1;
//     if (!b.averageScore) return -1;
//     return b.averageScore - a.averageScore;
//   });
//   return arr;
// };

export const getRestaurantData = ({ setRestaurantData, setIsLoading }) => {
  setIsLoading(true);
  setRestaurantData(dummyRestaurantData);
  setIsLoading(false);
  return Promise.resolve({});
};

// firebase
//   .database()
//   .ref('restaurants')
//   .on('value', (snapshot) => {
//     if (snapshot) {
//       const data = snapshot.val();
//       setIsLoading(false);
//       if (data === null) {
//         setRestaurantData([]);
//       } else if (data) {
//         const arr = addAverageScoreToData(data);
//         setRestaurantData(arr);
//       }
//     }
//   });

export const getRestaurantDataFilteredByOwner = ({
  setRestaurantData,
  setIsLoading,
  userUid,
}) =>
  Promise.resolve(() => {
    setIsLoading(true);
    setRestaurantData(dummyRestaurantData[0]);
    setIsLoading(false);
  });
// firebase
//   .database()
//   .ref('restaurants')
//   .orderByChild('creatorUid')
//   .equalTo(userUid)
//   .on('value', (snapshot) => {
//     if (snapshot) {
//       const data = snapshot.val();
//       setIsLoading(false);
//       if (data === null) {
//         setRestaurantData([]);
//       } else if (data) {
//         const arr = addAverageScoreToData(data);
//         setRestaurantData(arr);
//       }
//     }
//   });
