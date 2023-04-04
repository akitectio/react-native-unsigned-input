package com.unsignedinput

import android.text.InputType
import android.text.TextWatcher
import android.widget.EditText
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.UIManagerModule

class ReactNativeUnsignedInputModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  private val listeners = hashMapOf<String, TextWatcher?>()

  @ReactMethod
  fun applyUnsigned(reactNode: Int) {
    val uiManager = reactContext.getNativeModule(UIManagerModule::class.java)!!

    uiManager.addUIBlock { viewRegistry ->
      val editText = viewRegistry.resolveView(reactNode) as EditText
      val listener = UnsignedTextWatcher(editText)
      listeners.set(getKey(reactNode), listener)
      editText.addTextChangedListener(listener)
      
    }
  }

  @ReactMethod
  fun setSecureTextEntry(reactNode: Int, secureTextEntry: Boolean) {
    val uiManager = reactContext.getNativeModule(UIManagerModule::class.java)!!

    uiManager.addUIBlock { viewRegistry ->
      val editText = viewRegistry.resolveView(reactNode) as EditText
      if (secureTextEntry) {
        editText.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD)
      } else {
        editText.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
      }
      // Set the cursor to the end of the text
      val textLength = editText.text.length
      editText.setSelection(textLength)
    }
  }

  @ReactMethod
  fun unmount(reactNode: Int) {
    listeners[getKey(reactNode)] = null
  }


  private fun getKey(reactNode: Int): String {
    return reactNode.toString()
  }



  private fun safeResolveString(map: ReadableMap, key: String): String? {
    return try {
      map.getString(key)
    } catch (e: Exception) {
      null
    }
  }
  private fun safeResolveString(map: ReadableMap, key: String, defaultValue: String): String {
    return safeResolveString(map, key) ?: defaultValue
  }

  private fun safeResolveInt(map: ReadableMap, key: String): Int? {
    return try {
      map.getInt(key)
    } catch (e: Exception) {
      null
    }
  }
  private fun safeResolveInt(map: ReadableMap, key: String, defaultValue: Int): Int {
    return safeResolveInt(map, key) ?: defaultValue
  }

  companion object {
    const val NAME = "ReactNativeUnsignedInput"
  }
}
