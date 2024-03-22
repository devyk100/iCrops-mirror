import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export function saveToLocalStorage(params: any) {


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
