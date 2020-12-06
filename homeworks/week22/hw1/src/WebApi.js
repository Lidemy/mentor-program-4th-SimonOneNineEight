import { getTokenFromLocalStorage } from "./utilis";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getAllPost = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getPostById = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getTokenFromLocalStorage();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const register = (username, password, nickname) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const newPost = (title, body) => {
  const token = getTokenFromLocalStorage();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "content-type": "application/json",
      authorization: `${token}`,
    },
  }).then((res) => res.json());
};

export const getLimitedPosts = (page, limit) => {
  return fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`
  ).then((res) => res.json());
};
