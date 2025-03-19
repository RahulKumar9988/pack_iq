import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import constantReducer from "./features/constants/constantSlice";
import storage from "redux-persist/es/storage"; // localStorage as default
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Persist configuration
const persistConfig = {
  key: "root", // The key in localStorage
  storage: storage, // Defaults to localStorage
  whitelist: ["cart"], // Only persist the cart slice
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  constant: constantReducer,
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Create the store instance
const store = makeStore();

// Create the persistor instance
export const persistor = persistStore(store);

export default store;
