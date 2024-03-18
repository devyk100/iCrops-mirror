import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'dataform',
  initialState: {
    // latitude: null,
    // longitude: null,
    images: ["null"], //null for typescript to infer a string type
    distanceToCenter: null,
    landCoverType: null,
    waterSource: null,
    cropIntensity: null,
    primaryCrop: null,
    secondaryCrop: null,
    liveStock: null
  },
  reducers: {
    // setLatitute: (state, action) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.latitude = action.payload;
    // },
    // setLongitude: (state, action) => {
    //   state.longitude = action.payload;
    // },
    incrementByAmount: (state, action) => {
    //   state. += action.payload
    },
    setLandCoverType: (state, action) => {
        state.landCoverType = action.payload;
    },
    setWaterSource: (state, action) => {state.waterSource = action.payload},
    setCropIntensity: (state, action) => {state.cropIntensity = action.payload},
    setPrimaryCrop: (state, action) => {state.primaryCrop = action.payload},
    setSecondaryCrop: (state, action) => {state.secondaryCrop = action.payload},
    setLiveStock: (state, action) => {state.liveStock = action.payload},
    //images section
    addImage: (state, action) => {
        state.images.push(action.payload);
    },
    removeImage: (state, action) => {
        state.images = state.images.filter((value) => {
            if(value == action.payload) return;
            return true
        })
    }
  }
})

export const { setLandCoverType, incrementByAmount, setWaterSource, setCropIntensity, setPrimaryCrop, setSecondaryCrop, setLiveStock, addImage, removeImage } = counterSlice.actions

export default counterSlice.reducer

export const selectLandCoverType = (state:any) => state.dataform.landCoverType;
export const selectWaterSourceType = (state:any) => state.dataform.waterSource;
export const selectImagesList = (state:any) => state.dataform.images;