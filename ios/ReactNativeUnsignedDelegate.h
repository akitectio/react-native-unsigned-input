//
//  ReactNativeUnsignedDelegate.m
//  UnsignedInput
//
//  Created by DUY TRAN on 27/03/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol InputListener <UITextFieldDelegate>
@end

@interface ReactNativeUnsignedDelegate : NSObject <UITextFieldDelegate>

@property (nonatomic, weak) id<InputListener> listener;
@property (nonatomic, copy) void (^onChange)(UITextField *textField, NSString *value);

- (instancetype)initWithListener:(id<InputListener>)listener
                        onChange:(void (^)(UITextField *textField, NSString *value))onChange;

@end

@implementation ReactNativeUnsignedDelegate

- (instancetype)initWithListener:(id<InputListener>)listener
                        onChange:(void (^)(UITextField *textField, NSString *value))onChange {
    self = [super init];
    if (self) {
        _listener = listener;
        _onChange = onChange;
    }
    return self;
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {

    // Chuẩn hóa chuỗi nhập vào bằng cách loại bỏ dấu tiếng Việt và khoảng trắng
       NSString *normalizedString = [[[string decomposedStringWithCanonicalMapping] stringByFoldingWithOptions:NSDiacriticInsensitiveSearch locale:[NSLocale currentLocale]] stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
       // Thay thế chuỗi nhập vào bằng chuỗi đã được chuẩn hóa
       textField.text = [textField.text stringByReplacingCharactersInRange:range withString:normalizedString];
    
    self.onChange(textField,textField.text);

    return NO;
}

// MARK: default RNTextInput handlers
- (BOOL)textFieldShouldBeginEditing:(UITextField *)textField {
    return [self.listener respondsToSelector:@selector(textFieldShouldBeginEditing:)] ? [self.listener textFieldShouldBeginEditing:textField] : YES;
}

- (void)textFieldDidBeginEditing:(UITextField *)textField {
    [self.listener textFieldDidBeginEditing:textField];
}

- (BOOL)textFieldShouldEndEditing:(UITextField *)textField {
    return [self.listener respondsToSelector:@selector(textFieldShouldEndEditing:)] ? [self.listener textFieldShouldEndEditing:textField] : YES;
}

- (void)textFieldDidEndEditing:(UITextField *)textField {
    [self.listener textFieldDidEndEditing:textField];
}

- (void)textFieldDidEndEditing:(UITextField *)textField reason:(UITextFieldDidEndEditingReason)reason API_AVAILABLE(ios(10.0)) {
    if ([self.listener respondsToSelector:@selector(textFieldDidEndEditing:reason:)]) {
        [self.listener textFieldDidEndEditing:textField reason:reason];
    } else {
        [self.listener textFieldDidEndEditing:textField];
    }
}

@end
