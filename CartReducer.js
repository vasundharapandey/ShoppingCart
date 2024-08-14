import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    cart: [],
  };
export const cartSlice = createSlice({
    name:"cart",
  initialState,
    reducers:{
        setProducts: (state, action) => {
            state.products = action.payload;
          },
          addToCart: (state, action) => {
            const product = state.cart.find(p => p.id === action.payload.id);
            if (product) {
              product.quantity += 1;
            } else {
              state.cart.push({ ...action.payload, quantity: 1 });
            }
          },
          removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
          },
          
        incrementQuantity: (state, action) => {
            const product = state.cart.find(p => p.id === action.payload);
            if (product) {
              product.quantity += 1;
            }
          },
          decrementQuantity: (state, action) => {
            const product = state.cart.find(p => p.id === action.payload);
            if (product && product.quantity > 1) {
              product.quantity -= 1;
            } else {
              state.cart = state.cart.filter(p => p.id !== action.payload);
            }
    }
}
});


export const {setProducts,addToCart,removeFromCart,incrementQuantity,decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;