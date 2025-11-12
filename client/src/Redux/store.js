// import { configureStore } from '@reduxjs/toolkit'
// import orebiReducer from "./ShopSlice.js"
// import { 
//          persistStore,
//          persistReducer,
//          FLUSH,
//          REHYDRATE,
//          PAUSE,
//          PERSIST,
//          PURGE,
//          REGISTER

//        } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, orebiReducer)


// export const store = configureStore({
//   reducer: {
//     orebi: persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: {
//       ignoreActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
//     }
//   })
// })


// export let persistor = persistStore(store)

import { configureStore } from "@reduxjs/toolkit";
import orebiReducer from "./ShopSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["products"], // persist only cart
};

const persistedReducer = persistReducer(persistConfig, orebiReducer);

export const store = configureStore({
  reducer: { orebi: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
