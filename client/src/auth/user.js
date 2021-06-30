export const read = (userID, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = () => {
  return fetch(`${process.env.REACT_APP_API}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const remove = (userID, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (userID, token, form_data) => {
  console.log("USER DATA UPDATE: ", form_data);
  return fetch(`${process.env.REACT_APP_API}/user/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      //   "Content-Type": "application/json",
      //"Content-Type": 'multipart/form-data'
    },
    // body: JSON.stringify(user)
    body: form_data,
  })
    .then((response) => {
      console.log(form_data);

      return response.json();
    })
    .catch((err) => console.log(err));
};
