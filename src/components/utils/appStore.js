import cartSlice from "./cartSlice";

const { configureStore } = require("@reduxjs/toolkit");
const appStore = configureStore({
  //reducer containing all the slices
  reducer: {
    cart: cartSlice, // cart is the name of slice
  },
});
export default appStore;
