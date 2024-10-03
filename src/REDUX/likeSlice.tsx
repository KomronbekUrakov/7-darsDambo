import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikeState {
  likedProducts: number[]; // Store product IDs of liked products
}

const initialState: LikeState = {
  likedProducts: [], // Initially, no products are liked
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.likedProducts.includes(productId)) {
        state.likedProducts = state.likedProducts.filter((id) => id !== productId);
      } else {
        state.likedProducts.push(productId);
      }
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
