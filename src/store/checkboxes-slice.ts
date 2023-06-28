import { createSlice } from "@reduxjs/toolkit";
import { ICheckboxesSliceState } from "../types";

const initialState: ICheckboxesSliceState = {
  allTransfersChecked: true,
  zeroTransfersChecked: true,
  oneTransferChecked: true,
  twoTransfersChecked: true,
  threeTransfersChecked: true,
};

const checkboxesSlice = createSlice({
  name: "checkboxes",
  initialState,
  reducers: {
    toggleTransfers: (state, action) => {
      switch (action.payload.checked) {
        case 1:
          state.zeroTransfersChecked = !state.zeroTransfersChecked;
          break;
        case 2:
          state.oneTransferChecked = !state.oneTransferChecked;
          break;
        case 3:
          state.twoTransfersChecked = !state.twoTransfersChecked;
          break;
        case 4:
          state.threeTransfersChecked = !state.threeTransfersChecked;
          break;
      }
      const allChecked = action.payload.all;
      if (allChecked) state.allTransfersChecked = true;
      else state.allTransfersChecked = false;
    },
    toggleAllTransfers: (state) => {
      const allTransfersStatus = !state.allTransfersChecked;
      state.allTransfersChecked = allTransfersStatus;
      state.zeroTransfersChecked = allTransfersStatus;
      state.oneTransferChecked = allTransfersStatus;
      state.twoTransfersChecked = allTransfersStatus;
      state.threeTransfersChecked = allTransfersStatus;
    },
  },
});

export const { toggleTransfers, toggleAllTransfers } = checkboxesSlice.actions;

export default checkboxesSlice.reducer;
