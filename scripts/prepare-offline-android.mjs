import fs from 'node:fs';
import path from 'node:path';

const manifestPath = 'android/app/src/main/AndroidManifest.xml';
if (!fs.existsSync(manifestPath)) {
  throw new Error('Capacitor Android manifest was not generated.');
}

let manifest = fs.readFileSync(manifestPath, 'utf8');
if (!manifest.includes('xmlns:tools=')) {
  manifest = manifest.replace('<manifest ', '<manifest xmlns:tools="http://schemas.android.com/tools" ');
}

const permissionPattern = /<uses-permission\\b(?=[^>]*android:name="android\\.permission\\.INTERNET")[^>]*\\/>/g;
const removal = '<uses-permission android:name="android.permission.INTERNET" tools:node="remove" />';
if (permissionPattern.test(manifest)) {
  manifest = manifest.replace(permissionPattern, removal);
} else {
  const manifestOpenEnd = manifest.indexOf('>');
  if (manifestOpenEnd < 0) throw new Error('Could not parse Android manifest root.');
  manifest = manifest.slice(0, manifestOpenEnd + 1) + '\\n    ' + removal + manifest.slice(manifestOpenEnd + 1);
}
fs.writeFileSync(manifestPath, manifest);

const res = 'android/app/src/main/res';
const write = (relativePath, content) => {
  const fullPath = path.join(res, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

write('values/infinity_icon.xml', `<resources><color name="infinity_icon_background">#111827</color></resources>\\n`);
write('drawable/ic_launcher_foreground.xml', `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path android:fillColor="#FFFFFFFF" android:pathData="M15,58 C27,38 39,28 50,32 C59,35 64,47 72,47 C80,47 85,38 94,24 C90,48 80,67 65,75 C52,82 42,68 32,62 C26,59 21,58 15,58 Z"/>
    <path android:fillColor="#FFCBD5E1" android:pathData="M19,42 C28,31 39,25 50,25 C39,22 28,27 19,42 Z"/>
</vector>
\\n`);
const adaptiveIcon = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/infinity_icon_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
\\n`;
write('mipmap-anydpi-v26/ic_launcher.xml', adaptiveIcon);
write('mipmap-anydpi-v26/ic_launcher_round.xml', adaptiveIcon);

console.log('Prepared offline-only manifest and bundled launcher icon.');
