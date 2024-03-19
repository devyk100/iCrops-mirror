import { useEffect, useState } from "react";
import { Image, Platform } from "react-native";
import Marker, { ImageFormat, Position, TextBackgroundType } from "react-native-image-marker"
const options = {
  // background image
  backgroundImage: {
    src: {uri: 'file:///data/user/0/com.icrops/cache/rn_image_picker_lib_temp_9c47e49d-0be9-4141-8a80-1ed2bbf901b3.jpg'},
    scale: 1,
  },
  watermarkTexts: [{
    text: 'text marker \n multiline text',
    position: {
      position: Position.topLeft,
    },
    style: {
      color: '#ff00ff',
      fontSize: 30,
      fontName: 'Arial',
      shadowStyle: {
        dx: 10,
        dy: 10,
        radius: 10,
        color: '#008F6D',
      },
      textBackgroundStyle: {
        padding: '10% 10%',
        type: TextBackgroundType.none,
        color: '#0FFF00',
      },
    },
  }],
  scale: 1,
  quality: 100,
  filename: 'test',
  saveFormat: ImageFormat.png,
};
export default function (){
    const [imageUri, setImageUri] = useState("file:///data/user/0/com.icrops/cache/rn_image_picker_lib_temp_9c47e49d-0be9-4141-8a80-1ed2bbf901b3.jpg");
    async function hell(){
        const path =  await (Marker.markText(options));
        const resUri = 'file:' + path

        console.log(resUri);
        setImageUri(resUri);
    }
    useEffect(() => {
        hell()

    }, [])
    if(imageUri) return (
        <>
                <Image
                  source={{uri: imageUri}}
                  style={{
                    width: 150, // Adjust width as needed
                    height: 150, // Adjust height as needed
                    resizeMode: 'contain', // You can adjust resizeMode as per your requirement
                    marginRight: 5,
                  }}></Image>
        </>
    )
}