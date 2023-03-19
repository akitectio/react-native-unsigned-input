#import <React/RCTViewManager.h>
#import <UIKit/UIKit.h>

@interface UnsignedInputViewManager : RCTViewManager <RCTUITextFieldDelegate>

@end

@implementation UnsignedInputViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  RCTTextField *textField = [[UITextField alloc] init];
  textField.delegate = self;
  return textField;
}

- (BOOL)textField:(UITextField *)textField shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text {
  // Kiểm tra xem văn bản được nhập có phải là ký tự Tiếng Anh không
  NSCharacterSet *englishCharset = [NSCharacterSet characterSetWithCharactersInString:@"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  NSCharacterSet *textCharset = [NSCharacterSet characterSetWithCharactersInString:text];
  BOOL isEnglish = [englishCharset isSupersetOfSet:textCharset];

  // Nếu văn bản nhập vào là Tiếng Anh thì cho phép nhập
  if (isEnglish) {
    return YES;
  }
  // Ngược lại, loại bỏ các ký tự không phải Tiếng Anh khỏi TextInput
  else {
    return NO;
  }
}

@end
