import React, { useRef } from "react";
import { Text, View, StyleSheet, Pressable, Animated, Easing } from "react-native";

export type TimerModes = "Focus" | "Break"
type Props = {
  timerMode: TimerModes,
  setTimerMode(value: TimerModes): void,
  setTimerCount(value: number): void,
  focusTime: number,
  breakTime: number,
  stopTimer: () => void
}

export const TimerModeDisplay: React.FC<Props> = ({ timerMode, setTimerMode, setTimerCount, focusTime, breakTime, stopTimer }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const changeMode = () => {
    if (timerMode === "Focus") {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        setTimerMode("Break");
        setTimerCount(breakTime * 60 * 1000);
        stopTimer();
        animatedValue.setValue(0);
      });
    } else if (timerMode === "Break") {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        setTimerMode("Focus");
        setTimerCount(focusTime * 60 * 1000);
        stopTimer();
        animatedValue.setValue(0);
      });
    }
  };

  const translateYF = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const scaleF = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const opacityF = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })


  const translateYB = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -95],
  });

  const scaleB = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const opacityB = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  return (
    
      <View style={styles.container}>
        <Animated.View style={[styles.timerModeContainer, { transform: [{ translateY: translateYF },{scale: scaleF }] },{ opacity: opacityF }]}>
          <Text style={styles.timerModeText}>
            {timerMode} Time 
          </Text>
        </Animated.View>

        <Pressable onPress={changeMode}>
            
        <Animated.View style={[styles.placeholderContainer, { transform: [{ translateY: translateYB }, { scale: scaleB }] },{backgroundColor:timerMode ==='Focus' ? '#5f5449' : '#9b6a6c'}]}>

          <Text style={styles.placeholderText}>{timerMode === 'Focus' ? 'Break Time' : 'Focus Time'}</Text>
        </Animated.View>
    </Pressable>    
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  timerModeContainer: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  timerModeText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff'
  },
  placeholderContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    borderRadius: 15,
    borderColor: '#fff7',
    borderWidth: 3,
    elevation: 10,
    padding: 3,

  },
  placeholderText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: '800',
    opacity: 0.5,
  }
});
