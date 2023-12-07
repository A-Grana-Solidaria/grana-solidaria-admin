/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
require("dotenv").config();

// export function fetchWithBody(url, method, content, token) {
//   return fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token && `Bearer ${token}`,
//     },
//     body: JSON.stringify(content),
//   });
// }

let API = axios.create({
  //baseURL: process.env.REACT_APP_API_BASE_ENDPOINT,ToDo
  baseURL:"http://localhost:3002/",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});



export default {
  updateAuthorization: (token) => {
    localStorage.setItem("token", token);

    API = axios.create({
      //baseURL: process.env.REACT_APP_API_BASE_ENDPOINT,ToDo
      baseURL:"http://localhost:3002/",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  },

  getToken: () => localStorage.getItem("token"),

  auth: (email, password) =>
    API.post("/login", {
      email,
      password,
    }),

  supporters: (offset) => API.get(`supporters?offset=${offset}`),

  dreamers: (offset) => API.get(`dreamers?offset=${offset}`),
  
  associates: (offset, id) => API.get(`associates/${id}?offset=${offset}`),

  getSupporter: (id) => API.get(`supporter/${id}`),

  attSupporter: (id, formData) => API.put(`supporter/${id}`, formData),

  getDreamer: (id) => API.get(`dream/${id}`),
  
  companies: (offset) => API.get(`companies?offset=${offset}`),

  getCompany: (id) => API.get(`company/${id}`),
  
  getAssociate: (id) => API.get(`associate/${id}`),

  attDreamer: (id, formData) => API.put(`dream/${id}`, formData),
  
  updateCompany: (id, formData) => API.put(`company/${id}`, formData),

  deleteUser: (id) => API.delete(`user/${id}`),

  deleteCompany: (id) => API.delete(`company/${id}`),

  export: () => API.get("export"),

};
