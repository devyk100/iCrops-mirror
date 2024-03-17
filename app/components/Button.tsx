import { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";
// import {  } from "react-native-reanimated/lib/typescript/Animated";

export default function({children, handler}: {
    children: ReactNode,
    handler?: () => void
}){
    return (
        <>
        <TouchableOpacity style={{
            backgroundColor:"#d4d4d4",
            flex:1,
            padding:10,
            margin:20,
            marginTop: 0
        }} onPress={handler}>
            <Text style={{
                color: "black",
                textAlign:"center"
            }}>{children}</Text>
        </TouchableOpacity>
        </>
    )
}