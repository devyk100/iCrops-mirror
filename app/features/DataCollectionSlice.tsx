import {PayloadAction, createSlice} from '@reduxjs/toolkit';


const initialState = {
  // latitude: null,
  // longitude: null,
  latitude: null,
  longitutde: null,
  accuracyCorrection: null,
  bearingToCenter: null,
  distanceToCenter: null,
  landCoverType: null,
  cropInformation: {
    isCaptured: false,
    waterSource: null,
    cropIntensity: null,
    primaryCrop: null,
    secondaryCrop: null,
    liveStock: null,
    croppingPattern: null,
    remarks: null,
    additionalSeasons: [
      {
        name: null,
        crop: null,
      },
    ],
  },
  CCE: {
    isCaptured: false,
    sampleSize: null,
    grainWeight: null,
    biomassWeight: null,
    cultivar: null,
    sowDate: null,
    harvestDate: null,
  },
  images: [null], //null for typescript to infer a string type
  locationDesc: null,
}
export const counterSlice = createSlice({
  name: 'dataform',
  initialState: initialState,
  reducers: {
    setLocationData: function (state, action) {
      state.latitude = action.payload.latitude;
      state.longitutde = action.payload.longitude;
      state.accuracyCorrection = action.payload.accuracy;
    },
    setBearingToCenterData: function (state, action) {
      state.bearingToCenter = action.payload;
    },
    setDistanceToCenterData: (state, action) => {
      state.distanceToCenter = action.payload;
    },

    setLandCoverType: (state, action) => {
      state.landCoverType = action.payload;
    },
    setWaterSource: (state, action) => {
      state.cropInformation.waterSource = action.payload;
    },
    setCropIntensity: (state, action) => {
      state.cropInformation.cropIntensity = action.payload;
    },
    setPrimaryCrop: (state, action) => {
      console.log('check');
      state.cropInformation.primaryCrop = action.payload;
    },
    setSecondaryCrop: (state, action) => {
      state.cropInformation.secondaryCrop = action.payload;
    },
    addSeason: (state, action) => {
      state.cropInformation.additionalSeasons.push({
        name: action.payload,
        crop: null,
      });
    },
    deleteSeason: (state, action) => {
      state.cropInformation.additionalSeasons.splice(action.payload, 1);
    },
    setLiveStock: (state, action) => {
      state.cropInformation.liveStock = action.payload;
    },
    setCroppingPattern: (state, action) => {
      state.cropInformation.croppingPattern = action.payload;
    },
    setIsCapturedCCE: (state, action) => {
      state.CCE.isCaptured = action.payload;
    },
    //images section
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(value => {
        if (value == action.payload) return;
        return true;
      });
    },
    resetState: state => initialState,

  },
});

export const {
  setLandCoverType,
  setCroppingPattern,
  setWaterSource,
  setCropIntensity,
  setPrimaryCrop,
  setSecondaryCrop,
  setBearingToCenterData,
  setDistanceToCenterData,
  setLiveStock,
  addImage,
  setLocationData,
  removeImage,
  deleteSeason,
  setIsCapturedCCE,
  addSeason,
  resetState
} = counterSlice.actions;

export default counterSlice.reducer;

export const selectLandCoverType = (state: any) => state.dataform.landCoverType;
export const selectWaterSourceType = (state: any) =>
  state.dataform.cropInformation.waterSource;
export const selectImagesList = (state: any) => state.dataform.images;
export const selectPrimaryCrop = (state: any) =>
  state.dataform.cropInformation.primaryCrop;
export const selectAdditionalSeasons = (state:any) => state.dataform.cropInformation.additionalSeasons;
export const selectDataCollection = (state:any) => state.dataform