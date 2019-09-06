

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface LocalNotification : CDVPlugin {
    
}


- (void)addNotification:(CDVInvokedUrlCommand*)command;
- (void)cancelNotification:(CDVInvokedUrlCommand*)command;
- (void)cancelAllNotifications:(CDVInvokedUrlCommand*)command;
- (void)queueNotification:(CDVInvokedUrlCommand*)command;

- (void)getApplicationBadge:(CDVInvokedUrlCommand*)command;
- (void)setApplicationBadge:(CDVInvokedUrlCommand*)command;

@end