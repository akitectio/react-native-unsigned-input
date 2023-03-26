//
//  ReactNativeUnsignedInput.h
//  UnsignedInput
//
//  Created by DUY TRAN on 26/03/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReactNativeMoneyInput, NSObject)

RCT_EXTERN_METHOD(applyMask:(nonnull NSNumber *)reactNode
                  options:(NSDictionary *)options)

RCT_EXTERN_METHOD(unmount:(nonnull NSNumber *)reactNode)

RCT_EXTERN_METHOD(mask:(NSString *)reactNode
                  options:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(unmask:(NSString *)reactNode
                  options:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
