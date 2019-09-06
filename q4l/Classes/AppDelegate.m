/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  q4l
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import <Cordova/CDVPlugin.h>

#import "GAI.h"

@implementation AppDelegate

@synthesize window, viewController;

- (id)init
{
    /** If you need to do any extra app-specific initialization, you can do it here
     *  -jm
     **/
    NSHTTPCookieStorage* cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];

    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];

    int cacheSizeMemory = 8 * 1024 * 1024; // 8MB
    int cacheSizeDisk = 32 * 1024 * 1024; // 32MB
#if __has_feature(objc_arc)
        NSURLCache* sharedCache = [[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"];
#else
        NSURLCache* sharedCache = [[[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"] autorelease];
#endif
    [NSURLCache setSharedURLCache:sharedCache];

    self = [super init];
    return self;
}

#pragma mark UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    
    /* Fix problem with ios 5.0.1+ and Webkit databases described at the following urls:
     *   https://issues.apache.org/jira/browse/CB-347
     *   https://issues.apache.org/jira/browse/CB-330
     * My strategy is to move any existing database from default paths
     * to Documents/ and then changing app preferences accordingly
     */
    
    NSString* library = [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES)objectAtIndex:0];
    NSString* documents = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    
    NSString *localStorageSubdir = (IsAtLeastiOSVersion(@"5.1")) ? @"Caches" : @"WebKit/LocalStorage";
    NSString *localStoragePath = [library stringByAppendingPathComponent:localStorageSubdir];
    NSString *localStorageDb = [localStoragePath stringByAppendingPathComponent:@"file__0.localstorage"];
    
    NSString *WebSQLSubdir = (IsAtLeastiOSVersion(@"5.1")) ? @"Caches" : @"WebKit/Databases";
    NSString *WebSQLPath = [library stringByAppendingPathComponent:WebSQLSubdir];
    NSString *WebSQLIndex = [WebSQLPath stringByAppendingPathComponent:@"Databases.db"];
    NSString *WebSQLDb = [WebSQLPath stringByAppendingPathComponent:@"file__0"];
    
    NSString *ourLocalStoragePath = [documents stringByAppendingPathComponent:@"LocalStorage"];;
    //NSString *ourLocalStorageDb = [documents stringByAppendingPathComponent:@"file__0.localstorage"];
    NSString *ourLocalStorageDb = [ourLocalStoragePath stringByAppendingPathComponent:@"file__0.localstorage"];
    
    NSString *ourWebSQLPath = [documents stringByAppendingPathComponent:@"Databases"];
    NSString *ourWebSQLIndex = [ourWebSQLPath stringByAppendingPathComponent:@"Databases.db"];
    NSString *ourWebSQLDb = [ourWebSQLPath stringByAppendingPathComponent:@"file__0"];
    
    NSFileManager* fileManager = [NSFileManager defaultManager];
    
    BOOL copy;
    NSError *err = nil;
    copy = [fileManager fileExistsAtPath:localStorageDb] && ![fileManager fileExistsAtPath:ourLocalStorageDb];
    if (copy) {
        [fileManager createDirectoryAtPath:ourLocalStoragePath withIntermediateDirectories:YES attributes:nil error:&err];
        [fileManager copyItemAtPath:localStorageDb toPath:ourLocalStorageDb error:&err];
        if (err == nil)
            [fileManager removeItemAtPath:localStorageDb error:&err];
    }
    
    err = nil;
    copy = [fileManager fileExistsAtPath:WebSQLPath] && ![fileManager fileExistsAtPath:ourWebSQLPath];
    if (copy) {
        [fileManager createDirectoryAtPath:ourWebSQLPath withIntermediateDirectories:YES attributes:nil error:&err];
        [fileManager copyItemAtPath:WebSQLIndex toPath:ourWebSQLIndex error:&err];
        [fileManager copyItemAtPath:WebSQLDb toPath:ourWebSQLDb error:&err];
        if (err == nil)
            [fileManager removeItemAtPath:WebSQLPath error:&err];
    }
    
    NSUserDefaults* appPreferences = [NSUserDefaults standardUserDefaults];
    NSBundle* mainBundle = [NSBundle mainBundle];
    
    NSString *bundlePath = [[mainBundle bundlePath] stringByDeletingLastPathComponent];
    NSString *bundleIdentifier = [[mainBundle infoDictionary] objectForKey:@"CFBundleIdentifier"];
    NSString* libraryPreferences = @"Library/Preferences";
    
    NSString* appPlistPath = [[bundlePath stringByAppendingPathComponent:libraryPreferences]    stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.plist", bundleIdentifier]];
    NSMutableDictionary* appPlistDict = [NSMutableDictionary dictionaryWithContentsOfFile:appPlistPath];
    
    BOOL dirty = NO;
    
    NSString *value;
    NSString *key = @"WebKitLocalStorageDatabasePathPreferenceKey";
    value = [appPlistDict objectForKey: key];
    if (![value isEqual:ourLocalStoragePath]) {
        [appPlistDict setValue:ourLocalStoragePath forKey:key];
        dirty = YES;
    }
    
    key = @"WebDatabaseDirectory";
    value = [appPlistDict objectForKey: key];
    if (![value isEqual:ourWebSQLPath]) {
        [appPlistDict setValue:ourWebSQLPath forKey:key];
        dirty = YES;
    }
    
    if (dirty)
    {
        BOOL ok = [appPlistDict writeToFile:appPlistPath atomically:YES];
        NSLog(@"Fix applied for database locations?: %@", ok? @"YES":@"NO");
        [appPreferences synchronize];
    }
    /* END Fix problem with ios 5.0.1+ and Webkit databases */

    
    
    CGRect screenBounds = [[UIScreen mainScreen] bounds];

#if __has_feature(objc_arc)
        self.window = [[UIWindow alloc] initWithFrame:screenBounds];
#else
        self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
#endif
    self.window.autoresizesSubviews = YES;

#if __has_feature(objc_arc)
        self.viewController = [[MainViewController alloc] init];
#else
        self.viewController = [[[MainViewController alloc] init] autorelease];
#endif
    //self.viewController.useSplashScreen = YES;

    // Set your app's start page by setting the <content src='foo.html' /> tag in config.xml.
    // If necessary, uncomment the line below to override it.
    // self.viewController.startPage = @"index.html";

    // NOTE: To customize the view's frame size (which defaults to full screen), override
    // [self.viewController viewWillAppear:] in your view controller.

    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];
    
    //
    [GAI sharedInstance].debug = NO;
    [GAI sharedInstance].dispatchInterval = 10;
    [GAI sharedInstance].trackUncaughtExceptions = YES;
    [[GAI sharedInstance] trackerWithTrackingId:@"UA-2438652-27"];
    
    return YES;
}

// this happens while we are running ( in the background, or from within our own app )
// only valid if q4l-Info.plist specifies a protocol to handle
- (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url
{
    if (!url) {
        return NO;
    }

    // calls into javascript global function 'handleOpenURL'
    NSString* jsString = [NSString stringWithFormat:@"handleOpenURL(\"%@\");", url];
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:jsString];

    // all plugins will get the notification, and their handlers will be called
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];

    return YES;
}

// repost the localnotification using the default NSNotificationCenter so multiple plugins may respond
- (void)            application:(UIApplication*)application
    didReceiveLocalNotification:(UILocalNotification*)notification
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVLocalNotification object:notification];
    //
    //[UIApplication sharedApplication].applicationIconBadgeNumber = application.applicationIconBadgeNumber - 1;
}

- (NSUInteger)application:(UIApplication*)application supportedInterfaceOrientationsForWindow:(UIWindow*)window
{
    // iPhone doesn't support upside down by default, while the iPad does.  Override to allow all orientations always, and let the root view controller decide what's allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait) | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);

    return supportedInterfaceOrientations;
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication*)application
{
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    application.applicationIconBadgeNumber = 0;
}

@end
