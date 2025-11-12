import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  products: [], // we persist this
  orderCount: 0,
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(i => i._id === action.payload._id);
      if (item) {
        item.quantity = (item.quantity || 0) + (action.payload.quantity || 1);
      } else {
        state.products.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(i => i._id === action.payload);
      if (item) item.quantity = (item.quantity || 0) + 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(i => i._id === action.payload);
      if (item) item.quantity = Math.max((item.quantity || 1) - 1, 1);
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(i => i._id !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
      state.products = []; // clear cart on logout if needed
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  addUser,
  removeUser,
} = orebiSlice.actions;

export default orebiSlice.reducer;
