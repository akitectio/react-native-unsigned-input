#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTBaseTextInputView.h>
#import <React/RCTUITextField.h>
#import <React/RCTBackedTextInputDelegateAdapter.h>

@interface UnsignedInputViewManager : RCTViewManager <UITextFieldDelegate>

@end

@implementation UnsignedInputViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  UITextField *textField = [[UITextField alloc] init];
  textField.autocorrectionType = UITextAutocorrectionTypeNo;
  textField.autocapitalizationType = UITextAutocapitalizationTypeNone;
  textField.delegate = self;
  return textField;
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    // Chuẩn hóa chuỗi nhập vào bằng cách loại bỏ dấu tiếng Việt và khoảng trắng
    NSString *normalizedString = [[[string decomposedStringWithCanonicalMapping] stringByFoldingWithOptions:NSDiacriticInsensitiveSearch locale:[NSLocale currentLocale]] stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
    // Thay thế chuỗi nhập vào bằng chuỗi đã được chuẩn hóa
    textField.text = [textField.text stringByReplacingCharactersInRange:range withString:normalizedString];
    return NO;
}

@end

