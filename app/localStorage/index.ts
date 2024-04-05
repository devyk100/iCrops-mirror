import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export function saveToLocalStorage(params: any) {

  if(!storage.contains('bottomIndex')){
    storage.set('bottomIndex', 1);
  }
  //counting the whole count of the data synced, it is updated to the latest
  if (!storage.contains('counter')) {
    storage.set('counter', 1);
  } else {
    let count = storage.getNumber('counter');
    if (count != undefined) {
      count++;
      storage.set('counter', count);
    }
  }



  // the format of storing the data is like this --> data.entry-(count)
  // it goes like this --> data.entry-1
  const finalParams = JSON.stringify(params);
  const count = storage.getNumber("counter");
  storage.set(`data.entry-${count}`, finalParams);

  //finally it is all set.
}

export function hell() {
  // storage.set('user.name', 'Marc')
  // storage.set('user.age', 21)
  // storage.set('is-mmkv-fast-asf', true)

  // const username = storage.getString('user.name') // 'Marc'
  // const age = storage.getNumber('user.age') // 21
  // const isMmkvFastAsf = storage.getBoolean('is-mmkv-fast-asf') // true

  // console.log(username, age, isMmkvFastAsf);

  // // checking if a specific key exists
  // const hasUsername = storage.contains('user.name')

  // getting all keys
  const keys = storage.getAllKeys(); // ['user.name', 'user.age', 'is-mmkv-fast-asf']

  // delete a specific key + value
  storage.delete('user.name');

  // delete all keys
  // storage.clearAll()

  console.log(keys);

  // const user = {
  //     username: 'Marc',
  //     age: 21
  // }

  // // Serialize the object into a JSON string
  // storage.set('user', JSON.stringify(user))

  // // Deserialize the JSON string into an object
  // const jsonUser = storage.getString('user') // { 'username': 'Marc', 'age': 21 }
  // // @ts-ignore
  // const userObject = JSON.parse(jsonUser)
  // console.log(userObject)
}


export function retrieveAllData(){
    let a = storage.getNumber('bottomIndex')
    let totalCount = storage.getNumber('counter')
    const dataObject: Object[] = [];
    if(a && totalCount){
      for(; a <= totalCount; a++){
          let dataString = storage.getString(`data.entry-${a}`);
          if(dataString){
            let data = JSON.parse(dataString);
            let newData = {
              ...data,
              
            }
            newData.CCE.sampleSize1 = data.CCE.sampleSize.x;
            newData.CCE.sampleSize2 = data.CCE.sampleSize.y;
            newData.CCE.sampleSize = null;
            let newImageList = data.images.filter((value:any) => (value != null))
            newData.images = newImageList;
            dataObject.push(newData);
          }
      }
    }
    return dataObject;
}


export function setBottomIndex(bottomIndex: number){
  // while a data entry is synced successfully, we need not change the counter, the counter is for the top one, and hence just the bottom needs to be changed.
  storage.delete(`data.entry-${bottomIndex-1}`)
  storage.set('bottomIndex', bottomIndex);
  // storage.set('count', count);
  return true;
}
export function getBottomIndexCount(){
  return storage.getNumber('bottomIndex');
}

export function setJwtEmail(jwt: string, email: string){
  storage.set('user.email', email)
  storage.set('user.jwt', jwt)
}

export function getJwt() {
  return storage.getString("user.jwt");
}