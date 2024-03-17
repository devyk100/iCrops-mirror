import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type dataItem = {
    value: number,
    title: string;
}

export default function MyComponent({title, data}: {
    title: string;
    data: dataItem[]
}) {
  const [isVisible, setIsVisible] = useState(false);
  const height = useSharedValue(0);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
    height.value = withSpring(isVisible ? 0 : 100, {
      damping: 10,
      stiffness: 100,
    }); // Adjust damping and stiffness for desired animation
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: height.value,
      overflow: 'hidden',
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: '#888484',
          width: '90%',
          padding: 10,
          //   margin:10e
        }}
        onPress={toggleVisibility}>
        <Text
        // @ts-ignore
          style={{
            fontWeight: 700,
          }}>
          {title}
        </Text>
      </TouchableOpacity>

      <Animated.View style={[styles.content, animatedStyle]}>
        <View>
          {data.map((value: any) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    margin: 40,
                    marginVertical: 5,
                    width:"90%"
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      color: 'black',
                    }}>
                    {value.value}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: 'black',
                    }}>
                    {value.title}
                  </Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
