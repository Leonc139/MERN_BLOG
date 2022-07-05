import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import homeReducer from "./homeReducer";
import createBlogReducer from "./createBlogReducer";

// menggabungkan kedua reducer menjadi satu
const reducer = combineReducers({ homeReducer, globalReducer, createBlogReducer });

export default reducer;
