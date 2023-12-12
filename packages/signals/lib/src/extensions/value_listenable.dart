import 'package:flutter/foundation.dart';

import '../core/signals.dart';

/// Extension on [ValueListenable] to provide helpful methods for signals
extension SignalValueListenableUtils<T> on ValueListenable<T> {
  /// Convert an existing [ValueListenable] to [ReadonlySignal]
  ReadonlySignal<T> toSignal({String? debugLabel}) {
    final s = signal<T>(value, debugLabel: debugLabel);
    addListener(() => s.value = value);
    return s;
  }
}
