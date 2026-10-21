# Infinity offline Android APK

This branch builds a standalone Android APK with the current Vite/React UI bundled inside the Android app. It does not use a browser URL or a PWA install flow.

## Offline behavior
- UI assets, logo, starter transaction records, and app screens are packaged into the APK.
- Account balances, plan allocations, and added transaction records persist in Android WebView local storage on that device.
- The APK manifest removes the Android INTERNET permission. It therefore cannot connect to banking APIs, fetch remote content, submit filings, or send real payments.
- Send-money and intercompany flows are local ledger simulations. The app displays an offline-mode warning and marks these entries as not sent.
- Existing seed balances, receipts and wire metadata are local display records; this APK does not independently verify them against a bank.

## Build
A GitHub Actions workflow builds a debug-signed APK on every push to `android-offline-apk` and uploads it as the `infinity-offline-apk` artifact. The APK is suitable for sideload testing, not Google Play release. A release build would require a separately managed, protected signing key.
