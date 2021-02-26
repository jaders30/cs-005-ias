import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import createAuthRefreshIntercetor from "axios-auth-refresh";
import { AuthContext } from "./AuthContext";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  createAuthRefreshIntercetor(authAxios, authContext.getNewTokenForRequest, {
    skipWhileRefreshing: false,
  });

  // authAxios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     const code = error && error.response ? error.response.status : 0;
  //     if (code === 401 || code === 403) {
  //       authContext.getNewToken();
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
