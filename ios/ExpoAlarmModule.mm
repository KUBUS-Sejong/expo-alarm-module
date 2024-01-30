#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ExpoAlarmModule, NSObject)
	
RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)


RCT_EXTERN_METHOD(set:(NSDictionary)alarm
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stop)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}




@end
