import * as usersAPI from './users-api';

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    //Save the token to localStorage
    localStorage.setItem('token', token);
    return getUser();
  
}


export function logOut(){
  localStorage.removeItem('token');
}

export async function login(credentials){
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}


export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem('token');
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}
  
export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}


export async function checkToken() {
  const dateStr = await usersAPI.checkToken();
  return new Date(dateStr);
}
