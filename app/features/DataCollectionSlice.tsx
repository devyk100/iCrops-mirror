import {PayloadAction, createSlice} from '@reduxjs/toolkit';


const initialState = {
  // latitude: null,
  // longitude: null,
  capturedFromMaps: false,
  latitude: null,
  longitude: null,
  accuracyCorrection: null,
  bearingToCenter: null,
  distanceToCenter: null,
  landCoverType: null,
  cropInformation: {
    isCaptured: false,
    waterSource: null,
    cropIntensity: null,
    primarySeason: {
      seasonName: null,
      cropName: null
    },
    secondarySeason: {
      seasonName: null,
      cropName: null
    },
    liveStock: null,
    croppingPattern: null,
    cropGrowthStage: null,
    remarks: null
  },
  CCE: {
    isCaptured: false,
    isGoingToBeCaptured:false,
    sampleSize: {
      x: null,
      y: null
    },
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
    setCapturedFromMap: (state, action) => {
      state.capturedFromMaps = action.payload;
      console.log(action);
      
    },
    setLocationData: function (state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
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
    setPrimarySeason: (state, action) => {
      state.cropInformation.primarySeason.seasonName = action.payload;
    },
    setSecondarySeason: (state, action) => {
      state.cropInformation.secondarySeason.seasonName = action.payload;
    },
    setPrimaryCrop: (state, action) => {
      console.log('check');
      state.cropInformation.primarySeason.cropName = action.payload;
    },
    setSecondaryCrop: (state, action) => {
      console.log(action)
      state.cropInformation.secondarySeason.cropName = action.payload;
    },
    // deleteSeason: (state, action) => {
    //   state.cropInformation.additionalSeasons.splice(action.payload, 1);
    // },
    setLiveStock: (state, action) => {
      state.cropInformation.liveStock = action.payload;
    },
    setCroppingPattern: (state, action) => {
      state.cropInformation.croppingPattern = action.payload;
    },
    setIsCapturedCCE: (state, action) => {
      state.CCE.isGoingToBeCaptured = action.payload;
    },
    setXSampleSize: (state, action) => {
      console.log(action.payload)
      state.CCE.sampleSize.x = action.payload
    },
    setYSampleSize: (state, action) => {
      state.CCE.sampleSize.y = action.payload
    },
    setGrainWeight: (state, action) => {
      state.CCE.grainWeight = action.payload;
    },
    setBiomassWeight: (state, action) => {
      state.CCE.biomassWeight = action.payload;
    },
    setLocationDescription: (state, action) => {
      state.locationDesc = action.payload
    },
    setCropRemarks: (state, action) => {
      state.cropInformation.remarks = action.payload
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
    setCCECaptured: (state, action) => {
      console.log(action.payload)
      state.CCE.isCaptured = action.payload
    },
    setCCESowDate: (state, action) => {
      console.log("yep")
      state.CCE.sowDate = action.payload
    },
    setCCEHarvestDate: (state, action) => {
      state.CCE.harvestDate = action.payload
    },
    setCultivar: (state, action) => {
      state.CCE.cultivar = action.payload;
    },
    setCropGrowthStage: (state, action) => {
      state.cropInformation.cropGrowthStage = action.payload;
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
  setXSampleSize,
  setYSampleSize,
  setLiveStock,
  addImage,
  setLocationData,
  removeImage,
  setPrimarySeason,
  setSecondarySeason,
  setIsCapturedCCE,
  setCCESowDate,
  setCCEHarvestDate,
  resetState,
  setCropGrowthStage,
  setGrainWeight,
  setCCECaptured,
  setCapturedFromMap,
  setBiomassWeight,
  setCropRemarks,
  setLocationDescription,
  setCultivar
} = counterSlice.actions;

export default counterSlice.reducer;

export const selectCapturedFromMap = (state: any) => state.dataform.capturedFromMaps;
export const selectLandCoverType = (state: any) => state.dataform.landCoverType;
export const selectWaterSourceType = (state: any) =>
  state.dataform.cropInformation.waterSource;
export const selectImagesList = (state: any) => state.dataform.images;
export const selectAdditionalSeasons = (state:any) => state.dataform.cropInformation.additionalSeasons;
export const selectDataCollection = (state:any) => state.dataform
export const selectCCEData = (state:any) => state.dataform.CCE;
export const selectPrimaryCrop = (state: any) => state.dataform.cropInformation.primarySeason.cropName;
export const selectSecondaryCrop = (state: any) => state.dataform.cropInformation.secondarySeason.cropName;
export const selectIsCCECaptured = (state: any) => state.dataform.CCE.isCaptured
export const selectIsCCEGoingToBeCaptured = (state: any) => state.dataform.CCE.isGoingToBeCaptured
export const selectBearingToCenter = (state: any) => state.dataform.bearingToCenter
export const selectDistanceToCenter = (state: any) => state.dataform.distanceToCenter
export const selectCropGrowthStage = (state: any) => state.dataform.cropInformation.cropGrowthStage