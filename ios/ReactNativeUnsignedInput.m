//
//  ReactNativeUnsignedInput.m
//  UnsignedInput
//
//  Created by DUY TRAN on 27/03/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTBaseTextInputView.h>
#import <React/RCTUITextField.h>
#import <React/RCTBackedTextInputDelegateAdapter.h>
#import "ReactNativeUnsignedDelegate.h"

@interface TextFieldAdapter : RCTBackedTextFieldDelegateAdapter <InputListener>

@end

@implementation TextFieldAdapter

@end

// Add your MoneyMaskDelegate and Mask class imports here

@interface ReactNativeUnsignedInput : NSObject <RCTBridgeModule>

@property (nonatomic, strong) RCTBridge *bridge;
@property (nonatomic, strong) NSMutableDictionary<NSString *, ReactNativeUnsignedDelegate *> *masks;
@property (nonatomic, strong) NSMutableDictionary<NSString *, TextFieldAdapter *> *listeners;

@end

@implementation ReactNativeUnsignedInput

RCT_EXPORT_MODULE()

- (instancetype)init {
  self = [super init];
  if (self) {
    _masks = [[NSMutableDictionary alloc] init];
    _listeners = [[NSMutableDictionary alloc] init];
  }
  return self;
}

- (dispatch_queue_t)methodQueue {
  return self.bridge.uiManager.methodQueue;
}

RCT_EXPORT_METHOD(applyMask:(nonnull NSNumber *)reactNode) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    RCTBaseTextInputView *view = viewRegistry[reactNode];
    if (![view isKindOfClass:[RCTBaseTextInputView class]]) {
      return;
    }

    RCTUITextField *textInput = (RCTUITextField *)view.backedTextInputView;
    if (![textInput isKindOfClass:[RCTUITextField class]]) {
      return;
    }

    NSString *key = [self getKeyByNode:reactNode];
    TextFieldAdapter *listener = [[TextFieldAdapter alloc] initWithTextField:textInput];
      ReactNativeUnsignedDelegate *delegate = [[ReactNativeUnsignedDelegate alloc] initWithListener:listener  onChange:^(UITextField *textField, NSString *value) {
      if (view.onChange) {
        view.onChange(@{
          @"text": value,
          @"target": view.reactTag,
          @"eventCount": @(view.nativeEventCount)
        });
      }
    }];

    self.listeners[key] = listener;
    self.masks[key] = delegate;
    textInput.delegate = delegate;
  }];
}



- (NSString *)getKeyByNode:(NSNumber *)tag {
  return [tag stringValue];
}


@end

