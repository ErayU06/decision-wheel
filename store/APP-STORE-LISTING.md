# App Store listing — Spinly

Ready-to-paste texts and form answers for App Store Connect. Character counts are checked against Apple limits.

## 1. App information
| Field | Value |
|---|---|
| Bundle ID | `com.erayulusoy.spinly` |
| SKU | `spinly-001` (any unique string) |
| Primary language | English (U.S.) — add Turkish as a localization |
| Primary category | Entertainment |
| Secondary category | Lifestyle |
| Price | Free |
| Support URL | https://github.com/ErayU06/spinly-privacy/issues |
| Privacy Policy URL | https://github.com/ErayU06/spinly-privacy/blob/main/PRIVACY.md |
| Copyright | © 2026 _(your name — check before submitting)_ |

> **Name availability:** App names are unique across the App Store. If "Spinly" is taken, App Store Connect will say so; the full name below already includes a descriptor.

## 2. English (U.S.)
**Name** (22/30)
```
Spinly: Decision Wheel
```
**Subtitle** (23/30)
```
Spin to decide anything
```
**Promotional text** (105/170)
```
Can't decide what to eat, watch or play? Spin the wheel and let Spinly choose. Build your own wheels too!
```
**Keywords** (89/100)
```
decision,wheel,spinner,random,picker,chooser,roulette,decide,what to eat,choose,spin,dice
```
**Description** (929/4000)
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

## 3. Turkish
**Name** (19/30)
```
Spinly: Karar Çarkı
```
**Subtitle** (16/30)
```
Çevir, karar ver
```
**Promotional text** (132/170)
```
Ne yiyeceğine, ne izleyeceğine ya da ne oynayacağına karar veremiyor musun? Çarkı çevir, Spinly seçsin. Kendi çarklarını da oluştur!
```
**Keywords** (75/100)
```
karar,çark,çevir,rastgele,seç,şans,ne yesem,ne izlesem,karar verici,spinner
```
**Description** (869/4000)
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

## 4. What's New (first version)
```
First release of Spinly! Spin the wheel to decide what to eat, watch, play or do — or build your own wheels.
```

## 5. Screenshots
iPhone **6.9"** (1320 × 2868) — files in `store/app-store-screenshots/` (JPEG, no alpha channel). The app is iPhone-only (`supportsTablet: false`), so iPad screenshots are not required.

## 6. App Privacy
- **Data collection:** *Data Not Collected*
- Tracking: none

## 7. Age rating questionnaire
All answers **None / No** (no violence, mature themes, gambling, medical content, unrestricted web access, or user-generated content). Expected rating: **4+**.

## 8. Export compliance
`ITSAppUsesNonExemptEncryption = false` is already set in the app, so the encryption question is skipped on upload.

## 9. App Review information
- **Sign-in required:** No
- **Notes:**
```
Spinly is a decision-wheel app. No account or login is needed and all functionality is available immediately.
Pick a ready-made pack (e.g. "What Should I Eat?") or create your own wheel, then tap SPIN.
All data (saved wheels, history, preferences) stays on the device. The app has no ads, no in-app purchases and no network features.
```

## 10. Build & submit
```bash
npx eas-cli@latest build -p ios --profile production
npx eas-cli@latest submit -p ios --latest
```
