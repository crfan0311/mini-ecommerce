import { EMAIL_LOGIN, LOGOUT, REGISTER } from "../../constants/type";

const user = localStorage.getItem("user") || null;
const initialState = {
    user: user ? JSON.parse(user) : null,
    token: localStorage.getItem("token"),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EMAIL_LOGIN:
        case REGISTER: {
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return {
                ...state,
                token: action.payload.access_token,
                user: action.payload.user,
            };
        }
        case LOGOUT: {
            return { ...state, user: null, token: null };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as authReducer };
