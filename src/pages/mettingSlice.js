import { createSlice } from '@reduxjs/toolkit';

export const mettingSlice = createSlice({
    name: 'metting',
    initialState: {
      idMetting: {}
    },
    reducers: {
      detailMettingId: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      removeIdMetting: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
});

export const { detailMettingId, removeIdMetting } = mettingSlice.actions;
export const mettingDetails = (state) => state.metting;
export default mettingSlice.reducer;