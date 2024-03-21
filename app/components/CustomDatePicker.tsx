import { useState } from "react";
import { Button, Text } from "react-native";
import DatePicker from "react-native-date-picker";

export default function({date, setDate}: {
    date: Date;
    setDate: (date: Date) => void;
}){
    const [open, setOpen] = useState(false);
    // const [date, setDate] = useState(new Date());
    return (
        <>
                <Text style={{
          backgroundColor:"#cefac0",
          borderRadius:14,
          color:"black",
          fontSize:18,
          marginHorizontal:5,
          padding:6
        }}>
          {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} `}
        </Text>
        <Button title='pick date' onPress={() => setOpen(true)}>
        </Button>
        <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          console.log(date)
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        </>
    )
}