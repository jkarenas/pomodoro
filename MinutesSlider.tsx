import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { TimerModes } from './TimerModeDisplay';
import Slider from '@react-native-community/slider'

type Props = {
    focusTime: number,
    breakTime: number,
    timerMode:TimerModes,
    timerCount:number,
    setFocusTime: (value : number) => void
    setBreakTime: (value: number) => void
    setTimerCount: (value: number) => void
}
export const MinutesSlider: React.FC<Props> = ({ focusTime, breakTime,timerMode, timerCount, setFocusTime, setBreakTime, setTimerCount  }) => {

    return (<View style={{marginTop:40}}>
        {timerMode === 'Focus' &&(
                 <View >
            <Text style={styles.focusTimeSlide}>Focus Time: {focusTime} minutes</Text>
            <Slider
                style={{ width: 300, height: 40 }}
                minimumValue={5}
                maximumValue={60}
                step={5}
                value={focusTime}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#fff"
                thumbTintColor="#fff"
                onValueChange={(value) => {
                    setFocusTime(value);
                    if (timerMode === 'Focus') {
                        setTimerCount(value * 60 * 1000)
                    }
                }}

            /></View>   
        )}
        {timerMode === "Break" &&(
                     <View>
            <Text style={styles.breakTimeSlide}>Break Time: {breakTime} minutes</Text>
            <Slider
                style={{ width: 300, height: 40 }}
                minimumValue={5}
                maximumValue={30}
                step={5}
                value={breakTime}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#fff"
                thumbTintColor="#fff"
                onValueChange={(value) => {
                    setBreakTime(value)
                    if (timerMode === 'Break') {
                        setTimerCount(value * 60 * 1000)
                    }
                }}
            />

            
        </View>   
        )}

    </View>
        

    )
}
const styles = StyleSheet.create({
    slider: {
        width: 300,
        height:50,
      },
    breakTimeSlide: {
        color: "#fff",
        opacity:0.5
    },
    focusTimeSlide: {
        color: "#fff",
        opacity:0.5,
        
    }
})

