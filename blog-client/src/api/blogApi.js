import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Endpoints
export const getPosts = async () => {
  return api.get("/posts");
};

export const getPostById = async (id) => {
  return api.get(`/posts/${id}`);
};

// Añadir nuevo post
export const createPost = async (postData) => {
  return api.post("/posts", postData);
};
