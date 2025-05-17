import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export const listUsers = () => {
  return axios.get(REST_API_BASE_URL);
};

export const createUser = (user) => axios.post(REST_API_BASE_URL, user);
export const getUser = (userId) => axios.get(REST_API_BASE_URL + "/" + userId);
export const updateUser = (userId, user) =>
  axios.put(REST_API_BASE_URL + "/" + userId, user);
// export const deleteUser = (userId) => axios.delete(REST_API_BASE_URL + '/' + userId);

export const getComment = (userId) =>
  axios.get(REST_API_BASE_URL + "/comments" + userId);
export const getReview = (userId) =>
  axios.get(REST_API_BASE_URL + "/reviews" + userId);
export const getWatchlist = (userId) =>
  axios.get(REST_API_BASE_URL + "/watchlists" + userId);

export const getAverageUserStats = () =>
  axios.get(REST_API_BASE_URL + "/averageuser");
export const getCurrentUserStats = (userId) =>
  axios.get(REST_API_BASE_URL + "/currentuser" + userId);

export const getCurrentUserAllReviews = (userId) =>
  axios.get(REST_API_BASE_URL + "/currentuser/allreviews" + userId);
export const getCurrentUserAllComments = (userId) =>
  axios.get(REST_API_BASE_URL + "/currentuser/allcomments" + userId);
export const getCurrentUserAllWatchlists = (userId) =>
  axios.get(REST_API_BASE_URL + "/currentuser/allwatchllists" + userId);

export const getCurrentUserReviewsWeekly = (userId) =>
  axios.get(REST_API_BASE_URL + "/currentuser/reviews-weekly" + userId);
export const getCurrentUserCommentsWeekly = (userId) =>
  axios.get(REST_API_BASE_URL + "/currentuser/comments-weekly" + userId);
export const getCurrentUserWatchlistsWeekly = (userId) =>
  axios.get(REST_API_BASE_URL + "/currentuser/watchlists-weekly" + userId);

// http://localhost:8080/api/users/comments/userId
// http://localhost:8080/api/users/reviews/userId
// http://localhost:8080/api/users/watchlists/userId

// http://localhost:8080/api/users/averageuser
// http://localhost:8080/api/users//currentuser/userId

// http://localhost:8080/api/users/currentuser/allreviews/userId
// http://localhost:8080/api/users/currentuser/allcomments/userId
// http://localhost:8080/api/users/currentuser/allwatchlists/userId

// http://localhost:8080/api/users/currentuser/reviews-weekly/userId
// http://localhost:8080/api/users/currentuser/comments-weekly/userId
// http://localhost:8080/api/users/currentuser/watchlists-weekly/userId
