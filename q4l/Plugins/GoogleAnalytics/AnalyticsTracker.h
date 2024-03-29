//
//  GoogleAnalyticsPlugin.h
//  Google Analytics plugin for PhoneGap
//
//  Created by Jesse MacFadyen on 11-04-21.
//  Updated to 1.x by Olivier Louvignes on 11-11-24.
//  Updated to 1.5 by Chris Kihneman on 12-04-09.
//  MIT Licensed
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "GAITracker.h"
#import "GAI.h"

@interface AnalyticsTracker : CDVPlugin {
    
}

- (void) trackEvent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) trackPageView:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end