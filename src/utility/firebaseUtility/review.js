import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { FieldsAreEmpty } from './helpers';

const dummyReviewData = [
  {
    score: 5,
    comment: 'reviewComment',
    dateTimestamp: +new Date(),
    dateOfCreation: +new Date(),
    creatorId: 'creatorId',
  },
  {
    score: 5,
    comment: 'reviewComment',
    dateTimestamp: +new Date(),
    dateOfCreation: +new Date(),
    creatorId: 'creatorId',
  },
];

export const submitReview = ({
  restaurantId,
  reviewRating,
  reviewComment,
  reviewDate,
}) => {
  if (!reviewComment || !reviewRating) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({});
  // const creatorId = firebase.auth().currentUser.uid;
  // const listRef = firebase
  //   .database()
  //   .ref(`restaurants/${restaurantId}/reviews`);
  // const newRefToPush = listRef.push();
  // return newRefToPush.set({
  //   score: reviewRating,
  //   comment: reviewComment,
  //   dateTimestamp: +reviewDate,
  //   dateOfCreation: +new Date(),
  //   creatorId,
  // });
};

export const submitReply = ({ restaurantId, reviewId, replyComment }) => {
  if (!replyComment) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({});
  // return firebase
  //   .database()
  //   .ref(`restaurants/${restaurantId}/reviews/${reviewId}/reply`)
  //   .set({
  //     replierId: firebase.auth().currentUser.uid,
  //     comment: replyComment,
  //     id: uuidv4(),
  //   });
};

export const getPendingReviews = ({
  userUid,
  setPendingReviews,
  setIsLoading,
}) => Promise.resolve(dummyReviewData);
// firebase
//   .database()
//   .ref('restaurants')
//   .orderByChild('creatorUid')
//   .equalTo(userUid)
//   .on('value', async (snapshot) => {
//     if (snapshot) {
//       const data = snapshot.val();
//       if (data === null) {
//         setIsLoading(false);
//         setPendingReviews([]);
//       } else if (data) {
//         const restaurants = Object.values(data);
//         let reviewsPendingReply = restaurants.reduce((acc, curVal) => {
//           if (curVal.reviews) {
//             const arrData = Object.entries(curVal.reviews).map((entry) => ({
//               ...entry[1],
//               reviewId: entry[0],
//               restaurantId: curVal.id,
//               restaurantName: curVal.name,
//             }));
//             const reviewsPendingReplyInRestaurant = arrData.filter(
//               (rev) => !rev.reply
//             );
//             return acc.concat(reviewsPendingReplyInRestaurant);
//           }
//           return acc;
//         }, []);
//         reviewsPendingReply = await Promise.all(
//           reviewsPendingReply.map((rev) =>
//             firebase
//               .database()
//               .ref(`users/${rev.creatorId}/name`)
//               .once('value')
//               .then((userSnap) => {
//                 const userName = userSnap.val();
//                 return { ...rev, userName };
//               })
//           )
//         );
//         reviewsPendingReply.sort(
//           (a, b) => b.dateOfCreation - a.dateOfCreation
//         );
//         setIsLoading(false);
//         setPendingReviews(reviewsPendingReply);
//       }
//     }
//   });

export const deleteReview = ({ restaurantId, reviewId }) => Promise.resolve({});
// firebase
//   .database()
//   .ref(`restaurants/${restaurantId}/reviews/${reviewId}`)
//   .remove();

export const deleteReviewReply = ({ restaurantId, reviewId }) =>
  Promise.resolve({});
// firebase
//   .database()
//   .ref(`restaurants/${restaurantId}/reviews/${reviewId}/reply`)
//   .remove();

export const editReview = ({ restaurantId, reviewId, comment }) => {
  if (!comment) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({});
  // return firebase
  //   .database()
  //   .ref(`restaurants/${restaurantId}/reviews/${reviewId}`)
  //   .update({
  //     comment,
  //   });
};

export const editReviewReply = ({ restaurantId, reviewId, comment }) => {
  if (!comment) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return Promise.resolve({});
  // return firebase
  //   .database()
  //   .ref(`restaurants/${restaurantId}/reviews/${reviewId}/reply`)
  //   .update({
  //     comment,
  //   });
};
