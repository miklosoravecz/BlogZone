import cookie from "js-cookie";
const jwt = require("jsonwebtoken");

//set the cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
//remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
//get from cookie for example the stored token
//it will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

//set in local storage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
//remove from local storage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//logout

export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

/*
export const updateUser = (response, next) => {
  console.log('UPDATE USER IN LOCAL STORAGE HELPERS', response)
  if(typeof window !== 'undefined') {
      let auth = JSON.parse(localStorage.getItem('user'))
      auth = response.data
      localStorage.setItem('user', JSON.stringify(auth))
  }
  next();
}*/

export const updateUser = (user, next) => {
  console.log("UPDATE USER IN LOCAL STORAGE HELPERS", user);
  if (typeof window !== "undefined") {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));

      auth = user;
      console.log(auth);
      localStorage.setItem("user", JSON.stringify(auth));
    }
    next();
  }
};

export const tokenIsExpired = () => {
  var currentTime = Date.now() / 1000;
  //console.log("current time :",current_time)
  const token = getCookie().token;
  var decoded = jwt.decode(token);
  // console.log("decoded: ",decoded)
  var expired = decoded.exp;
  //console.log(expired)

  if (expired < currentTime) {
    return true;
  } else {
    return false;
  }
};
//getting login time and save to local storage
export const getTime = () => {
  //console.log("current time :",current_time)
  const token = getCookie().token;
  var decoded = jwt.decode(token);
  // console.log("decoded: ",decoded)
  //var time = decoded.iat;
  let time = new Date(parseInt(decoded.iat) * 1000);
  //let time2 = new Date(parseInt("1611761845") * 1000);
  const newLocalstorageItem = {
    loginTime: time,
  };
  console.log(time);
  //console.log(time2);
  localStorage.setItem("Last login ", JSON.stringify(newLocalstorageItem));
  //return time;
};
