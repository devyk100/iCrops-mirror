import { createSlice } from "@reduxjs/toolkit"

const locationSlice = createSlice({
    name:"location",
    initialState: {
        latitude: null,
        longitude: null,
        accuracy: null,
        degreesToNorth: 0
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
        },
        setDegreesToNorth: (state, action) => {
            state.degreesToNorth = action.payload;
        }
    }
})

export const { setLatitude, setLongitude, clearLocation, setDegreesToNorth ,setLocation}  = locationSlice.actions 
export default locationSlice.reducer;
export const selectLocation = (state:any) => state.location;
export const selectDegreesToNorth = (state:any) => state.location.degreesToNorth;