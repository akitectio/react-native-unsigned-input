package com.unsignedinput

import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText

class UnsignedTextWatcher(
  private val field: EditText,
): TextWatcher {
  private var old = ""
  override fun beforeTextChanged(sequence: CharSequence?, start: Int, count: Int, afterChange: Int) {
    if (sequence == null) {
      return
    }
    old = sequence.subSequence(start, start+count).toString();
  }

  override fun onTextChanged(sequence: CharSequence?, start: Int, count: Int, afterChange: Int) {}

  override fun afterTextChanged(value: Editable?) {
    if (value != null && value.toString() == old) {
      return
    }
    field.setText(value.toString())
    val newCursorPosition = value.toString().length
    if (newCursorPosition > 0) {
      field.setSelection(newCursorPosition)
    }
  }
}
