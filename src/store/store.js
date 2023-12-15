import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const blogStore = configureStore({
    reducer: {
        auth : authReducer
    }
});

export default blogStore;