import { ActionSheetIOS, Alert } from 'react-native';
import { USER_ROLE } from '../constants';
import { deleteReview, deleteReviewReply } from './firebaseUtility';

const reviewActionSheet = ({
  restaurantId,
  reviewId,
  edit,
  reply,
  options,
}) => {
  ActionSheetIOS.showActionSheetWithOptions(options, (buttonIndex) => {
    if (buttonIndex === options.options.findIndex((opt) => opt === 'Edit')) {
      edit();
    } else if (
      buttonIndex === options.options.findIndex((opt) => opt === 'Reply')
    ) {
      reply();
    } else if (buttonIndex === options.destructiveButtonIndex) {
      Alert.alert(
        'Delete review',
        `Are you sure you want to delete this review?`,
        [
          {
            text: 'Delete review',
            onPress: () => deleteReview({ restaurantId, reviewId }),
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    }
  });
};
const optionsArr = [
  {
    cancelButtonIndex: 0,
    options: ['Cancel', 'Reply'],
  },
  {
    destructiveButtonIndex: 2,
    cancelButtonIndex: 0,
    options: ['Cancel', 'Edit', 'Delete'],
  },
  {
    destructiveButtonIndex: 3,
    cancelButtonIndex: 0,
    options: ['Cancel', 'Edit', 'Reply', 'Delete'],
  },
];
export const reviewActionSheetWrapper = ({
  restaurantId,
  reviewId,
  edit,
  reply,
  isCommentReplied,
  userData,
  creatorId,
}) => {
  const aux = (opt) =>
    reviewActionSheet({
      restaurantId,
      reviewId,
      edit,
      reply,
      options: opt,
    });
  if (userData.role === USER_ROLE.REGULAR) {
    if (creatorId !== userData.userUid) return;
    aux(optionsArr[1]);
    return;
  }
  if (userData.role === USER_ROLE.RESTAURANT_OWNER) {
    if (isCommentReplied) return;
    aux(optionsArr[0]);
    return;
  }
  if (userData.role === USER_ROLE.ADMIN) {
    if (isCommentReplied) {
      aux(optionsArr[1]);
      return;
    }
    aux(optionsArr[2]);
  }
};

const replyActionSheet = ({ restaurantId, reviewId, edit }) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Cancel', 'Edit', 'Delete'],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        edit();
      }
      if (buttonIndex === 2) {
        Alert.alert(
          'Delete review reply',
          `Are you sure you want to delete this review reply?`,
          [
            {
              text: 'Delete review reply',
              onPress: () => deleteReviewReply({ restaurantId, reviewId }),
              style: 'destructive',
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );
      }
    }
  );
};

export const replyActionSheetWrapper = ({
  restaurantId,
  reviewId,
  edit,
  userData,
  replierId,
}) => {
  if (
    userData.role === USER_ROLE.ADMIN ||
    (userData.role === USER_ROLE.RESTAURANT_OWNER &&
      replierId === userData.userUid)
  )
    replyActionSheet({
      restaurantId,
      reviewId,
      edit,
    });
};

export const adminChangeOwnRole = ({ updateDone }) =>
  Alert.alert(
    'You are changing your user role',
    'This action is irreversible, are you sure?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: updateDone,
      },
    ]
  );
export const adminChangeOtherRole = ({ updateDone }) =>
  Alert.alert("You are changing another user's role", 'Are you sure?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: updateDone,
    },
  ]);

export const editInfoActionSheet = ({ onEdit, onCancel }) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Cancel', 'Edit'],
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        onCancel();
      }
      if (buttonIndex === 1) {
        onEdit();
      }
    }
  );
};

export const handleAlerts = (error) => {
  const codes = [
    'auth/invalid-email',
    'auth/wrong-password',
    'auth/user-not-found',
    'auth/email-already-in-use',
  ];
  if (codes.includes(error.code)) {
    Alert.alert(error.message);
    return;
  }
  if (error.code === 'auth/network-request-failed') {
    Alert.alert('Internet connection failed');
    return;
  }
  console.error(error.code);
};

export const deleteRestaurantAlert = ({ restaurantName, onDelete }) =>
  Alert.alert(
    'Delete restaurant',
    `Are you sure you want to delete ${restaurantName} restaurant?`,
    [
      {
        text: 'Delete Restaurant',
        onPress: onDelete,
        style: 'destructive',
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]
  );

export const deleteUserAlert = ({ userName, onDelete }) =>
  Alert.alert(
    'Delete user',
    `Are you sure you want to delete ${userName} user?`,
    [
      {
        text: 'Delete user',
        onPress: onDelete,
        style: 'destructive',
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]
  );

export const resetToMainScreen = (role) => {
  if (role === USER_ROLE.RESTAURANT_OWNER) {
    return 'RestaurantOwnerScreen';
  }
  if (role === USER_ROLE.ADMIN) {
    return 'AdminScreen';
  }
  return 'RestaurantFeed';
};
