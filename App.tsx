import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { TimerCountDownDisplay } from './TimerCountDownDisplay';
import { TimerToggleButton } from './TimerToggleButton';
import { TimerModeDisplay, TimerModes } from './TimerModeDisplay';
import { MinutesSlider } from './MinutesSlider';
import {Audio} from "expo-av";
import { FontAwesome } from '@expo/vector-icons'

const FOCUS_TIMES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const BREAK_TIMES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIMES[4] * 60 * 1000);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerModes>('Focus');
  const [focusTime, setFocusTime] = useState<number>(FOCUS_TIMES[4]);
  const [breakTime, setBreakTime] = useState<number>(BREAK_TIMES[4]);
  const [alarmOn, setAlarmOn] = useState(false)

  const alarmSound = new Audio.Sound();

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
      if(alarmOn == true) {
         playAlarm()
      }
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
  const playAlarm = async () => {
    try {
      await alarmSound.loadAsync(require('./assets/alarm.mp3')); // Carga el archivo de sonido
      await alarmSound.playAsync(); // Reproduce el sonido
    } catch (error) {
      console.error('Error al reproducir la alarma:', error);
    }
  };

  const timerDate = new Date(timerCount);

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: timerMode === 'Break' ? '#9b6a6c' : '#5f5449' } }}>
      <TimerModeDisplay timerMode={timerMode} setTimerMode={setTimerMode} setTimerCount={setTimerCount} focusTime={focusTime} breakTime={breakTime} stopTimer={stopTimer}/>
      <StatusBar style="auto" />
      <Pressable onPress={()=>setAlarmOn(!alarmOn)} style={{...styles.alarm,...{backgroundColor:alarmOn === true ? '#fff' : '#fff'}}}>
      <FontAwesome
                        name={alarmOn ? 'bell' : 'bell-slash'}
                        size={20}
                        style={styles.icon}
                    />
      </Pressable>
      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} timerMode={timerMode} />
      <TimerCountDownDisplay timerDate={new Date(timerCount)} />
      <MinutesSlider focusTime={focusTime}  breakTime={breakTime} setFocusTime={setFocusTime} setBreakTime={setBreakTime} timerMode={timerMode} timerCount={timerCount} setTimerCount={setTimerCount} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f5449',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarm:{
    width: 40,
    height: 40,
    color: '#fff',
    backgroundColor: "#fff",
    borderRadius:20,
    alignSelf: "flex-end",
    marginRight: 40,
    alignItems: 'center',
    justifyContent:"center",
    elevation: 5,
    borderWidth: 4,
    borderColor: '#fff1'

  },
  icon:{
    width: 20,
    height: 20,
    alignSelf: 'center'
  }

});
