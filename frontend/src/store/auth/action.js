import axios from "../../util/api";
import { EMAIL_LOGIN, LOGOUT, REGISTER, REQUEST_ERROR } from "../../constants/type";

export const login = (email, password) => {
    return async (dispatch) => {
        return await axios
            .post("auth/login", { email, password })
            .then(({ data }) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                localStorage.setItem("token", data.access_token);
                return dispatch({
                    type: EMAIL_LOGIN,
                    payload: data,
                });
            })
            .catch((e) => {
                return dispatch({
                    type: REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const register = (userInfo) => {
    return async (dispatch) => {
        return await axios
            .post("auth/register", userInfo)
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                return dispatch({
                    type: REGISTER,
                    payload: data,
                });
            })
            .catch((e) => {
                return dispatch({
                    type: REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const signOut = () => {
    return async (dispatch) => {
        return await axios
            .post("auth/logout")
            .then(({ data }) => {
                localStorage.removeItem("token");
                localStorage.clear();
                delete axios.defaults.headers.common.Authorization;
                return dispatch({
                    type: LOGOUT,
                });
            })
            .catch((e) => {
            });
    };
};