import { createSlice } from "@reduxjs/toolkit"

const locationSlice = createSlice({
    name:"location",
    initialState: {
        latitude: null,
        longitude: null,
        accuracy: null
    },
    reducers:{
        setLatitude: (state, action) => {
            state.latitude = action.payload;
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload
        },
        setLocation: (state, action) => {
            state.longitude = action.payload.longitude;
            state.latitude = action.payload.latitude;
            state.accuracy = action.payload.accuracy;
        },
        clearLocation: (state) => {
            state.longitude = null;
            state.latitude = null;
            state.accuracy = null;
        }
    }
})

export const { setLatitude, setLongitude, clearLocation, setLocation}  = locationSlice.actions 
export default locationSlice.reducer;
export const selectLocation = (state:any) => state.location;