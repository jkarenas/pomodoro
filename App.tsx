import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Slider from '@react-native-community/slider'
import { TimerCountDownDisplay } from './TimerCountDownDisplay';
import { TimerToggleButton } from './TimerToggleButton';
import { TimerModeDisplay, TimerModes } from './TimerModeDisplay';

const FOCUS_TIMES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const BREAK_TIMES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIMES[4] * 60 * 1000);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerModes>('Focus');
  const [focusTime, setFocusTime] = useState<number>(FOCUS_TIMES[4]);
  const [breakTime, setBreakTime] = useState<number>(BREAK_TIMES[4]);

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === 'Focus') {
        setTimerMode('Break');
        setTimerCount(breakTime * 60 * 1000);
      } else {
        setTimerMode('Focus');
        setTimerCount(focusTime * 60 * 1000);
      }
      stopTimer();
    }
  }, [timerCount]);

  const startTimer = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000);
    setTimerInterval(id);
    // setTimerCount(focusTime * 60 * 1000);
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
    setIsTimerRunning(false);
  };

  const timerDate = new Date(timerCount);

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: timerMode === 'Break' ? '#2a9d8f' : '#d95550' } }}>
      <TimerModeDisplay timerMode={timerMode} />
      <StatusBar style="auto" />
      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} />
      <TimerCountDownDisplay timerDate={new Date(timerCount)} />
      <Text>Focus Time: {focusTime} minutes</Text>
      <Slider
  style={{ width: 300, height: 40 }}
  minimumValue={1}
  maximumValue={60}
  step={1}
  value={focusTime}
  minimumTrackTintColor="#d95550"
  maximumTrackTintColor="#2a9d8f"
  thumbTintColor="#fff"
  onValueChange={(value) => {
    setFocusTime(value);
    setTimerCount(value * 60 * 1000);
  }}
 
/>
      <Text>Break Time: {breakTime} minutes</Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={30}
        step={5}
        value={breakTime}
        onValueChange={(value) => {setBreakTime(value)
          if(timerMode === 'Break'){
            setTimerCount(value*60*1000)            
          }

          }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d95550',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: 300,
    height:50,
  }
});

// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import { TimerCountDownDisplay } from './TimerCountDownDisplay';
// import { TimerToggleButton } from './TimerToggleButton';
// import { TimerModeDisplay, TimerModes } from './TimerModeDisplay';

// const FOCUS_TIME_MINUTES = 0.5 * 60 * 1000
// const BREAK_TIME_MINUTES = 0.5 * 60 * 1000
// export default function App() {
//   const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES)
//   const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null)
//   const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
//   const [timerMode, setTimerMode] = useState<TimerModes>('Focus')
//   // const [focusTime, setFocusTime] = useState<number>(FOCUS_TIME_MINUTES)
//   // const [breakTime, setBreakTime] = useState<number>(BREAK_TIME_MINUTES)

//   useEffect(() => {
//     if(timerCount === 0){
//       if(timerMode === "Focus"){
//         setTimerMode("Break")
//         setTimerCount(BREAK_TIME_MINUTES)
//       }else{
//         setTimerMode("Focus")
//         setTimerCount(FOCUS_TIME_MINUTES)
//       }
//       stopTimer()
//     }
//   },[timerCount])
//   const startTimer = () => {
//     setIsTimerRunning(true)
//     const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000)
//     setTimerInterval(id)
//     // setTimerCount(focusTime)
//   }

//   const stopTimer = () => {
//     if (timerInterval !== null) {
//       clearInterval(timerInterval)
//     }
//     setIsTimerRunning(false)
//   }

//   const timerDate = new Date(timerCount)

//   return (
//     <View style={{...styles.container, ...{backgroundColor: timerMode === 'Break' ? '#2a9d8f' : '#d95550'}}}>
//       <TimerModeDisplay timerMode={timerMode}/>
//       <StatusBar style="auto" />
//       <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} />
//       <TimerCountDownDisplay timerDate={new Date(timerCount)} />
//       {/* <TextInput 
//       style={styles.input} 
//       keyboardType="numeric"
//       value={(focusTime/ 60000).toString()}
//       onChangeText={(text) => setFocusTime(parseInt(text)*60000)}
//       />
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={(breakTime/60000).toString()}
//         onChangeText={(text) => setBreakTime(parseInt(text)*60000)}
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#d95550',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     width: 200,
//     borderRadius: 5,
//   },
// });
