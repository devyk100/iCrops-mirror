import React from 'react';
import axios, { AxiosResponse } from 'axios';
import {Dirs, FileSystem} from 'react-native-file-access';
import { getBottomIndexCount, getJwt, retrieveAllData, setBottomIndex } from '../localStorage';
import { Alert } from 'react-native';
// const response = await axios.post(
//   'http://10.0.2.2:3000/api/v1/sync',
//   {
//     fileData: fileData
//   }
// );
export const BACKEND_URL = "http://10.0.2.2:3001/";
const sendData = async (data: any) => {
  const jwt = getJwt();
  const response = await axios.post(
    BACKEND_URL+ 'api/v1/sync',
    {
      ...data,
      noOfImages: data.images.length
    }
    ,{
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  );
  return response;
}

const sendImage = async (fileName: string, dataId: number) => {
  const fileData = await FileSystem.readFile(fileName, 'base64');
  const jwt = getJwt();
  const response = await axios.post(
    BACKEND_URL + 'api/v1/sync/image',
    {
      fileData: fileData,
      dataId: dataId
    }
    ,{
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  )
  return response
}

const sendAnEntry = async (data: any) => {
  try{
    const response:AxiosResponse = await sendData(data);
    for(let a of data.images){
      sendImage(a, response.data.dataId);
    }
    return true;
  }
  catch(error){
    console.log(error)
    return false
  }
}

export const upload = async () => {
  // console.log(fileName);
  const dataArray = retrieveAllData()
  for(let a of dataArray){
    let success = await sendAnEntry(a);
    if(success){
      let bottomIndex = getBottomIndexCount();
      if(bottomIndex) setBottomIndex(bottomIndex + 1);
      else{
        console.log("bottom index error")
      }
    }
    else{
      Alert.alert("get a better internet connection, syncing failed")
      break;
    }
  }
  console.log('inside of the networking module');
};
