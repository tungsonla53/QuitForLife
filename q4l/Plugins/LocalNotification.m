//
//  LocalNotification.m
//   Phonegap LocalNotification Plugin
//   Copyright (c) Greg Allen 2011
//   MIT Licensed


/**
 *
 * @modding author Ally Ogilvie
 * @WizCorp Inc. [ Incorporated Wizards ] 2011
 * @file LocalNotification.m for Cordova
 *
 */

#import "LocalNotification.h"

@interface LocalNotification ()
@property (nonatomic, retain) NSMutableDictionary *notificationQueue;
+ (void)load;
+ (void)didFinishLaunching:(NSNotification *)notification;
+ (void)willTerminate:(NSNotification *)notification;
- (void)emptyNotificationQueue:(NSNotification *)notification;
@end

@implementation LocalNotification

static BOOL launchedWithNotification = NO;
static UILocalNotification *localNotification = nil;

#pragma - Class Methods

+ (void)load
{
    // Register for didFinishLaunching notifications in class load method so that
    // this class can observe launch events.  Do this here because this needs to be
    // registered before the AppDelegate's application:didFinishLaunchingWithOptions:
    // method finishes executing.  A class's load method gets invoked before
    // application:didFinishLaunchingWithOptions is invoked (even if the plugin is
    // not loaded/invoked in the JavaScript).
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(didFinishLaunching:)
                                                 name:UIApplicationDidFinishLaunchingNotification
                                               object:nil];
    
    // Register for willTerminate notifications here so that we can observer terminate
    // events and unregister observing launch notifications.  This isn't strictly
    // required (and may not be called according to the docs).
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(willTerminate:)
                                                 name:UIApplicationWillTerminateNotification
                                               object:nil];
}

+ (void)didFinishLaunching:(NSNotification *)notification
{
    // This code will be called immediately after application:didFinishLaunchingWithOptions:.
    NSDictionary *launchOptions = [notification userInfo];
    
    UILocalNotification *localNotif = [launchOptions objectForKey: @"UIApplicationLaunchOptionsLocalNotificationKey"];
    if (localNotif) {
        launchedWithNotification = YES;
        localNotification = localNotif;
        [localNotification retain];
    } else {
        launchedWithNotification = NO;
    }
}

+ (void)willTerminate:(NSNotification *)notification
{
    // Stop the class from observing all notification center notifications.
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
    // Release the notification
    [localNotification release];
}

#pragma - Instance Methods

- (void)dealloc
{
    self.notificationQueue = nil;
    
    // Stop the instance from observing all notification center notifications.
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
    [super dealloc];
}

-(CDVPlugin*) initWithWebView:(UIWebView*)theWebView
{
    
    self = (LocalNotification*)[super initWithWebView:theWebView];
    
    // initiate empty Notification Queue
    self.notificationQueue = [[NSMutableDictionary alloc ] init];
    
    // Register the instance to observe CDVLocalNotification notifications
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(notificationReceived:)
                                                 name:CDVLocalNotification
                                               object:nil];
    
    // Register the instance to observe didEnterBackground notifications
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(emptyNotificationQueue:)
                                                 name:UIApplicationDidEnterBackgroundNotification
                                               object:nil];
    
    // Register the instance to observe willResignActive notifications
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(emptyNotificationQueue:)
                                                 name:UIApplicationWillResignActiveNotification
                                               object:nil];
    
    return self;
}

- (void)ready:(CDVInvokedUrlCommand*)command {
    if ( launchedWithNotification ) {
        NSNotification *notification = [NSNotification notificationWithName:CDVLocalNotification
                                                                     object:localNotification];
        [self notificationReceived:notification];
    }
}

- (void)addNotification:(CDVInvokedUrlCommand*)command {
    
    // NO callbacks
    
    NSDictionary *options = [command.arguments objectAtIndex:1];
    
    int days                 = [[options objectForKey:@"days"] intValue];
    int at                 = [[options objectForKey:@"at"] intValue];
    NSString *msg               = [options objectForKey:@"message"];
    // NSString *action            = [options objectForKey:@"action"];
    NSString *action            = @"View";
    NSString *notificationId    = [NSString stringWithFormat:@"%@", [command.arguments objectAtIndex:0]];
    NSInteger badge             = [[options objectForKey:@"badge"] intValue];
    bool hasAction              = TRUE;
    
    NSTimeInterval seconds = days * 60 * 60 * 24;
    NSTimeInterval secondedDate = ([[NSDate date] timeIntervalSince1970] + seconds);
    NSDate  *date   = [NSDate dateWithTimeIntervalSince1970:secondedDate];
    
    NSCalendar *gregorian = [[NSCalendar alloc] initWithCalendarIdentifier: NSGregorianCalendar];
    NSDateComponents *components = [gregorian components: NSUIntegerMax fromDate: date];
    [components setHour: at];
    [components setMinute: 0];
    [components setSecond: 0];
    
    NSDate *fireDate = [gregorian dateFromComponents: components];
    [gregorian release];
    
                     
    //
    
    UILocalNotification *notif = [[UILocalNotification alloc] init];
    //notif.fireDate  = date;
    notif.fireDate  = fireDate;
    //
    notif.hasAction = hasAction;
    notif.timeZone  = [NSTimeZone defaultTimeZone];
    
    notif.alertBody = ([msg isEqualToString:@""])?nil:msg;
    notif.alertAction = action;
    notif.soundName = UILocalNotificationDefaultSoundName;
    //notif.applicationIconBadgeNumber = badge;
    notif.applicationIconBadgeNumber = 1;
    
    NSDictionary *userDict = [NSDictionary dictionaryWithObject:notificationId
                                                         forKey:@"notificationId"];
    notif.userInfo = userDict;
    
    
    // check for existing notification with same id?
    NSArray *notifications      = [[UIApplication sharedApplication] scheduledLocalNotifications];
    
    for (UILocalNotification *notification in notifications) {
        NSString *notId = [notification.userInfo objectForKey:@"notificationId"];
        if ([notificationId isEqualToString:notId]) {
            // it is the same so cancel it
            //WizLog(@"Notification Canceled: %@", notificationId);
            [[UIApplication sharedApplication] cancelLocalNotification:notification];
            
        }
    }
    
    // now schedule new one
    NSLog(@"Notification Set: %@ (ID: %@, Badge: %i)", date , notificationId, badge);
    [[UIApplication sharedApplication] scheduleLocalNotification:notif];
    
    [notif release];
    
}


- (void)queueNotification:(CDVInvokedUrlCommand*)command {
    //WizLog(@"[queueNotification] ------- adding notification to queue ");
    NSDictionary *options = [command.arguments objectAtIndex:1];
    // store notifications in notificationQueue dictionary
    NSString *notificationId    = [NSString stringWithFormat:@"%@", [command.arguments objectAtIndex:0]];
    [self.notificationQueue setObject:options forKey:notificationId];
    
    
}

- (void)notificationReceived:(NSNotification *)notification {
    NSString *active;
    if ( launchedWithNotification ) {
        active = @"false";
        launchedWithNotification = NO;
        [localNotification release];
        localNotification = nil;
    } else if ( [[UIApplication sharedApplication] applicationState] == UIApplicationStateActive ) {
        active = @"true";
    } else {
        active = @"false";
    }
    
    NSString *jsString = [NSString stringWithFormat:@"cordova.fireDocumentEvent('receivedLocalNotification', \
                          { active : %@, notificationId : \'%@\' })", active, [[notification.object userInfo] objectForKey:@"notificationId"]];
    NSLog(@"CALLING JAVASCRIPT METHOD: %@", jsString);
    [self.webView stringByEvaluatingJavaScriptFromString:jsString];
}

- (void)emptyNotificationQueue:(NSNotification *)notification {
    
    LocalNotification* _localNotification = [[LocalNotification alloc] init];
    
    // Add all notifications from the notificationQueue dictionary and empty it
    for (NSString* key in self.notificationQueue) {
        
        NSMutableDictionary* notificationDict = [[NSMutableDictionary alloc] initWithDictionary:[self.notificationQueue objectForKey:key]];
        NSArray* notificationArray = [[NSArray alloc] initWithObjects:key, notificationDict, nil];
        //WizLog(@"Notification in queue adding : %@", notificationArray);
        
        CDVInvokedUrlCommand *cmd = [[CDVInvokedUrlCommand alloc] initWithArguments:notificationArray callbackId:@"" className:@"LocalNotification" methodName:@"addNotification"];
        [_localNotification addNotification:cmd];
        [cmd release];
        [notificationArray release];
        [notificationDict release];
        
    }
    
    // empty it
    [self.notificationQueue removeAllObjects];
    
    [_localNotification release];
    
    
    
}

- (void)cancelNotification:(CDVInvokedUrlCommand*)command {
    
    if ([command.arguments count] >0) {
        NSString *notificationId    = [NSString stringWithFormat:@"%@", [command.arguments objectAtIndex:0]];
        NSArray *notifications      = [[UIApplication sharedApplication] scheduledLocalNotifications];
        
        for (UILocalNotification *notification in notifications) {
            NSString *notId = [notification.userInfo objectForKey:@"notificationId"];
            if ([notificationId isEqualToString:notId]) {
                //WizLog(@"Notification Canceled: %@", notificationId);
                [[UIApplication sharedApplication] cancelLocalNotification:notification];
            } else {
                //WizLog(@"Notification id: %@ - NOT FOUND in: %@",notificationId, notification.userInfo);
            }
        }
    } else {
        //WizLog(@"Notification Canceled not enough params. Missing ID");
        
    }
    
    
}

- (void)cancelAllNotifications:(CDVInvokedUrlCommand*)command {
    
    //WizLog(@"All Notifications cancelled");
    [[UIApplication sharedApplication] cancelAllLocalNotifications];
    
}

- (void)getApplicationBadge:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                         messageAsInt:[UIApplication sharedApplication].applicationIconBadgeNumber];
    
    [self writeJavascript: [pluginResult toSuccessCallbackString:command.callbackId]];
}

- (void)setApplicationBadge:(CDVInvokedUrlCommand*)command
{
    NSNumber *value = [command.arguments objectAtIndex:0];
    [UIApplication sharedApplication].applicationIconBadgeNumber = [value integerValue];
    
    // Invoke callback method if it was specified.
    if ( ![command.callbackId isEqualToString:@"INVALID"] ) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self writeJavascript: [pluginResult toSuccessCallbackString:command.callbackId]];
    }
}

@end

