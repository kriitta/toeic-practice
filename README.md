# 🦉 TOEIC Quest

เว็บไซต์ฝึกซ้อม TOEIC แบบเป็นด่าน — จัดตาม **Part จริงของข้อสอบ (Part 1–7)**
แต่ละ Part มีหลายด่าน เล่นจนผ่านครบทุกด่าน → Part นั้นจะเป็น 100%
มีทั้ง **Listening** (เสียงสังเคราะห์ในเบราว์เซอร์) และ **Reading**, เทคนิคทำข้อสอบแต่ละ Part
และระบบ **วิเคราะห์จุดอ่อน** ว่าพลาดเรื่องไหนบ่อย

## วิธีรัน

```bash
npm install
npm run dev      # เปิด http://localhost:5173
```

build เป็นเว็บไซต์ static (เอาขึ้นโฮสต์ที่ไหนก็ได้ เช่น Netlify, Vercel, GitHub Pages):

```bash
npm run build    # ได้โฟลเดอร์ dist/
npm run preview
```

## หน้าเว็บ

- **หน้าหลัก (Dashboard)** — ความคืบหน้ารวม, การ์ดทุก Part แยก Listening/Reading, แถบจุดอ่อน
- **หน้า Part** — รูปแบบข้อสอบจริง, ปุ่มดูเทคนิค, รายการด่าน (ปลดล็อกตามลำดับ)
- **หน้าเทคนิค** — เทคนิคทำข้อสอบของ Part นั้น ๆ
- **หน้าเล่นด่าน** — ทำข้อสอบทีละข้อ เฉลย + อธิบายภาษาไทยทันที
- **หน้าผลด่าน** — ต้องตอบถูกครบทุกข้อจึง "ผ่านด่าน"
- **หน้าสถิติ & จุดอ่อน** — ความคืบหน้าแต่ละ Part + หัวข้อที่ความแม่นยำต่ำสุด

## โครงสร้างไฟล์

| ไฟล์ | หน้าที่ |
|------|---------|
| `src/data/curriculum.ts` | **เนื้อหาทั้งหมด** — Part → tips → levels → questions (เพิ่มข้อสอบที่นี่) |
| `src/types.ts` | โครงสร้างข้อมูล Part/Level/Question 7 ชนิด + Progress |
| `src/lib/storage.ts` | เก็บความคืบหน้าใน localStorage + คำนวณ % รายด่าน/รายทักษะ + วิเคราะห์จุดอ่อน |
| `src/lib/speech.ts` | เล่นเสียงผ่าน Web Speech API (Part 1–4) |
| `src/screens/` | Dashboard, PartView, Tips, Level, Result, Insights |
| `src/components/` | NavBar, ProgressRing, QuestionView |

## ระบบจุดอ่อน (weakness tracking)

ทุกคำถามมี `tag` (หัวข้อย่อย เช่น `Prepositions`, `Main Idea`, `Verb Tense`)
ระบบจะนับว่าแต่ละหัวข้อตอบถูก/ผิดกี่ครั้ง แล้วเรียงหัวข้อที่ความแม่นยำต่ำสุดในหน้า "สถิติ & จุดอ่อน"

## เพิ่มเนื้อหาเอง

แก้ `src/data/curriculum.ts` — เพิ่ม `level` เข้าไปใน `levels` ของ Part ที่ต้องการ
แต่ละ question ใส่ `tag` ให้สื่อหัวข้อ (จะถูกนำไปวิเคราะห์จุดอ่อนอัตโนมัติ) ด่านใหม่ปลดล็อกตามลำดับเอง

> เนื้อหาทั้งหมดเขียนใหม่ในสไตล์ข้อสอบ TOEIC (ภาษาธุรกิจ/ในที่ทำงาน) ไม่ได้คัดลอกจากข้อสอบจริงที่มีลิขสิทธิ์

## 🔐 Login ด้วย Google + เก็บข้อมูลบนคลาวด์ (Firebase)

แอปเล่นได้เลยโดยไม่ต้องล็อกอิน (เก็บใน localStorage ของเครื่องนั้น) แต่ถ้าตั้งค่า Firebase
จะมีปุ่ม **"เข้าสู่ระบบ"** ด้วย Google เพื่อ sync ความคืบหน้า/ประวัติสอบ/highscore ข้ามอุปกรณ์

### ขั้นตอนตั้งค่า (ทำครั้งเดียว)

1. ไปที่ [Firebase Console](https://console.firebase.google.com/) → **Add project**
2. **Authentication → Sign-in method →** เปิด **Google**
3. **Firestore Database → Create database** (production mode) แล้วตั้ง **Rules** เป็น:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
4. **Project settings → Your apps → Web app (</>)** → คัดลอกค่า config มาใส่เป็น env vars
   (ดูชื่อตัวแปรใน [.env.example](.env.example)) — ใส่ใน `.env` (สำหรับรันในเครื่อง) และใน
   **Netlify → Site configuration → Environment variables** (สำหรับเว็บจริง)
5. **Authentication → Settings → Authorized domains →** เพิ่มโดเมน Netlify
   (เช่น `toeic-kriitta.netlify.app`) และ `localhost`
6. Deploy ใหม่ — ปุ่มเข้าสู่ระบบจะปรากฏขึ้นเอง

> ค่า `VITE_FIREBASE_*` เป็น public client config (เปิดเผยได้ตามปกติของ Firebase)
> ความปลอดภัยมาจาก Firestore Rules ที่อนุญาตให้ผู้ใช้เข้าถึงเฉพาะข้อมูลของตัวเอง

ไฟล์ที่เกี่ยวข้อง: [src/lib/firebase.ts](src/lib/firebase.ts) (init), [src/auth/AuthContext.tsx](src/auth/AuthContext.tsx) (สถานะล็อกอิน), [src/lib/cloud.ts](src/lib/cloud.ts) (sync + merge ข้อมูลกับ Firestore)
