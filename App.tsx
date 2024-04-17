import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TimerCountDownDisplay } from './TimerCountDownDisplay';
import { TimerToggleButton } from './TimerToggleButton';
import { TimerModeDisplay, TimerModes } from './TimerModeDisplay';
import { MinutesSlider } from './MinutesSlider';

const FOCUS_TIMES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const BREAK_TIMES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIMES[4] * 60 * 1000);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
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
    <View style={{ ...styles.container, ...{ backgroundColor: timerMode === 'Break' ? '#1e1e24' : '#92140c' } }}>
      <TimerModeDisplay timerMode={timerMode} setTimerMode={setTimerMode} setTimerCount={setTimerCount} focusTime={focusTime} breakTime={breakTime} stopTimer={stopTimer}/>
      <StatusBar style="auto" />
      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} timerMode={timerMode} />
      <TimerCountDownDisplay timerDate={new Date(timerCount)} />
      <MinutesSlider focusTime={focusTime}  breakTime={breakTime} setFocusTime={setFocusTime} setBreakTime={setBreakTime} timerMode={timerMode} timerCount={timerCount} setTimerCount={setTimerCount} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#92140c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
