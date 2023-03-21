#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTBaseTextInputView.h>
#import <React/RCTUITextField.h>
#import <React/RCTBackedTextInputDelegateAdapter.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>

@interface UnsignedInputViewManager : RCTViewManager

@property (nonatomic, strong) RCTEventEmitter *eventEmitter;

@end



@implementation UnsignedInputViewManager


RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}


- (instancetype)init
{
    self = [super init];
    if (self) {
        _eventEmitter = [[RCTEventEmitter alloc] init];
    }
    return self;
}

- (UIView *)view {
  UITextField *textField = [[UITextField alloc] init];
  textField.autocorrectionType = UITextAutocorrectionTypeNo;
  textField.autocapitalizationType = UITextAutocapitalizationTypeNone;
  textField.delegate = self;

   // Enable secure text entry
   textField.secureTextEntry = NO;
   textField.textColor = [UIColor whiteColor]; // thiết lập màu chữ Trắng
   NSMutableAttributedString *placeholder = [[NSMutableAttributedString alloc] initWithString:@"Placeholder text"];
   [placeholder addAttribute:NSForegroundColorAttributeName value:[UIColor whiteColor] range:NSMakeRange(0, placeholder.length)];
   textField.attributedPlaceholder = placeholder;
   textField.returnKeyType = UIReturnKeyDone; // Set return key type to "Done"

  return textField;
}


- (BOOL)textFieldShouldReturn:(UITextField *)textField {
  [textField resignFirstResponder]; // Dismiss keyboard when return key is pressed
  return YES;
}

- (void)setNativeValue:(NSString *)value forView:(UITextField *)textField {
    textField.text = value;
}


- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    // Chuẩn hóa chuỗi nhập vào bằng cách loại bỏ dấu tiếng Việt và khoảng trắng
    NSString *normalizedString = [[[string decomposedStringWithCanonicalMapping] stringByFoldingWithOptions:NSDiacriticInsensitiveSearch locale:[NSLocale currentLocale]] stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
    // Thay thế chuỗi nhập vào bằng chuỗi đã được chuẩn hóa
    textField.text = [textField.text stringByReplacingCharactersInRange:range withString:normalizedString];

    return NO;
}



RCT_EXPORT_METHOD(getValue:(nonnull NSNumber *)reactTag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    UITextField *textField = (UITextField *)viewRegistry[reactTag];
    if (!textField || ![textField isKindOfClass:[UITextField class]]) {
      reject(@"text_field_error", @"UITextField not found", nil);
      return;
    }
    resolve(textField.text);
  }];
}

// trong file Objective-C
RCT_EXPORT_VIEW_PROPERTY(color, UIColor)
- (void)setColor:(UIColor *)color forView:(UITextField *)textField {
  textField.textColor = color;
}

// Property declarations for UnsignedInputViewManager
RCT_EXPORT_VIEW_PROPERTY(autoCapitalize, UITextAutocapitalizationType)
RCT_EXPORT_VIEW_PROPERTY(autoCorrect, BOOL)
RCT_EXPORT_VIEW_PROPERTY(editable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(enablesReturnKeyAutomatically, BOOL)
RCT_EXPORT_VIEW_PROPERTY(keyboardAppearance, UIKeyboardAppearance)
RCT_EXPORT_VIEW_PROPERTY(keyboardType, UIKeyboardType)
RCT_EXPORT_VIEW_PROPERTY(maxLength, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onBlur, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onEndEditing, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFocus, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSelectionChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSubmitEditing, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
RCT_EXPORT_VIEW_PROPERTY(secureTextEntry, BOOL)
RCT_EXPORT_VIEW_PROPERTY(selectTextOnFocus, BOOL)
RCT_EXPORT_VIEW_PROPERTY(selectionColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(spellCheck, BOOL)
RCT_EXPORT_VIEW_PROPERTY(text, NSString)
//RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTBubblingEventBlock)
// Export placeholderTextColor property to React Native component
RCT_EXPORT_VIEW_PROPERTY(placeholderTextColor, UIColor)

@end



