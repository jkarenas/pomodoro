import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Pressable, View, Animated, Easing } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { TimerModes } from "./TimerModeDisplay";
type Props = {
    isTimerRunning: boolean,
    stopTimer: () => void,
    startTimer: () => void,
    timerMode: TimerModes
}

export const TimerToggleButton: React.FC<Props> = ({
    isTimerRunning, stopTimer, startTimer, timerMode
}) => {
    const borderWidth = useRef(new Animated.Value(5)).current;

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isTimerRunning) {
            intervalId = setInterval(() => {
                Animated.sequence([
                    Animated.timing(borderWidth, {
                        toValue: 15,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                    Animated.timing(borderWidth, {
                        toValue: 5,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                ]).start();
            }, 1500);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                borderWidth.setValue(5); // Reset border width to initial value
            }
        };
    }, [isTimerRunning]);

    return (
        <Pressable onPress={isTimerRunning ? stopTimer : startTimer}>
            <View style={{ ...styles.container, ...{ backgroundColor: timerMode === 'Break' ? '#9b6a6c' : '#5f5449' } }}>
                <Animated.View style={[styles.innerContainer, { borderWidth: borderWidth }]}>
                    <FontAwesome
                        name={isTimerRunning ? 'pause' : 'play'}
                        size={125}
                        style={styles.icon}
                    />
                </Animated.View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: "center",
        color: "#fff",
        
    },
    container: {
        width: 250,
        height: 250,
        borderRadius: 250 / 2,
        justifyContent: "center",
        backgroundColor: "#d95550",
        marginVertical: 50,
        elevation: 15,
        borderWidth: 4,
        borderColor: '#fff1'
    },
    innerContainer: {
        width: 240,
        height: 240,
        borderRadius: 240 / 2,
        justifyContent: "center",
        borderColor: "rgba(255, 255, 255, 0.5)", 
        borderWidth: 50,

    }
})
