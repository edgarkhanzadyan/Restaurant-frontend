const backendUrl = `http://localhost:3000`;

export const deleteUserBackend = ({ userUid }) =>
  fetch(`${backendUrl}/delete-user`, {
    method: 'POST',
    body: JSON.stringify({
      userUid,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());

export const updateUserEmailBackend = ({ userUid, email }) =>
  fetch(`${backendUrl}/update-user-email`, {
    method: 'POST',
    body: JSON.stringify({
      userUid,
      email,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());

export const updateUserPasswordBackend = ({ userUid, password }) =>
  fetch(`${backendUrl}/update-user-password`, {
    method: 'POST',
    body: JSON.stringify({
      userUid,
      password,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());

export const getUserBackend = ({ userUid }) =>
  fetch(`${backendUrl}/get-user?userUid=${userUid}`).then((res) => res.json());
