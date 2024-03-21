import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'dataform',
  initialState: {
    // latitude: null,
    // longitude: null,
    images: [null], //null for typescript to infer a string type
    distanceToCenter: null,
    landCoverType: null,
    cropInformation:{
      isCaptured:false,
      waterSource: null,
      cropIntensity: null,
      primaryCrop: null,
      secondaryCrop: null,
      liveStock: null,
      croppingPattern: null,
      remarks: null,
      additionalSeasons: [
        // {  --> Schema
        //  name: "Meher Season",
        //  crop: "PigeonPea" 
        // },
      ]
    },
    CCE:{
      isCaptured: false,
      sampleSize: null,
      grainWeight: null,
      biomassWeight: null,
      cultivar: null,
      sowDate: null,
      harvestDate: null
    }
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
    setWaterSource: (state, action) => {state.cropInformation.waterSource = action.payload},
    setCropIntensity: (state, action) => {state.cropInformation.cropIntensity = action.payload},
    setPrimaryCrop: (state, action) => {console.log("check");state.cropInformation.primaryCrop = action.payload;
    },
    setSecondaryCrop: (state, action) => {state.cropInformation.secondaryCrop = action.payload},
    setLiveStock: (state, action) => {state.cropInformation.liveStock = action.payload},
    setCroppingPattern: (state, action) => {state.cropInformation.croppingPattern = action.payload},
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

export const { setLandCoverType, setCroppingPattern, incrementByAmount, setWaterSource, setCropIntensity, setPrimaryCrop, setSecondaryCrop, setLiveStock, addImage, removeImage } = counterSlice.actions

export default counterSlice.reducer

export const selectLandCoverType = (state:any) => state.dataform.landCoverType;
export const selectWaterSourceType = (state:any) => state.dataform.cropInformation.waterSource;
export const selectImagesList = (state:any) => state.dataform.images;
export const selectPrimaryCrop = (state: any) => state.dataform.cropInformation.primaryCrop;