import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { scheduleAlarm, stopAlarm, removeAlarm, enableAlarm, disableAlarm, getAlarm, getAllAlarms, removeAllAlarms, getAlarmState } from 'expo-alarm-module';
import uuid from 'react-native-uuid';
export default function App() {
    const [lastAlarmCreated, setLastAlarmCreated] = React.useState();
    const createAlarm = () => {
        var newDate = new Date();
        newDate.setSeconds(newDate.getSeconds() + 60);
        let uuidToUse = uuid.v4();
        setLastAlarmCreated(uuidToUse);
        scheduleAlarm({
            uid: uuidToUse,
            day: newDate,
            title: 'Title of alarm',
            description: 'Alarm Description',
            showDismiss: true,
            showSnooze: true,
            snoozeText: 'Custom Snooze',
            snoozeInterval: 1,
            repeating: true,
            active: true,
        });
    };
    const removeAlarmCheck = () => {
        if (lastAlarmCreated) {
            removeAlarm(lastAlarmCreated);
        }
    };
    const enableAlarmCheck = () => {
        if (lastAlarmCreated) {
            enableAlarm(lastAlarmCreated);
        }
    };
    const disableAlarmCheck = () => {
        if (lastAlarmCreated) {
            disableAlarm(lastAlarmCreated);
        }
    };
    const getAlarmCheck = async () => {
        if (lastAlarmCreated) {
            let alarm = await getAlarm(lastAlarmCreated);
            console.log('Alarm got: ', alarm);
        }
    };
    const getAllAlarmsCheck = async () => {
        let resultado = await getAllAlarms();
        console.log(resultado);
    };
    const removeAllAlarmsCheck = async () => {
        removeAllAlarms();
    };
    const getAlarmStateCheck = async () => {
        let alarmState = await getAlarmState();
        console.log('Alarm State: ', alarmState);
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(Button, { title: "Create Alarm", onPress: createAlarm }),
        React.createElement(Button, { title: "Stop Alarm", onPress: stopAlarm }),
        React.createElement(Button, { title: "Remove Alarm", onPress: removeAlarmCheck }),
        React.createElement(Button, { title: "Enables Alarm", onPress: enableAlarmCheck }),
        React.createElement(Button, { title: "Disables Alarm", onPress: disableAlarmCheck }),
        React.createElement(Button, { title: "Get Alarm", onPress: getAlarmCheck }),
        React.createElement(Text, null, " -------------- "),
        React.createElement(Button, { title: "Get All Alarms", onPress: getAllAlarmsCheck }),
        React.createElement(Button, { title: "Remove All Alarms", onPress: removeAllAlarmsCheck }),
        React.createElement(Text, null, " -------------- "),
        React.createElement(Button, { title: "Get Alarm State", onPress: getAlarmStateCheck })));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
