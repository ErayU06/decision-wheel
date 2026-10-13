# Google Play store listing — Spinly

Ready-to-paste texts and form answers for Play Console. Character counts are checked against Play limits.

## 1. Main store listing

### English (default language)
**App name** (22/30)
```
Spinly: Decision Wheel
```
**Short description** (77/80)
```
Can't decide? Spin the wheel and let Spinly pick: food, movies, games & more.
```
**Full description** (929/4000)
```
Can't decide what to eat, what to watch or what to do tonight? Spin the wheel and let Spinly choose for you!

SPIN & DECIDE
• Smooth, colorful wheel with satisfying spin sounds and haptic feedback
• A fun result screen with confetti — and your answer is clear and final

READY-MADE PACKS
• What should I eat?
• What should I watch?
• What should I do?
• Which game should I play?
• What should I drink?

BUILD YOUR OWN WHEELS
• Create a wheel for anything: weekend plans, chores, team lunch, party games…
• Save your favorite wheels and spin them again with one tap

MORE FEATURES
• Spin history with date and time, easy to clear
• Custom wheel color palettes: Classic, Ocean, Sunset and Neon
• Light and dark themes
• English and Turkish, follows your device language

PRIVATE BY DESIGN
• No account, no ads, no tracking
• Everything stays on your device

Spinly makes small decisions fun. Download it and give the wheel a spin!
```

### Turkish (add as a translation: Türkçe – tr-TR)
**App name** (19/30)
```
Spinly: Karar Çarkı
```
**Short description** (63/80)
```
Karar veremiyor musun? Çarkı çevir, Spinly senin yerine seçsin.
```
**Full description** (869/4000)
```
Akşam ne yiyeceğine, ne izleyeceğine ya da ne yapacağına karar veremiyor musun? Çarkı çevir, Spinly senin yerine seçsin!

ÇEVİR VE KARAR VER
• Akıcı, renkli çark; tatmin edici ses ve titreşim geri bildirimi
• Konfetili eğlenceli sonuç ekranı — cevabın net ve kesin

HAZIR PAKETLER
• Ne yesem?
• Ne izlesem?
• Ne yapsam?
• Hangi oyunu oynasam?
• Hangi içeceği içsem?

KENDİ ÇARKINI OLUŞTUR
• Her şey için çark yap: hafta sonu planı, ev işleri, ekip yemeği, parti oyunları…
• Sevdiğin çarkları kaydet, tek dokunuşla tekrar çevir

DAHA FAZLASI
• Tarih ve saatli geçmiş, tek dokunuşla temizleme
• Çark renk paletleri: Klasik, Okyanus, Gün Batımı ve Neon
• Açık ve koyu tema
• Türkçe ve İngilizce, cihaz dilini takip eder

TASARIMDAN GİZLİ
• Hesap yok, reklam yok, takip yok
• Her şey yalnızca cihazında kalır

Spinly küçük kararları eğlenceye çevirir. İndir ve çarkı çevir!
```

### Graphics
| Field | File |
|---|---|
| App icon (512×512) | `store/graphics/play-store-icon-512.png` |
| Feature graphic (1024×500) | `store/graphics/feature-graphic-1024x500.png` |
| Phone screenshots (1080×1920) | `store/screenshots/01…05` |

### Other
- **App category:** Entertainment (alternative: Lifestyle)
- **Tags:** decision maker, random picker, spinner, wheel
- **Contact email:** _(your developer email — required, shown publicly)_
- **Privacy policy URL:** https://github.com/ErayU06/spinly-privacy/blob/main/PRIVACY.md
- **Website:** optional

## 2. Release notes (first release)
**en-US**
```
First release of Spinly! Spin the wheel to decide what to eat, watch, play or do — or build your own wheels.
```
**tr-TR**
```
Spinly'nin ilk sürümü! Ne yiyeceğine, ne izleyeceğine, ne oynayacağına karar vermek için çarkı çevir ya da kendi çarklarını oluştur.
```

## 3. App content (policy declarations)

| Section | Answer |
|---|---|
| Privacy policy | URL above |
| Ads | **No**, the app contains no ads |
| App access | **All functionality is available without special access** (no login) |
| Target audience | **13+** (or 18+). Not designed for children. Do not select under-13 groups — that triggers the Families policy |
| News app | No |
| COVID-19 contact tracing / status | No |
| Data safety — collects or shares user data | **No data collected, no data shared** |
| Data safety — data encrypted in transit / deletion request | Not applicable (no data leaves the device) |
| Government app | No |
| Financial features | No |
| Health features | No |
| Advertising ID | **No** (app does not use it) |

### Content rating questionnaire (IARC)
- Category: **Utility, Productivity, Communication, or Other** (not a game)
- Violence, sexual content, profanity, controlled substances, gambling / simulated gambling, user-generated content shared with others, location sharing, digital purchases: **No** to all
- Expected rating: **Everyone / PEGI 3**

## 4. App bundle
- Build with: `npx eas-cli@latest build -p android --profile production` → `.aab`
- First upload: **Internal testing** track, then promote
- Package name: `com.erayulusoy.spinly` (cannot be changed after the first upload)
- App signing: choose **Play App Signing** (default)

## 5. Notes
- **New personal developer accounts** (created after Nov 2023) must run a **closed test with 12+ testers for 14 days** before Production access. Organization accounts are exempt.
- The preset lists contain names of third-party games and films (e.g. Fortnite, GTA V, Inception). They are plain-text names used descriptively, but remove any you are unsure about.
