package com.unsignedinput;

import static java.security.AccessController.getContext;

import android.content.res.ColorStateList;
import android.graphics.Color;
import android.text.Editable;
import android.text.InputType;
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
import java.util.Map;



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
    editText.setBackgroundTintList(ColorStateList.valueOf(Color.TRANSPARENT));
    editText.setImeOptions(EditorInfo.IME_ACTION_DONE);
    editText.setRawInputType(InputType.TYPE_CLASS_TEXT);
    // Add an OnEditorActionListener to handle the Done action
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

    return editText;
  }

  private String getDefaultEditable(String str, String defaultStr) {
    return str == null ? defaultStr : str;
  }

}
