import Foundation
import AVFoundation

class Manager {
    private let scheduler: NotificationSchedulerDelegate = NotificationScheduler()
    private let alarms: Alarms = Store.shared.alarms
    
    func schedule(_ alarm: Alarm) {
        // Creates the notification (the alarm).
        scheduler.setNotification(date: alarm.date, ringtoneName: "bell", snoozeEnabled: alarm.snoozeEnabled, onSnooze: false, uid: alarm.uid)

        // Stores the alarm in the Store for rescheduling or removing later.
        alarms.add(alarm); 
    }
    
    // Gets alarm from store
    func getAlarm(_ uid: String) -> Alarm? {
        return alarms.getAlarm(ByUUIDStr: uid);
    }
    
    func getAllAlarms() -> [Alarm] {
        return alarms.getAlarms();
    }
    

    func enable(_ uid: String) {
        let alarm: Alarm! = self.getAlarm(uid) ?? nil;
        
        // Only enables if the alarm already exists and is disabled.
        if((alarm != nil) && !alarm.active) {
            // Creates the notification (the alarm).
            scheduler.setNotification(date: alarm.date, ringtoneName: "bell", snoozeEnabled: alarm.snoozeEnabled, onSnooze: false, uid: alarm.uid)
            
            alarm.active = true
            
            alarms.update(alarm)
        }
    }
    
    func disable(_ uid: String) {
        // Stops any sound of alarm that is playing.
        self.stop()
        
        let alarm: Alarm! = self.getAlarm(uid) ?? nil
        
        // Only disables if the alarm already exists and is enabled.
        if((alarm != nil) && alarm.active) {
            // Cancels the notification.
            scheduler.cancelNotification(ByUUIDStr: uid)
            
            // Disables the alarm and save in the Store
            alarm.active = false
            alarms.update(alarm)
        }
    }

    func stop() {
        ExpoAlarmModule.audioPlayer?.stop()
        AudioServicesRemoveSystemSoundCompletion(kSystemSoundID_Vibrate)
    }

    func remove(_ uid: String) {
        // Stops any sound of alarm that is playing.
        self.stop()
        
        // Cancels the notification
        scheduler.cancelNotification(ByUUIDStr: uid)
        
        // Removes the alarm from the Store.
        alarms.remove(uid)
    }
    
    func removeAll() {
        for alarmUuid in alarms.uids {
            self.remove(alarmUuid)
        }
    }
}
