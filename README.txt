# Management Logistic — PWA Wrapper

Target Apps Script:
https://script.google.com/macros/s/AKfycbzAooaW16rMO6Xnp2J6IfHn25GUEh8AA0s0Q7UApuwCGa72dfRmYj2ZSL4PGOTEv9TqGw/exec

## Struktur
- index.html
- manifest.json
- service-worker.js
- icons/Panata_Icon_192.png

## Cara pakai
Upload seluruh isi folder ini ke static hosting yang menyediakan HTTPS
(GitHub Pages, Cloudflare Pages, Netlify, atau hosting HTTPS lain).

Kemudian buka URL HTTPS hasil hosting tersebut dari Safari iPhone.
Pilih Share -> Tambah ke Layar Utama -> pastikan "Buka sebagai App Web" aktif.

Penting:
- Jangan install URL script.google.com secara langsung.
- Yang dipasang ke Home Screen adalah URL PWA wrapper ini.
- Dashboard/backend tetap berada di Google Apps Script.
