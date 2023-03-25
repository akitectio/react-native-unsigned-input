package com.unsignedinput;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class MyTextInputManagerPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(new MyTextInputManager());
  }


}
