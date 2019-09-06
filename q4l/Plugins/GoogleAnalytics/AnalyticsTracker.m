//
//  GoogleAnalyticsPlugin.m
//  Google Analytics plugin for PhoneGap
//
//  Created by Jesse MacFadyen on 11-04-21.
//  Updated to 1.x by Olivier Louvignes on 11-11-24.
//  Updated to 1.5 by Chris Kihneman on 12-04-09.
//  MIT Licensed
//

#import "AnalyticsTracker.h"
#import "GAI.h"

// Dispatch period in seconds
static const NSInteger kGANDispatchPeriodSec = 10;

@implementation AnalyticsTracker

- (void) trackEvent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    /*
	NSString* category = [options valueForKey:@"category"];
	NSString* action = [options valueForKey:@"action"];
	NSString* label = [options valueForKey:@"label"];
	int value = [[options valueForKey:@"value"] intValue];
     */
    
    
	NSString* category = [arguments objectAtIndex:1];
	NSString* action = [arguments objectAtIndex:2];
	NSString* label = [arguments objectAtIndex:3];
	int value = [[options valueForKey:@"value"] intValue];
    
    @try {
                
        id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
        [tracker sendEventWithCategory:category
                            withAction:action
                             withLabel:label
                             withValue:[NSNumber numberWithInt:value]];
        NSLog(@"GoogleAnalyticsPlugin.trackEvent::%@, %@, %@, %d",category,action,label,value);
    }
    @catch (NSException *exception) {
        NSLog(@"Exception: %@", exception);
    }
}

- (void) trackPageView:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    
    NSString* pageUri = [arguments objectAtIndex:1];
    
    @try {
                    
        id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
        [tracker sendView:pageUri];
        
    	NSLog(@"GoogleAnalyticsPlugin.trackPageView::%@",pageUri);
    }
    @catch (NSException *exception) {
        NSLog(@"Exception: %@", exception);
    }
}

@end