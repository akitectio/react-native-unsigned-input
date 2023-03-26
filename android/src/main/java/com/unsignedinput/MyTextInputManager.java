package com.unsignedinput;

import static java.security.AccessController.getContext;

import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.Spanned;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.View;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import android.content.Context;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import android.view.inputmethod.InputMethodManager;
import android.view.KeyEvent;
import android.widget.TextView;
import com.facebook.react.uimanager.UIManagerModule;

import java.text.Normalizer;
import java.util.Map;
import java.util.regex.Pattern;


public class MyTextInputManager extends SimpleViewManager<View> {
  public static final String REACT_CLASS = "UnsignedInputView";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @ReactProp(name = "value")
  public void setValue(EditText view, String value) {
    view.setText(getDefaultEditable(value,""));
    view.setSelection(view.getText().length());
  }

  @Nullable
  @Override
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    return MapBuilder.<String, Object>builder()
      .put("onChangeText", MapBuilder.of("registrationName", "onChangeText"))
      .build();
  }

  @Nullable
  @Override
  public Map<String, Object> getExportedViewConstants() {
    return MapBuilder.<String, Object>builder()
      .put("getValue", "getValue")
      .build();
  }




  @NonNull
  @Override
  protected View createViewInstance(@NonNull ThemedReactContext reactContext) {
    EditText editText = new EditText(reactContext);
    // ... (other configurations)
    editText.setBackground(new ColorDrawable(Color.TRANSPARENT));
    editText.setBackgroundTintList(ColorStateList.valueOf(Color.TRANSPARENT));
    editText.setImeOptions(EditorInfo.IME_ACTION_DONE);
    // Add an OnEditorActionListener to handle the Done action
    editText.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD);
    InputFilter filter = new InputFilter() {
      @Override
      public CharSequence filter(CharSequence source, int start, int end, Spanned dest, int dstart, int dend) {
        StringBuilder builder = new StringBuilder();
        for (int i = start; i < end; i++) {
          char c = source.charAt(i);
          if (Character.UnicodeBlock.of(c) != Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A) {
            // Regular Expression to check if the character is a Vietnamese character with tone marks
            if (!String.valueOf(c).matches("[\u0300-\u036F\u1DC0-\u1DFF\u1AB0-\u1AFF\u1EB0-\u1EFF]")) {
              builder.append(c);
            }
          }
        }
        return builder.toString();
      }
    };
    editText.setFilters(new InputFilter[]{filter});

    editText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
      @Override
      public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        if (actionId == EditorInfo.IME_ACTION_DONE) {
          // Dismiss the keyboard when the Done button is pressed
          InputMethodManager imm = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);
          imm.hideSoftInputFromWindow(editText.getWindowToken(), 0);
          return true;
        }
        return false;
      }
    });
    // Customize the EditText view here
    // Add a TextWatcher to handle text changes
    editText.addTextChangedListener(new TextWatcher() {
      @Override
      public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        // Nothing to do here
      }

      @Override
      public void onTextChanged(CharSequence s, int start, int before, int count) {
        // Send the onChangeText event to JavaScript
        WritableMap event = Arguments.createMap();
        event.putString("text", s.toString());
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(editText.getId(), "onChangeText", event);
      }

      @Override
      public void afterTextChanged(Editable s) {
        // Nothing to do here
      }
    });

    return editText;
  }

  private String getDefaultEditable(String str, String defaultStr) {
    return str == null ? defaultStr : str;
  }

}
