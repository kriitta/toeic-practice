import type { Part } from '../types'

// All content is original, written in the style of the TOEIC test
// (workplace / everyday-business English). Explanations & tips are in Thai.
// Nothing is copied from copyrighted past papers.
//
// Part 1 uses real photographs from the Unsplash CDN. Each question was written
// to match the actual photo (verified visually).

const PHOTO = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`

export const PARTS: Part[] = [
  // ===================================================================== PART 1
  {
    id: 'part1',
    number: 1,
    title: 'Photographs',
    thaiTitle: 'บรรยายภาพ',
    skill: 'listening',
    icon: '📷',
    color: '#2dd4bf',
    blurb: 'ดูภาพถ่ายจริง ฟัง 4 ประโยค แล้วเลือกประโยคที่บรรยายภาพได้ถูกต้องที่สุด',
    format:
      'ข้อสอบจริง 6 ข้อ: เห็นภาพ 1 ภาพ ฟังประโยค A–D หนึ่งครั้ง (ไม่มีข้อความให้อ่าน) เลือกที่ตรงกับภาพมากที่สุด',
    tips: [
      {
        title: 'ฟังคำกริยาให้ดีที่สุด',
        detail:
          'TOEIC ชอบหลอกด้วย "การกระทำ (is V-ing)" กับ "สภาพ (is/has been V3)" เช่นเห็นรถจอดนิ่ง ถ้าได้ยิน "is being parked" (กำลังถูกจอด = ต้องมีคนขับอยู่) จะผิด ต้องเป็น "is parked"',
      },
      {
        title: 'ไม่มีคน = ตัดประโยคที่มีคน',
        detail:
          'ถ้าในภาพไม่มีคน ประโยคที่ขึ้นต้นด้วย He/She/They + กริยา ให้ตัดทิ้งได้ทันที เป็นกับดักที่เจอบ่อยมาก',
      },
      {
        title: 'มองภาพแบบกว้างก่อนเสียงเริ่ม',
        detail: 'ดูว่า "มีคนไหม–ทำอะไร–อยู่ที่ไหน–มีของอะไรเด่น" ภายใน 3 วินาทีแรก จะจับใจความได้ไวขึ้น',
      },
      {
        title: 'ระวังคำพ้องเสียง',
        detail: 'copy/coffee, walking/working, glass/grass มักถูกใช้เป็นกับดัก โฟกัสที่ภาพ ไม่ใช่คำที่คุ้นหู',
      },
    ],
    levels: [
      {
        id: 'p1l1',
        title: 'ด่าน 1 · คนกำลังทำอะไร',
        questions: [
          {
            kind: 'part1',
            id: 'p1l1q1',
            tag: 'Photo: Actions',
            image: PHOTO('1486312338219-ce68d2c6f44d'),
            emoji: '⌨️',
            scene: 'มือคนกำลังพิมพ์บนคีย์บอร์ดแล็ปท็อป',
            choices: [
              { id: 'a', text: 'A person is typing on a laptop.' },
              { id: 'b', text: 'A man is repairing a printer.' },
              { id: 'c', text: 'Someone is turning off a monitor.' },
              { id: 'd', text: 'A woman is writing on paper.' },
            ],
            answer: 'a',
            explain:
              'ในภาพเห็นมือวางบนคีย์บอร์ดแล็ปท็อปกำลังพิมพ์ → "typing on a laptop" ตรงที่สุด ส่วน b/c/d พูดถึงการกระทำ (ซ่อม/ปิดจอ/เขียนกระดาษ) ที่ไม่ปรากฏในภาพ',
            tip: 'สังเกต "มือสัมผัสคีย์บอร์ด" = typing ทันที อย่าหลงคำว่า laptop/monitor ที่ดูเกี่ยวข้องแต่กริยาผิด',
          },
          {
            kind: 'part1',
            id: 'p1l1q2',
            tag: 'Photo: Actions',
            image: PHOTO('1577219491135-ce391730fb2c'),
            emoji: '🧑‍🍳',
            scene: 'พ่อครัวกำลังตกแต่ง/เตรียมจานอาหารในครัว',
            choices: [
              { id: 'a', text: 'A man is preparing some food.' },
              { id: 'b', text: 'He is washing the dishes.' },
              { id: 'c', text: 'He is reading a menu.' },
              { id: 'd', text: 'He is pouring a drink.' },
            ],
            answer: 'a',
            explain:
              'ชายใส่ผ้ากันเปื้อนกำลังจัด/เตรียมอาหารบนจาน → "preparing some food" ตัวลวง b/c/d เป็นกริยาอื่น (ล้างจาน/อ่านเมนู/รินเครื่องดื่ม) ที่ไม่ตรงกับภาพ',
            tip: 'เห็นมือกำลัง "ทำอะไรกับอาหาร" บนเคาน์เตอร์ครัว → คำกว้าง ๆ อย่าง prepare food มักเป็นคำตอบที่ปลอดภัยที่สุด',
          },
          {
            kind: 'part1',
            id: 'p1l1q3',
            tag: 'Photo: Actions',
            image: PHOTO('1521737604893-d14cc237f11d'),
            emoji: '💻',
            scene: 'กลุ่มคนนั่งรอบโต๊ะยาว ทำงานกับแล็ปท็อป',
            choices: [
              { id: 'a', text: 'Some people are seated around a table.' },
              { id: 'b', text: 'They are shaking hands.' },
              { id: 'c', text: 'They are leaving the room.' },
              { id: 'd', text: 'The room is completely empty.' },
            ],
            answer: 'a',
            explain:
              'หลายคนนั่งล้อมโต๊ะใช้แล็ปท็อป → "seated around a table" ตรงที่สุด b (จับมือ) ไม่เห็นในภาพ, c (กำลังออกจากห้อง) ไม่ใช่, d (ห้องว่าง) ขัดกับภาพที่มีคนเต็ม',
            tip: 'เมื่อมีคนหลายคน ให้เลือกประโยคที่บรรยาย "ท่าทางรวม" ที่ทุกคนทำเหมือนกัน (นั่ง/ยืน) มักถูกกว่าประโยคที่เจาะจงการกระทำเดียว',
          },
          {
            kind: 'part1',
            id: 'p1l1q4',
            tag: 'Photo: Actions',
            image: PHOTO('1503387762-592deb58ef4e'),
            emoji: '📐',
            scene: 'ชายกำลังเขียน/ดูแบบแปลนบนโต๊ะ มีไม้บรรทัด',
            choices: [
              { id: 'a', text: 'A man is looking at some drawings.' },
              { id: 'b', text: 'He is painting a wall.' },
              { id: 'c', text: 'He is folding his clothes.' },
              { id: 'd', text: 'He is typing on a phone.' },
            ],
            answer: 'a',
            explain:
              'ชายถือปากกาดู/เขียนแบบแปลนบนกระดาษ → "looking at some drawings" ตรงที่สุด ตัวลวงเป็นกริยาที่ไม่เกี่ยวเลย (ทาสี/พับเสื้อ/พิมพ์มือถือ)',
            tip: 'มีเอกสาร/แบบบนโต๊ะ + คนก้มดู → กริยา look at / examine / review เป็นกลุ่มคำตอบที่ควรเล็งไว้',
          },
        ],
      },
      {
        id: 'p1l2',
        title: 'ด่าน 2 · สิ่งของและสถานที่',
        questions: [
          {
            kind: 'part1',
            id: 'p1l2q1',
            tag: 'Photo: Objects/Location',
            image: PHOTO('1507842217343-583bb7270b66'),
            emoji: '📚',
            scene: 'ชั้นวางหนังสือเต็มไปด้วยหนังสือจำนวนมาก',
            choices: [
              { id: 'a', text: 'The shelves are filled with books.' },
              { id: 'b', text: 'The books are stacked on the floor.' },
              { id: 'c', text: 'A woman is reading a book.' },
              { id: 'd', text: 'The shelves are completely empty.' },
            ],
            answer: 'a',
            explain:
              'ภาพเป็นชั้นที่อัดแน่นด้วยหนังสือ → "shelves are filled with books" c มีคน (ในภาพไม่มีคน) ตัดทิ้ง, b/d ขัดกับภาพ',
            tip: 'ไม่มีคนในภาพ → ตัดทุกประโยคที่มี a man/woman/he/she ทันที เหลือเลือกเฉพาะประโยคที่บรรยายสิ่งของ',
          },
          {
            kind: 'part1',
            id: 'p1l2q2',
            tag: 'Photo: Objects/Location',
            image: PHOTO('1506521781263-d8422e82f27a'),
            emoji: '🅿️',
            scene: 'ลานจอดรถมองจากด้านบน รถจอดเรียงเป็นแถว',
            choices: [
              { id: 'a', text: 'Cars are parked in rows.' },
              { id: 'b', text: 'The cars are being washed.' },
              { id: 'c', text: 'People are getting into their cars.' },
              { id: 'd', text: 'The parking lot is empty.' },
            ],
            answer: 'a',
            explain:
              'รถจอดนิ่งเรียงเป็นแถว → "parked in rows" ระวัง b "are being washed" = กำลังถูกล้าง (ต้องมีคนล้าง ซึ่งไม่มี), c มีคน (ไม่เห็น), d ลานว่าง (ขัดกับภาพ)',
            tip: 'กับดักคลาสสิก Part 1: "is being + V3" แปลว่ามีคนกำลังลงมือทำอยู่ ถ้าในภาพไม่เห็นคนทำ ให้ตัดทิ้งเสมอ',
          },
          {
            kind: 'part1',
            id: 'p1l2q3',
            tag: 'Photo: Objects/Location',
            image: PHOTO('1519494026892-80bbd2d6fd0d'),
            emoji: '🏢',
            scene: 'โถงต้อนรับมีเคาน์เตอร์โค้ง ไฟเพดานเปิดอยู่ ไม่มีคน',
            choices: [
              { id: 'a', text: 'A counter is located in the lobby.' },
              { id: 'b', text: 'People are waiting in a long line.' },
              { id: 'c', text: 'A man is mopping the floor.' },
              { id: 'd', text: 'The lights have been turned off.' },
            ],
            answer: 'a',
            explain:
              'มีเคาน์เตอร์ต้อนรับในโถง → "A counter is located in the lobby" b/c มีคน (ในภาพไม่มีคน) ตัดทิ้ง, d บอกไฟปิด แต่ในภาพไฟเปิดอยู่',
            tip: 'ภาพ "สถานที่ว่าง ๆ ไม่มีคน" คำตอบมักเป็นประโยคบอกตำแหน่งของวัตถุ (is located / there is) และมักมีตัวลวงเป็นประโยคที่ใส่คนเข้ามา',
          },
          {
            kind: 'part1',
            id: 'p1l2q4',
            tag: 'Photo: Objects/Location',
            image: PHOTO('1497515114629-f71d768fd07c'),
            emoji: '☕',
            scene: 'ถ้วยกาแฟสีขาววางบนจานรอง มีเมล็ดกาแฟรอบ ๆ',
            choices: [
              { id: 'a', text: 'A cup has been placed on a saucer.' },
              { id: 'b', text: 'A waiter is pouring some coffee.' },
              { id: 'c', text: 'Someone is drinking from the cup.' },
              { id: 'd', text: 'The cup has been knocked over.' },
            ],
            answer: 'a',
            explain:
              'ถ้วยตั้งอยู่บนจานรอง (สภาพ) → "has been placed on a saucer" b/c มีคน (ไม่เห็นในภาพ), d บอกถ้วยล้มคว่ำ แต่ในภาพตั้งปกติ',
            tip: 'present perfect passive (has been placed/arranged) ใช้บรรยาย "สภาพที่จัดวางไว้แล้ว" เหมาะกับภาพนิ่งที่ไม่มีคนทำกริยา',
          },
        ],
      },
    ],
  },

  // ===================================================================== PART 2
  {
    id: 'part2',
    number: 2,
    title: 'Question–Response',
    thaiTitle: 'ถาม–ตอบ',
    skill: 'listening',
    icon: '🎙️',
    color: '#22c55e',
    blurb: 'ฟังคำถามหรือประโยค แล้วเลือกการตอบที่เหมาะสมที่สุดจาก 3 ตัวเลือก',
    format: 'ข้อสอบจริง 25 ข้อ: ฟังคำถาม/ประโยค 1 ครั้ง แล้วฟังคำตอบ A–C เลือกที่ตอบรับได้ดีที่สุด',
    tips: [
      {
        title: 'จับคำขึ้นต้น WH ให้ได้',
        detail:
          'Who→คน, Where→ที่, When→เวลา, Why→เหตุผล (มี because/to), How→วิธี/จำนวน ถ้าจับคำแรกได้ มักตัดช้อยผิดได้ทันที',
      },
      {
        title: 'ระวังคำซ้ำ = กับดัก',
        detail:
          'ช้อยที่มีคำเสียงเหมือนในคำถาม (คำถามมี "report" ช้อยมี "important") มักเป็นกับดัก อย่าเลือกเพราะคุ้นหู',
      },
      {
        title: 'คำตอบอ้อม ๆ ก็ถูกได้',
        detail: 'ถาม "Where is the manager?" ตอบ "She is on a business trip." ก็ถูก เพราะตอบเป็นนัย ไม่ต้องตรงตัว',
      },
      {
        title: 'WH ไม่ตอบ Yes/No',
        detail: 'คำถาม WH (Who/Where/When/Why/How) ตอบด้วย Yes/No ไม่ได้ ตัดทิ้งได้เลย',
      },
    ],
    levels: [
      {
        id: 'p2l1',
        title: 'ด่าน 1 · คำถาม WH',
        questions: [
          {
            kind: 'part2',
            id: 'p2l1q1',
            tag: 'WH Questions',
            audio: 'Where did you put the meeting agenda?',
            choices: [
              { id: 'a', text: 'On your desk, next to the laptop.' },
              { id: 'b', text: 'At two in the afternoon.' },
              { id: 'c', text: 'Yes, I prepared it.' },
            ],
            answer: 'a',
            explain:
              'Where ถามสถานที่ → "On your desk" ตอบที่ตั้ง ถูกต้อง b ตอบเวลา (ผิดประเภท), c เป็น Yes ซึ่งใช้ตอบ WH ไม่ได้',
            tip: 'ได้ยิน "Where" ปุ๊บ ให้รอฟังคำบอกสถานที่ (on/at/in/next to) แล้วตัดช้อยที่เป็นเวลา/Yes-No ทิ้ง',
          },
          {
            kind: 'part2',
            id: 'p2l1q2',
            tag: 'WH Questions',
            audio: 'Who is in charge of the new project?',
            choices: [
              { id: 'a', text: 'In the main office.' },
              { id: 'b', text: 'Ms. Carter from marketing.' },
              { id: 'c', text: 'Next Monday.' },
            ],
            answer: 'b',
            explain: 'Who ถามคน → ตอบชื่อคน "Ms. Carter" a ตอบที่ และ c ตอบเวลา จึงผิดประเภท',
            tip: '"Who" → ฟังหาชื่อคน/ตำแหน่ง/สรรพนาม ถ้าช้อยตอบเป็นสถานที่หรือเวลา ตัดทิ้งได้เลย',
          },
          {
            kind: 'part2',
            id: 'p2l1q3',
            tag: 'WH Questions',
            audio: 'Why was the shipment delayed?',
            choices: [
              { id: 'a', text: 'By express courier.' },
              { id: 'b', text: 'Because of a customs problem.' },
              { id: 'c', text: 'About fifty boxes.' },
            ],
            answer: 'b',
            explain: 'Why ถามเหตุผล → คำตอบมักมี "Because…" a ตอบวิธีส่ง, c ตอบจำนวน จึงไม่ใช่เหตุผล',
            tip: '"Why" → ล็อกหาคำว่า Because / Due to / To + verb ถ้าไม่มีคำพวกนี้ มักไม่ใช่คำตอบ',
          },
          {
            kind: 'part2',
            id: 'p2l1q4',
            tag: 'WH Questions',
            audio: 'How long does the training session last?',
            choices: [
              { id: 'a', text: 'In the conference room.' },
              { id: 'b', text: 'It’s very useful.' },
              { id: 'c', text: 'About two hours.' },
            ],
            answer: 'c',
            explain: 'How long ถามระยะเวลา → "About two hours" a ตอบสถานที่, b ให้ความเห็น จึงไม่ตอบคำถาม',
            tip: 'แยก How เฉย ๆ กับ How long/How much/How many ให้ดี — "How long" ต้องการ "ระยะเวลา" เท่านั้น',
          },
        ],
      },
      {
        id: 'p2l2',
        title: 'ด่าน 2 · Yes/No และ Tag',
        questions: [
          {
            kind: 'part2',
            id: 'p2l2q1',
            tag: 'Yes/No Questions',
            audio: 'Have you finished the quarterly report?',
            choices: [
              { id: 'a', text: 'Not yet, I need one more day.' },
              { id: 'b', text: 'On the fourth floor.' },
              { id: 'c', text: 'He is the new accountant.' },
            ],
            answer: 'a',
            explain:
              'คำถาม Yes/No เรื่อง "ทำเสร็จหรือยัง" → "Not yet" (ยังไม่เสร็จ) ตอบสถานะได้ตรง b/c ตอบคนละเรื่อง',
            tip: 'คำถาม Have you…? ไม่จำเป็นต้องตอบ Yes/No เป๊ะ ๆ คำว่า "Not yet / Already / Almost" ก็คือคำตอบของสถานะการทำงาน',
          },
          {
            kind: 'part2',
            id: 'p2l2q2',
            tag: 'Tag Questions',
            audio: 'You’re joining the conference call, aren’t you?',
            choices: [
              { id: 'a', text: 'A great presentation.' },
              { id: 'b', text: 'Yes, I’ll be there.' },
              { id: 'c', text: 'It was last week.' },
            ],
            answer: 'b',
            explain: 'Tag question เป็นการขอคำยืนยัน → "Yes, I’ll be there." ยืนยันว่าจะเข้าร่วม',
            tip: 'ส่วนหาง "…, aren’t you? / …, right?" คือการถามให้ยืนยัน ให้โฟกัสที่ประโยคหลัก แล้วตอบ Yes/No ตามจริง',
          },
          {
            kind: 'part2',
            id: 'p2l2q3',
            tag: 'Yes/No Questions',
            audio: 'Did the client approve the design?',
            choices: [
              { id: 'a', text: 'Yes, with a few small changes.' },
              { id: 'b', text: 'In about an hour.' },
              { id: 'c', text: 'The blue one.' },
            ],
            answer: 'a',
            explain: 'ถาม Yes/No → "Yes, with a few small changes." ตอบรับพร้อมเงื่อนไข b ตอบเวลา, c ตอบสี',
            tip: 'คำตอบที่ดีมักเป็น "Yes/No + รายละเอียดเสริม" ระวังช้อยที่ตอบรายละเอียด (เวลา/สี) แต่ไม่ตอบว่าอนุมัติไหม',
          },
          {
            kind: 'part2',
            id: 'p2l2q4',
            tag: 'Indirect Responses',
            audio: 'When will the budget be ready?',
            choices: [
              { id: 'a', text: 'You should ask the finance team.' },
              { id: 'b', text: 'It costs too much.' },
              { id: 'c', text: 'Yes, it is ready.' },
            ],
            answer: 'a',
            explain:
              'คำตอบอ้อม "ไปถามฝ่ายการเงิน" ตอบ When ได้อย่างเหมาะสม (ฉันไม่รู้ ลองถามคนที่รู้) c เป็น Yes ตอบ When ไม่ได้',
            tip: 'คำตอบแนว "I don’t know / Ask someone else / Let me check" เป็นคำตอบอ้อมที่ถูกบ่อยใน TOEIC อย่ารีบตัดทิ้ง',
          },
        ],
      },
      {
        id: 'p2l3',
        title: 'ด่าน 3 · ข้อเสนอและคำขอ',
        questions: [
          {
            kind: 'part2',
            id: 'p2l3q1',
            tag: 'Statements/Offers',
            audio: 'Would you like me to email you the file?',
            choices: [
              { id: 'a', text: 'That would be great, thanks.' },
              { id: 'b', text: 'At the post office.' },
              { id: 'c', text: 'No, he didn’t.' },
            ],
            answer: 'a',
            explain: 'ข้อเสนอ "Would you like me to…?" → ตอบรับ "That would be great, thanks."',
            tip: '"Would you like…/ Shall I…/ Do you want me to…" คือการเสนอความช่วยเหลือ → คำตอบเป็นการรับ/ปฏิเสธคำเสนอ',
          },
          {
            kind: 'part2',
            id: 'p2l3q2',
            tag: 'Statements/Offers',
            audio: 'Could you help me move these boxes?',
            choices: [
              { id: 'a', text: 'Sure, just give me a minute.' },
              { id: 'b', text: 'It’s a heavy box.' },
              { id: 'c', text: 'They moved last year.' },
            ],
            answer: 'a',
            explain: 'คำขอความช่วยเหลือ → ตอบรับ "Sure, just give me a minute." c ใช้คำซ้ำ "moved" เป็นกับดัก',
            tip: 'คำขอ Could you…? ตอบด้วยการตกลง/ขอเวลา (Sure / Of course / I’m a bit busy) ระวังช้อยที่เอาคำในคำถามมาวนเป็นกับดัก',
          },
          {
            kind: 'part2',
            id: 'p2l3q3',
            tag: 'Indirect Responses',
            audio: 'The printer on this floor isn’t working again.',
            choices: [
              { id: 'a', text: 'You can use the one upstairs.' },
              { id: 'b', text: 'I printed two copies.' },
              { id: 'c', text: 'Yes, please.' },
            ],
            answer: 'a',
            explain: 'เป็นประโยคบอกปัญหา ไม่ใช่คำถาม → คำตอบที่ดีคือเสนอทางออก "use the one upstairs"',
            tip: 'ถ้าได้ยิน "ประโยคบอกปัญหา" (…isn’t working / …is broken) ให้มองหาช้อยที่ "เสนอวิธีแก้" มักเป็นคำตอบ',
          },
          {
            kind: 'part2',
            id: 'p2l3q4',
            tag: 'Statements/Offers',
            audio: 'Why don’t we take a short break?',
            choices: [
              { id: 'a', text: 'Good idea, I need some coffee.' },
              { id: 'b', text: 'It broke this morning.' },
              { id: 'c', text: 'On the second shelf.' },
            ],
            answer: 'a',
            explain: '"Why don’t we…?" เป็นการชวน ไม่ใช่ถามเหตุผล → ตอบรับ "Good idea" b ใช้คำพ้อง break/broke ลวง',
            tip: '"Why don’t we / Let’s / How about" = ชักชวน ตอบด้วยการเห็นด้วย/ไม่เห็นด้วย อย่าหลงตอบเป็น "เหตุผล" เหมือนคำถาม Why ปกติ',
          },
        ],
      },
    ],
  },

  // ===================================================================== PART 3
  {
    id: 'part3',
    number: 3,
    title: 'Conversations',
    thaiTitle: 'บทสนทนา',
    skill: 'listening',
    icon: '💬',
    color: '#a855f7',
    blurb: 'ฟังบทสนทนา 2–3 คน แล้วตอบคำถามจับใจความและรายละเอียด',
    format: 'ข้อสอบจริง 39 ข้อ (13 บทสนทนา × 3 คำถาม): ฟัง 1 ครั้ง มีคำถามและช้อยให้อ่าน',
    tips: [
      {
        title: 'อ่านคำถามก่อนฟัง',
        detail: 'ช่วงอ่านคำสั่ง ให้รีบกวาดตาอ่าน 3 คำถามล่วงหน้า จะรู้ว่าต้องฟังหา "ใคร/อะไร/ที่ไหน"',
      },
      {
        title: 'ลำดับคำถาม = ลำดับบทสนทนา',
        detail: 'คำถามข้อ 1-2-3 มักเรียงตามที่พูด ต้นบท–กลางบท–ท้ายบท จับจังหวะตามได้',
      },
      {
        title: 'ฟังเจตนา/อารมณ์',
        detail: 'ข้อ "What does the man imply/mean?" ต้องฟังน้ำเสียงและบริบท ไม่ใช่แปลตรงตัว',
      },
      {
        title: 'จับ "ขั้นตอนถัดไป"',
        detail: 'คำถามท้ายมักถาม "What will the man do next?" คำตอบมักอยู่ประโยคสุดท้าย ๆ',
      },
    ],
    levels: [
      {
        id: 'p3l1',
        title: 'ด่าน 1 · บริการลูกค้า',
        questions: [
          {
            kind: 'part3',
            id: 'p3l1q1',
            tag: 'Conversation: Gist',
            script:
              'M: Hello, I ordered a desk lamp last week, but the one that arrived is the wrong color.\nW: I’m sorry about that. Would you like a replacement or a refund?\nM: A replacement, please. I really need it for my home office.\nW: Of course. I’ll send the correct one today, and you can keep the wrong one.',
            question: 'What is the problem?',
            choices: [
              { id: 'a', text: 'The item arrived in the wrong color.' },
              { id: 'b', text: 'The lamp was too expensive.' },
              { id: 'c', text: 'The delivery never arrived.' },
              { id: 'd', text: 'The store is closed.' },
            ],
            answer: 'a',
            explain: 'ผู้ชายบอก "the one that arrived is the wrong color" → ปัญหาคือสีผิด',
            tip: 'คำถาม "What is the problem?" คำตอบมักอยู่ประโยคแรก ๆ ฟังหาคำว่า but / unfortunately / problem / wrong',
          },
          {
            kind: 'part3',
            id: 'p3l1q2',
            tag: 'Conversation: Detail',
            script:
              'M: Hello, I ordered a desk lamp last week, but the one that arrived is the wrong color.\nW: I’m sorry about that. Would you like a replacement or a refund?\nM: A replacement, please. I really need it for my home office.\nW: Of course. I’ll send the correct one today, and you can keep the wrong one.',
            question: 'What does the man decide to do?',
            choices: [
              { id: 'a', text: 'Get a refund' },
              { id: 'b', text: 'Get a replacement' },
              { id: 'c', text: 'Visit the store' },
              { id: 'd', text: 'Cancel the order' },
            ],
            answer: 'b',
            explain: 'พอถูกถามให้เลือก เขาตอบ "A replacement, please." → ขอของชิ้นใหม่',
            tip: 'เมื่อมีตัวเลือกในบท (replacement or refund) ให้ฟังให้ชัดว่าผู้พูด "เลือกอันไหน" ตัวลวงมักเป็นอีกตัวเลือกที่ถูกพูดถึงแต่ไม่ได้เลือก',
          },
          {
            kind: 'part3',
            id: 'p3l1q3',
            tag: 'Conversation: Next Action',
            script:
              'M: Hello, I ordered a desk lamp last week, but the one that arrived is the wrong color.\nW: I’m sorry about that. Would you like a replacement or a refund?\nM: A replacement, please. I really need it for my home office.\nW: Of course. I’ll send the correct one today, and you can keep the wrong one.',
            question: 'What will the woman do?',
            choices: [
              { id: 'a', text: 'Send the correct item today' },
              { id: 'b', text: 'Charge an extra fee' },
              { id: 'c', text: 'Ask him to return the lamp' },
              { id: 'd', text: 'Close his account' },
            ],
            answer: 'a',
            explain: 'ผู้หญิงบอก "I’ll send the correct one today" และให้เก็บอันเดิมไว้ ไม่ต้องคืน',
            tip: '"What will … do (next)?" คำตอบอยู่ท้ายบท ฟังประโยคที่ขึ้นต้น "I’ll… / I’m going to…" คือสิ่งที่จะทำต่อไป',
          },
        ],
      },
      {
        id: 'p3l2',
        title: 'ด่าน 2 · เรื่องในที่ทำงาน',
        questions: [
          {
            kind: 'part3',
            id: 'p3l2q1',
            tag: 'Conversation: Gist',
            script:
              'W: Tom, have you seen the schedule for next week? I can’t find it on the shared drive.\nM: Oh, they moved everything to the new project app yesterday.\nW: Really? Nobody told me. How do I log in?\nM: I’ll forward you the invitation email. Check your inbox in a few minutes.',
            question: 'What are the speakers mainly discussing?',
            choices: [
              { id: 'a', text: 'A new office location' },
              { id: 'b', text: 'Where to find the schedule' },
              { id: 'c', text: 'A customer complaint' },
              { id: 'd', text: 'A job interview' },
            ],
            answer: 'b',
            explain: 'ผู้หญิงหาตารางเวลาไม่เจอ ทั้งคู่จึงคุยเรื่อง "ตารางอยู่ที่ไหน/เข้าระบบยังไง"',
            tip: 'คำถามภาพรวม ให้ฟัง "ประโยคเปิดบท" เป็นหลัก อย่าเอาคำเดียว (app, email) มาตัดสินทั้งบท',
          },
          {
            kind: 'part3',
            id: 'p3l2q2',
            tag: 'Conversation: Detail',
            script:
              'W: Tom, have you seen the schedule for next week? I can’t find it on the shared drive.\nM: Oh, they moved everything to the new project app yesterday.\nW: Really? Nobody told me. How do I log in?\nM: I’ll forward you the invitation email. Check your inbox in a few minutes.',
            question: 'Why can’t the woman find the schedule?',
            choices: [
              { id: 'a', text: 'It was deleted by mistake.' },
              { id: 'b', text: 'It was moved to a new app.' },
              { id: 'c', text: 'She forgot her password.' },
              { id: 'd', text: 'The drive is broken.' },
            ],
            answer: 'b',
            explain: 'ผู้ชายอธิบาย "they moved everything to the new project app yesterday"',
            tip: 'คำถาม Why ในบทสนทนา ให้ฟังประโยคที่อีกฝ่าย "อธิบายสาเหตุ" ตอบกลับ มักตามหลังคำถามหรือคำว่า because/Oh,',
          },
          {
            kind: 'part3',
            id: 'p3l2q3',
            tag: 'Conversation: Next Action',
            script:
              'W: Tom, have you seen the schedule for next week? I can’t find it on the shared drive.\nM: Oh, they moved everything to the new project app yesterday.\nW: Really? Nobody told me. How do I log in?\nM: I’ll forward you the invitation email. Check your inbox in a few minutes.',
            question: 'What will the man do next?',
            choices: [
              { id: 'a', text: 'Forward an invitation email' },
              { id: 'b', text: 'Print the schedule' },
              { id: 'c', text: 'Call the IT department' },
              { id: 'd', text: 'Reschedule the meeting' },
            ],
            answer: 'a',
            explain: '"I’ll forward you the invitation email." คือสิ่งที่ผู้ชายจะทำต่อ',
            tip: 'ประโยคปิดท้าย "I’ll forward you…" = ขั้นตอนถัดไป จำสูตร: คำตอบของข้อสุดท้ายมักอยู่ที่บรรทัดสุดท้ายของบท',
          },
        ],
      },
    ],
  },

  // ===================================================================== PART 4
  {
    id: 'part4',
    number: 4,
    title: 'Short Talks',
    thaiTitle: 'บทพูด/ประกาศ',
    skill: 'listening',
    icon: '📢',
    color: '#6366f1',
    blurb: 'ฟังบทพูดคนเดียว เช่น ประกาศ ข้อความเสียง โฆษณา แล้วตอบคำถาม',
    format: 'ข้อสอบจริง 30 ข้อ (10 บทพูด × 3 คำถาม): ฟัง 1 ครั้ง อ่านคำถามและช้อยประกอบ',
    tips: [
      {
        title: 'รู้ประเภทบทพูดจากต้นบท',
        detail: '"Thank you for calling…" = ข้อความโทรศัพท์, "Attention shoppers…" = ประกาศในห้าง',
      },
      {
        title: 'จับ "ใครพูดกับใคร"',
        detail: 'ระบุผู้พูด (ไกด์/ผู้จัดการ/พนักงาน) และผู้ฟัง ช่วยตอบ "Who is the speaker/audience?"',
      },
      {
        title: 'ฟังตัวเลข วันเวลา สถานที่',
        detail: 'Part 4 ชอบถามรายละเอียด เช่นเวลา ราคา เที่ยวบิน ให้จดสั้น ๆ ระหว่างฟัง',
      },
      {
        title: 'คำสั่ง/คำแนะนำตอนท้าย',
        detail: 'มักลงท้ายด้วย "Please…" บอกให้ผู้ฟังทำอะไรต่อ ซึ่งเป็นคำตอบข้อสุดท้ายบ่อย ๆ',
      },
    ],
    levels: [
      {
        id: 'p4l1',
        title: 'ด่าน 1 · ประกาศ',
        questions: [
          {
            kind: 'part4',
            id: 'p4l1q1',
            tag: 'Talk: Purpose',
            script:
              'Attention shoppers. The store will be closing in fifteen minutes. Please bring your final purchases to the checkout counters on the ground floor. Our weekend sale continues tomorrow, with up to forty percent off all electronics. Thank you for shopping with us.',
            question: 'Where is this announcement being made?',
            choices: [
              { id: 'a', text: 'In a store' },
              { id: 'b', text: 'At an airport' },
              { id: 'c', text: 'In a library' },
              { id: 'd', text: 'At a train station' },
            ],
            answer: 'a',
            explain: '"Attention shoppers… closing… checkout counters" บ่งบอกชัดว่าเป็นร้านค้า/ห้าง',
            tip: 'คำถาม "ที่ไหน/ใครฟัง" ให้ฟังคำเรียกผู้ฟังคำแรก (shoppers/passengers/guests) เป็นตัวชี้สถานที่ที่แม่นที่สุด',
          },
          {
            kind: 'part4',
            id: 'p4l1q2',
            tag: 'Talk: Detail',
            script:
              'Attention shoppers. The store will be closing in fifteen minutes. Please bring your final purchases to the checkout counters on the ground floor. Our weekend sale continues tomorrow, with up to forty percent off all electronics. Thank you for shopping with us.',
            question: 'What discount is mentioned for tomorrow?',
            choices: [
              { id: 'a', text: 'Up to 15% off' },
              { id: 'b', text: 'Up to 40% off electronics' },
              { id: 'c', text: 'Buy one get one free' },
              { id: 'd', text: 'Free delivery' },
            ],
            answer: 'b',
            explain: '"up to forty percent off all electronics" ระวังเลข fifteen (นาที) ที่เอามาลวงเป็น 15%',
            tip: 'ข้อถามตัวเลข มักมีตัวเลขหลายตัวในบท (15 นาที / 40%) ต้องจับให้ตรงว่าเลขไหนคู่กับเรื่องอะไร',
          },
          {
            kind: 'part4',
            id: 'p4l1q3',
            tag: 'Talk: Next Action',
            script:
              'Attention shoppers. The store will be closing in fifteen minutes. Please bring your final purchases to the checkout counters on the ground floor. Our weekend sale continues tomorrow, with up to forty percent off all electronics. Thank you for shopping with us.',
            question: 'What are listeners asked to do?',
            choices: [
              { id: 'a', text: 'Go to the checkout counters' },
              { id: 'b', text: 'Leave through the back door' },
              { id: 'c', text: 'Register for a card' },
              { id: 'd', text: 'Return their items' },
            ],
            answer: 'a',
            explain: '"Please bring your final purchases to the checkout counters"',
            tip: 'ประโยคที่ขึ้นต้นด้วย "Please…" คือคำสั่งถึงผู้ฟัง = คำตอบของข้อ "ผู้ฟังถูกขอให้ทำอะไร"',
          },
        ],
      },
      {
        id: 'p4l2',
        title: 'ด่าน 2 · ข้อความเสียง',
        questions: [
          {
            kind: 'part4',
            id: 'p4l2q1',
            tag: 'Talk: Purpose',
            script:
              'Hi, this is Daniel from Greenline Plumbing. I’m calling about your appointment scheduled for Thursday morning. Unfortunately, our technician is fully booked that day, so I’d like to move your visit to Friday at 10 a.m. Please call me back at 555-0192 to confirm. Thank you.',
            question: 'Why is the speaker calling?',
            choices: [
              { id: 'a', text: 'To reschedule an appointment' },
              { id: 'b', text: 'To offer a refund' },
              { id: 'c', text: 'To sell a new product' },
              { id: 'd', text: 'To confirm a delivery address' },
            ],
            answer: 'a',
            explain: '"I’d like to move your visit to Friday" = ขอเลื่อนนัด คำว่า Unfortunately บอกว่ามีปัญหากับนัดเดิม',
            tip: 'จุดประสงค์ของสายโทรศัพท์มักอยู่หลัง "I’m calling about/to…" ฟังประโยคนี้ให้ดี เป็นหัวใจของบท',
          },
          {
            kind: 'part4',
            id: 'p4l2q2',
            tag: 'Talk: Detail',
            script:
              'Hi, this is Daniel from Greenline Plumbing. I’m calling about your appointment scheduled for Thursday morning. Unfortunately, our technician is fully booked that day, so I’d like to move your visit to Friday at 10 a.m. Please call me back at 555-0192 to confirm. Thank you.',
            question: 'What new time is suggested?',
            choices: [
              { id: 'a', text: 'Thursday morning' },
              { id: 'b', text: 'Friday at 10 a.m.' },
              { id: 'c', text: 'Saturday afternoon' },
              { id: 'd', text: 'Monday at noon' },
            ],
            answer: 'b',
            explain: '"move your visit to Friday at 10 a.m." คือเวลาใหม่ ส่วน Thursday คือเวลาเดิมที่ยกเลิก',
            tip: 'เมื่อมี "เวลาเดิม vs เวลาใหม่" ให้ผูกกับคำว่า move to / change to / instead เพื่อจับเวลาที่ "ใหม่" ไม่ใช่เวลาเดิม',
          },
          {
            kind: 'part4',
            id: 'p4l2q3',
            tag: 'Talk: Next Action',
            script:
              'Hi, this is Daniel from Greenline Plumbing. I’m calling about your appointment scheduled for Thursday morning. Unfortunately, our technician is fully booked that day, so I’d like to move your visit to Friday at 10 a.m. Please call me back at 555-0192 to confirm. Thank you.',
            question: 'What should the listener do?',
            choices: [
              { id: 'a', text: 'Call back to confirm' },
              { id: 'b', text: 'Send an email' },
              { id: 'c', text: 'Visit the office' },
              { id: 'd', text: 'Pay a deposit' },
            ],
            answer: 'a',
            explain: '"Please call me back at 555-0192 to confirm."',
            tip: 'อีกครั้ง: ประโยค "Please…" ตอนท้าย = สิ่งที่ผู้ฟังต้องทำ จำสูตรนี้ใช้ได้เกือบทุกบทประกาศ/ข้อความเสียง',
          },
        ],
      },
    ],
  },

  // ===================================================================== PART 5
  {
    id: 'part5',
    number: 5,
    title: 'Incomplete Sentences',
    thaiTitle: 'เติมประโยค',
    skill: 'reading',
    icon: '✏️',
    color: '#3b82f6',
    blurb: 'เลือกคำ/วลีเติมช่องว่างให้ถูกหลักไวยากรณ์และความหมาย',
    format: 'ข้อสอบจริง 30 ข้อ: ประโยคมีช่องว่าง เลือก A–D ที่เหมาะที่สุด เน้นไวยากรณ์และคำศัพท์',
    tips: [
      {
        title: 'ดูช้อยก่อนเพื่อรู้ว่าถามอะไร',
        detail: 'ถ้าช้อยเป็นคำเดียวกันแต่ลงท้ายต่างกัน (rely/reliable/reliably) = ถาม "ชนิดของคำ"',
      },
      {
        title: 'หาตำแหน่งหน้าที่ของคำ',
        detail: 'หน้าคำนาม→adjective, ขยายกริยา→adverb, เป็นประธาน/กรรม→noun ตอบได้โดยไม่ต้องแปลทั้งประโยค',
      },
      {
        title: 'จับคำบอกเวลา = บอก tense',
        detail: 'yesterday→past, since/for→perfect, now→continuous, tomorrow/next→future',
      },
      {
        title: 'อย่าเสียเวลาเกิน 20 วินาที/ข้อ',
        detail: 'Part 5 ต้องเร็วเพื่อเก็บเวลาให้ Part 7 ไม่แน่ใจให้เดาตามหลักไวยากรณ์แล้วไปต่อ',
      },
    ],
    levels: [
      {
        id: 'p5l1',
        title: 'ด่าน 1 · ชนิดของคำ',
        questions: [
          {
            kind: 'part5',
            id: 'p5l1q1',
            tag: 'Word Form',
            sentence: 'The team worked ____ to meet the tight deadline.',
            choices: [
              { id: 'a', text: 'efficient' },
              { id: 'b', text: 'efficiently' },
              { id: 'c', text: 'efficiency' },
              { id: 'd', text: 'efficiencies' },
            ],
            answer: 'b',
            explain: 'ช่องว่างขยายกริยา "worked" จึงต้องใช้ adverb → efficiently',
            tip: 'ดูคำที่อยู่ติดช่องว่าง: ถ้าเป็นกริยา (worked) แล้วช่องอยู่หลัง → ตอบ adverb (ลงท้าย -ly) เกือบทุกครั้ง',
          },
          {
            kind: 'part5',
            id: 'p5l1q2',
            tag: 'Word Form',
            sentence: 'We received several ____ about the new policy.',
            choices: [
              { id: 'a', text: 'complain' },
              { id: 'b', text: 'complaining' },
              { id: 'c', text: 'complaints' },
              { id: 'd', text: 'complained' },
            ],
            answer: 'c',
            explain: 'หลังตัวกำหนดจำนวน "several" ต้องเป็นคำนามพหูพจน์ → complaints',
            tip: 'คำว่า several / many / a few / these บอกว่าต้องตามด้วย "คำนามพหูพจน์" เป็นสัญญาณตอบที่ชัดมาก',
          },
          {
            kind: 'part5',
            id: 'p5l1q3',
            tag: 'Word Form',
            sentence: 'The instructions were not very ____, so many people got confused.',
            choices: [
              { id: 'a', text: 'clear' },
              { id: 'b', text: 'clearly' },
              { id: 'c', text: 'clarity' },
              { id: 'd', text: 'cleared' },
            ],
            answer: 'a',
            explain: 'หลัง verb to be "were" + very ต้องเป็น adjective ขยายประธาน → clear',
            tip: 'โครงสร้าง be + (very) + ช่องว่าง → ตอบ adjective เสมอ คำว่า very จะขยาย adverb/adjective ไม่ขยายคำนาม',
          },
          {
            kind: 'part5',
            id: 'p5l1q4',
            tag: 'Word Form',
            sentence: 'Her ____ to detail makes her an excellent editor.',
            choices: [
              { id: 'a', text: 'attend' },
              { id: 'b', text: 'attentive' },
              { id: 'c', text: 'attention' },
              { id: 'd', text: 'attentively' },
            ],
            answer: 'c',
            explain: 'หลัง possessive "Her" ต้องเป็นคำนาม → attention (attention to detail = ความใส่ใจรายละเอียด)',
            tip: 'หลัง my/your/her/its + ช่องว่าง → ตอบคำนามเสมอ (ตัวขยายความเป็นเจ้าของต้องตามด้วยนาม)',
          },
        ],
      },
      {
        id: 'p5l2',
        title: 'ด่าน 2 · คำบุพบทและคำเชื่อม',
        questions: [
          {
            kind: 'part5',
            id: 'p5l2q1',
            tag: 'Prepositions',
            sentence: 'The store offers free delivery ____ orders over $50.',
            choices: [
              { id: 'a', text: 'on' },
              { id: 'b', text: 'in' },
              { id: 'c', text: 'of' },
              { id: 'd', text: 'at' },
            ],
            answer: 'a',
            explain: 'เป็น collocation ที่ใช้คู่กัน "free delivery on orders" → on',
            tip: 'บุพบทบางคู่ต้องจำเป็นวลี (on orders, in advance, at the latest) เจอบ่อย ๆ ให้ท่องเป็นชุด ไม่ต้องแปลทีละคำ',
          },
          {
            kind: 'part5',
            id: 'p5l2q2',
            tag: 'Conjunctions',
            sentence: '____ the weather was bad, the outdoor event continued as planned.',
            choices: [
              { id: 'a', text: 'Because' },
              { id: 'b', text: 'Although' },
              { id: 'c', text: 'So' },
              { id: 'd', text: 'Therefore' },
            ],
            answer: 'b',
            explain: 'สองใจความขัดแย้งกัน (อากาศแย่ แต่ยังจัดต่อ) → Although (ถึงแม้ว่า)',
            tip: 'ถ้าสองประโยค "ขัดกัน" ใช้ Although/Even though ถ้า "เป็นเหตุเป็นผล" ใช้ Because ลองแปลความสัมพันธ์ก่อนเลือก',
          },
          {
            kind: 'part5',
            id: 'p5l2q3',
            tag: 'Conjunctions',
            sentence: 'Please submit the form ____ you would like to join the workshop.',
            choices: [
              { id: 'a', text: 'if' },
              { id: 'b', text: 'but' },
              { id: 'c', text: 'despite' },
              { id: 'd', text: 'unless' },
            ],
            answer: 'a',
            explain: 'เป็นเงื่อนไข "ถ้าอยากเข้าร่วม ให้ส่งฟอร์ม" → if',
            tip: 'if = ถ้า, unless = ถ้าไม่ ระวังสองตัวนี้ความหมายตรงข้าม ลองแทนแล้วดูว่าความหมายเข้ากับประโยคไหม',
          },
          {
            kind: 'part5',
            id: 'p5l2q4',
            tag: 'Prepositions',
            sentence: 'The new branch will open ____ the end of the year.',
            choices: [
              { id: 'a', text: 'on' },
              { id: 'b', text: 'in' },
              { id: 'c', text: 'by' },
              { id: 'd', text: 'at' },
            ],
            answer: 'd',
            explain: 'สำนวนตายตัว "at the end of" → at',
            tip: 'จำวลีเวลา: at the end of (ตอนปลายของ) ต่างจาก in the end (ในที่สุด) และ by the end (ภายในสิ้น…)',
          },
        ],
      },
      {
        id: 'p5l3',
        title: 'ด่าน 3 · กาลและคำสรรพนาม',
        questions: [
          {
            kind: 'part5',
            id: 'p5l3q1',
            tag: 'Verb Tense',
            sentence: 'The package ____ tomorrow, according to the tracking page.',
            choices: [
              { id: 'a', text: 'arrived' },
              { id: 'b', text: 'has arrived' },
              { id: 'c', text: 'will arrive' },
              { id: 'd', text: 'arrives' },
            ],
            answer: 'c',
            explain: 'คำว่า "tomorrow" บอกอนาคต → will arrive',
            tip: 'ล่าคำบอกเวลาในประโยคก่อนเลือก tense: tomorrow/next week → future (will), yesterday → past',
          },
          {
            kind: 'part5',
            id: 'p5l3q2',
            tag: 'Verb Tense',
            sentence: 'She ____ for the company for ten years before she retired.',
            choices: [
              { id: 'a', text: 'has worked' },
              { id: 'b', text: 'had worked' },
              { id: 'c', text: 'works' },
              { id: 'd', text: 'is working' },
            ],
            answer: 'b',
            explain: 'เหตุการณ์เกิดก่อนอีกอดีต (before she retired) → past perfect "had worked"',
            tip: 'เห็นโครง "…before/after + อดีต" ที่มีสองเหตุการณ์ในอดีต → เหตุการณ์ที่เกิดก่อนใช้ had + V3',
          },
          {
            kind: 'part5',
            id: 'p5l3q3',
            tag: 'Pronouns',
            sentence: 'The managers presented ____ ideas at the annual meeting.',
            choices: [
              { id: 'a', text: 'they' },
              { id: 'b', text: 'them' },
              { id: 'c', text: 'their' },
              { id: 'd', text: 'theirs' },
            ],
            answer: 'c',
            explain: 'หน้าคำนาม "ideas" ต้องใช้คำแสดงความเป็นเจ้าของ → their',
            tip: 'แยกสรรพนาม: they (ประธาน), them (กรรม), their + นาม (เจ้าของ+นาม), theirs (เจ้าของลอย ๆ) ดูว่ามีคำนามตามมาหรือไม่',
          },
          {
            kind: 'part5',
            id: 'p5l3q4',
            tag: 'Vocabulary',
            sentence: 'The hotel is conveniently ____ near the train station.',
            choices: [
              { id: 'a', text: 'located' },
              { id: 'b', text: 'arrived' },
              { id: 'c', text: 'happened' },
              { id: 'd', text: 'belonged' },
            ],
            answer: 'a',
            explain: 'collocation "conveniently located" = ตั้งอยู่ในทำเลสะดวก',
            tip: 'ข้อคำศัพท์ ให้ดูคำข้าง ๆ ที่มักไปด้วยกัน (conveniently + located) แล้วเลือกคำที่จับคู่เป็นสำนวนได้',
          },
        ],
      },
    ],
  },

  // ===================================================================== PART 6
  {
    id: 'part6',
    number: 6,
    title: 'Text Completion',
    thaiTitle: 'เติมข้อความในย่อหน้า',
    skill: 'reading',
    icon: '📄',
    color: '#0ea5e9',
    blurb: 'เติมคำ/วลี/ประโยคในย่อหน้า ให้สอดคล้องกับบริบททั้งย่อหน้า',
    format: 'ข้อสอบจริง 16 ข้อ (4 ข้อความ × 4 ช่อง): เลือกเติมคำ และมี 1 ช่องที่ต้องเติม "ทั้งประโยค"',
    tips: [
      {
        title: 'อ่านบริบทรอบช่องว่าง',
        detail: 'Part 6 ต่างจาก Part 5 ตรงที่บางช่องต้องดูประโยคก่อน/หลัง โดยเฉพาะคำเชื่อมและกาลของกริยา',
      },
      {
        title: 'ช่องเติมประโยค = ดูความต่อเนื่อง',
        detail: 'ประโยคที่เลือกต้องเชื่อมกับประโยคก่อน-หลัง ระวังสรรพนาม/คำเชื่อมที่อ้างถึงสิ่งที่ยังไม่พูดถึง',
      },
      {
        title: 'จับโทนของข้อความ',
        detail: 'อีเมลแจ้งข่าวดี/ขอโทษ/เชิญ ใช้คำเชื่อมและคำศัพท์ต่างกัน ดูหัวเรื่องและประโยคแรกช่วยได้',
      },
    ],
    levels: [
      {
        id: 'p6l1',
        title: 'ด่าน 1 · อีเมลแจ้งข่าว',
        questions: [
          {
            kind: 'part6',
            id: 'p6l1q1',
            tag: 'Verb Tense',
            passage:
              'We are excited to announce that our mobile app ____ next month. It will let customers track orders in real time.',
            choices: [
              { id: 'a', text: 'launched' },
              { id: 'b', text: 'will be launched' },
              { id: 'c', text: 'has launched' },
              { id: 'd', text: 'launches yesterday' },
            ],
            answer: 'b',
            explain: '"next month" บอกอนาคต และแอปถูกเปิดตัว (ถูกกระทำ) → passive อนาคต "will be launched"',
            tip: 'Part 6 ต้องอ่านประโยคถัดไปด้วย: ประโยคหลังใช้ "It will…" ยืนยันว่าเป็นอนาคต ช่วยตัด past/present ทิ้ง',
          },
          {
            kind: 'part6',
            id: 'p6l1q2',
            tag: 'Connectors',
            passage:
              'The app is still being tested. ____, we expect a few minor bugs at first, so your feedback will be very helpful.',
            choices: [
              { id: 'a', text: 'Therefore' },
              { id: 'b', text: 'However' },
              { id: 'c', text: 'Instead' },
              { id: 'd', text: 'Meanwhile' },
            ],
            answer: 'a',
            explain: 'ยังทดสอบอยู่ → "ดังนั้น" คาดว่าจะมีบั๊ก เป็นเหตุเป็นผล → Therefore',
            tip: 'คำเชื่อมต้องดูความสัมพันธ์สองประโยค: เหตุ-ผล → Therefore/As a result, ขัดแย้ง → However',
          },
          {
            kind: 'part6',
            id: 'p6l1q3',
            tag: 'Word Form',
            passage:
              'Our goal is to provide a ____ experience for every user, whether on a phone or a computer.',
            choices: [
              { id: 'a', text: 'seamless' },
              { id: 'b', text: 'seamlessly' },
              { id: 'c', text: 'seam' },
              { id: 'd', text: 'seams' },
            ],
            answer: 'a',
            explain: 'ขยายคำนาม "experience" ต้องใช้ adjective → seamless (ราบรื่น ไร้รอยต่อ)',
            tip: 'แม้อยู่ในย่อหน้า หลักชนิดคำก็เหมือน Part 5: a ___ + นาม → ต้องเป็น adjective',
          },
          {
            kind: 'part6',
            id: 'p6l1q4',
            tag: 'Sentence Insertion',
            passage:
              'Thank you for being a loyal customer. ____ We hope you enjoy the new features.',
            choices: [
              { id: 'a', text: 'As a token of our appreciation, you will receive early access.' },
              { id: 'b', text: 'The store will be closed permanently.' },
              { id: 'c', text: 'Please return your defective items.' },
              { id: 'd', text: 'We are sorry for the late delivery.' },
            ],
            answer: 'a',
            explain:
              'ประโยคก่อนขอบคุณลูกค้า ประโยคหลังหวังว่าจะชอบฟีเจอร์ใหม่ → ตรงกลางต้องเป็นการ "ตอบแทน/ให้สิทธิ์" จึงต่อเนื่อง',
            tip: 'ข้อเติมทั้งประโยค ให้ดูโทนและความต่อเนื่อง: ก่อน=ขอบคุณ หลัง=ฟีเจอร์ใหม่ → ประโยคแทรกต้องเป็นเชิงบวก/ให้รางวัล ตัดประโยคโทนลบทิ้ง',
          },
        ],
      },
      {
        id: 'p6l2',
        title: 'ด่าน 2 · ประกาศภายใน',
        questions: [
          {
            kind: 'part6',
            id: 'p6l2q1',
            tag: 'Word Form',
            passage:
              'All employees are required to complete the safety training by Friday. This training is ____ for everyone, including part-time staff.',
            choices: [
              { id: 'a', text: 'mandatory' },
              { id: 'b', text: 'mandate' },
              { id: 'c', text: 'mandatorily' },
              { id: 'd', text: 'mandates' },
            ],
            answer: 'a',
            explain: 'หลัง verb to be "is" ขยายด้วย adjective → mandatory (ภาคบังคับ)',
            tip: 'be + ช่องว่าง + for… → ตอบ adjective ลองเช็คความหมายให้เข้ากับ "required" ในประโยคก่อนด้วย',
          },
          {
            kind: 'part6',
            id: 'p6l2q2',
            tag: 'Connectors',
            passage:
              'The session takes about one hour. ____ you finish, you will receive a certificate by email.',
            choices: [
              { id: 'a', text: 'Once' },
              { id: 'b', text: 'Despite' },
              { id: 'c', text: 'In case of' },
              { id: 'd', text: 'During' },
            ],
            answer: 'a',
            explain: '"Once you finish" = เมื่อทำเสร็จ เชื่อมอนุประโยคแสดงเวลา → Once',
            tip: 'ดูว่าหลังช่องว่างมี "ประโยค (you finish)" หรือ "คำนาม" — ถ้าเป็นประโยคต้องใช้คำเชื่อมอนุประโยค (Once/When) ไม่ใช่ During/Despite ที่ตามด้วยนาม',
          },
          {
            kind: 'part6',
            id: 'p6l2q3',
            tag: 'Sentence Insertion',
            passage:
              'Please make sure to log in with your employee ID. ____ If you have trouble, contact the IT help desk.',
            choices: [
              { id: 'a', text: 'The training link will be sent to your work email.' },
              { id: 'b', text: 'The cafeteria menu has changed.' },
              { id: 'c', text: 'We are hiring new managers.' },
              { id: 'd', text: 'Parking is no longer available.' },
            ],
            answer: 'a',
            explain:
              'เนื้อหารอบ ๆ พูดเรื่อง "ล็อกอิน → ถ้ามีปัญหาให้ติดต่อ IT" ประโยคแทรกต้องอยู่ในหัวข้อเดียวกัน คือเรื่องลิงก์/การเข้าระบบ',
            tip: 'ประโยคแทรกต้อง "อยู่ในหัวข้อเดียวกัน" กับประโยครอบข้าง ตัวลวง (เมนูโรงอาหาร/รับสมัครงาน) นอกเรื่อง ตัดทิ้งได้ทันที',
          },
        ],
      },
    ],
  },

  // ===================================================================== PART 7
  {
    id: 'part7',
    number: 7,
    title: 'Reading Comprehension',
    thaiTitle: 'อ่านจับใจความ',
    skill: 'reading',
    icon: '📰',
    color: '#f97316',
    blurb: 'อ่านอีเมล ประกาศ บทความ ตาราง แล้วตอบคำถามจับใจความ–รายละเอียด–อนุมาน',
    format: 'ข้อสอบจริง 54 ข้อ: ทั้งข้อความเดี่ยวและหลายข้อความ (double/triple passages)',
    tips: [
      {
        title: 'อ่านคำถามก่อน แล้วค่อยล่าคำตอบ',
        detail: 'ข้อรายละเอียด (When/How much/Where) ให้สแกนหาคีย์เวิร์ดในข้อความ ไม่ต้องอ่านทุกคำ',
      },
      {
        title: 'แยกชนิดคำถาม',
        detail: 'Main idea→ดูประโยคแรก-ท้าย, Detail→สแกนคีย์เวิร์ด, Inference→ต้องตีความ, Vocabulary→ดูบริบทรอบคำ',
      },
      {
        title: 'ระวัง paraphrase',
        detail: 'คำตอบที่ถูกมักใช้คำ "ความหมายเดียวกันแต่คนละคำ" กับในข้อความ อย่ามองหาแต่คำที่เหมือนเป๊ะ',
      },
      {
        title: 'คุมเวลาแบบ double passage',
        detail: 'ข้อความคู่มักมีคำถามที่ต้องโยงข้อมูล 2 ที่ อ่านทั้งคู่คร่าว ๆ ก่อนแล้วจับจุดเชื่อม',
      },
    ],
    levels: [
      {
        id: 'p7l1',
        title: 'ด่าน 1 · ประกาศและอีเมล',
        questions: [
          {
            kind: 'part7',
            id: 'p7l1q1',
            tag: 'Main Idea',
            passageTitle: 'Notice to Residents',
            passage:
              'NOTICE TO ALL RESIDENTS\n\nThe water supply in Building C will be temporarily shut off on Saturday, June 12, from 9 a.m. to 1 p.m. for scheduled pipe maintenance. We recommend storing water in advance. We apologize for any inconvenience and thank you for your understanding.\n\n— Building Management',
            question: 'What is the purpose of the notice?',
            choices: [
              { id: 'a', text: 'To announce a water shutoff' },
              { id: 'b', text: 'To advertise a new building' },
              { id: 'c', text: 'To collect maintenance fees' },
              { id: 'd', text: 'To invite residents to a meeting' },
            ],
            answer: 'a',
            explain: 'ใจความหลักคือแจ้งว่าจะปิดน้ำชั่วคราวเพื่อซ่อมท่อ',
            tip: 'คำถาม purpose/main idea ให้สรุปจากประโยคแรกหรือหัวเรื่อง (NOTICE… water supply… shut off) อย่าไปจมกับรายละเอียดเวลา',
          },
          {
            kind: 'part7',
            id: 'p7l1q2',
            tag: 'Detail',
            passageTitle: 'Notice to Residents',
            passage:
              'NOTICE TO ALL RESIDENTS\n\nThe water supply in Building C will be temporarily shut off on Saturday, June 12, from 9 a.m. to 1 p.m. for scheduled pipe maintenance. We recommend storing water in advance. We apologize for any inconvenience and thank you for your understanding.\n\n— Building Management',
            question: 'What are residents advised to do?',
            choices: [
              { id: 'a', text: 'Store water in advance' },
              { id: 'b', text: 'Leave the building' },
              { id: 'c', text: 'Call a plumber' },
              { id: 'd', text: 'Pay a fee' },
            ],
            answer: 'a',
            explain: 'ข้อความระบุ "We recommend storing water in advance."',
            tip: 'คำถาม advised/recommended ให้สแกนหาคำว่า recommend / should / please ในข้อความ คำตอบมักอยู่ตรงนั้นเป๊ะ',
          },
          {
            kind: 'part7',
            id: 'p7l1q3',
            tag: 'Detail',
            passageTitle: 'Notice to Residents',
            passage:
              'NOTICE TO ALL RESIDENTS\n\nThe water supply in Building C will be temporarily shut off on Saturday, June 12, from 9 a.m. to 1 p.m. for scheduled pipe maintenance. We recommend storing water in advance. We apologize for any inconvenience and thank you for your understanding.\n\n— Building Management',
            question: 'How long will the water be shut off?',
            choices: [
              { id: 'a', text: 'For four hours' },
              { id: 'b', text: 'For the whole day' },
              { id: 'c', text: 'For one hour' },
              { id: 'd', text: 'For two days' },
            ],
            answer: 'a',
            explain: 'จาก 9 a.m. ถึง 1 p.m. = 4 ชั่วโมง (ต้องคำนวณเอง)',
            tip: 'ข้อถามระยะเวลามักต้อง "คำนวณจากช่วงเวลา" ที่ให้ ไม่ใช่คัดลอกตรง ๆ ระวังลวงด้วยคำว่า whole day',
          },
        ],
      },
      {
        id: 'p7l2',
        title: 'ด่าน 2 · อนุมานและคำศัพท์',
        questions: [
          {
            kind: 'part7',
            id: 'p7l2q1',
            tag: 'Inference',
            passageTitle: 'Email: Job Offer',
            passage:
              'Dear Ms. Lopez,\n\nThank you for taking the time to interview with us last week. We were impressed by your experience and would like to offer you the position of Senior Analyst. Please review the attached contract and let us know your decision by June 20. We look forward to welcoming you to the team.\n\nBest regards,\nHR Department',
            question: 'What is suggested about Ms. Lopez?',
            choices: [
              { id: 'a', text: 'She attended an interview.' },
              { id: 'b', text: 'She already signed a contract.' },
              { id: 'c', text: 'She works in HR.' },
              { id: 'd', text: 'She declined the position.' },
            ],
            answer: 'a',
            explain: '"Thank you for taking the time to interview with us" บ่งบอกเป็นนัยว่าเธอมาสัมภาษณ์แล้ว',
            tip: 'คำถาม suggested/implied ตอบจาก "นัย" ไม่ใช่คำตรง ๆ b/d ขัดข้อเท็จจริง (ยังไม่เซ็น/ยังไม่ปฏิเสธ) จึงตัดทิ้ง',
          },
          {
            kind: 'part7',
            id: 'p7l2q2',
            tag: 'Detail',
            passageTitle: 'Email: Job Offer',
            passage:
              'Dear Ms. Lopez,\n\nThank you for taking the time to interview with us last week. We were impressed by your experience and would like to offer you the position of Senior Analyst. Please review the attached contract and let us know your decision by June 20. We look forward to welcoming you to the team.\n\nBest regards,\nHR Department',
            question: 'By when should Ms. Lopez respond?',
            choices: [
              { id: 'a', text: 'By June 20' },
              { id: 'b', text: 'By next week' },
              { id: 'c', text: 'By the end of the year' },
              { id: 'd', text: 'Within 24 hours' },
            ],
            answer: 'a',
            explain: 'ข้อความระบุ "let us know your decision by June 20"',
            tip: 'ข้อถามกำหนดเวลา ให้สแกนหาคำว่า by / before / deadline + วันที่ คำตอบมักลอกตรงจากตรงนั้น',
          },
          {
            kind: 'part7',
            id: 'p7l2q3',
            tag: 'Vocabulary in Context',
            passageTitle: 'Email: Job Offer',
            passage:
              'Dear Ms. Lopez,\n\nThank you for taking the time to interview with us last week. We were impressed by your experience and would like to offer you the position of Senior Analyst. Please review the attached contract and let us know your decision by June 20. We look forward to welcoming you to the team.\n\nBest regards,\nHR Department',
            question: 'The word "position" is closest in meaning to',
            choices: [
              { id: 'a', text: 'job' },
              { id: 'b', text: 'location' },
              { id: 'c', text: 'opinion' },
              { id: 'd', text: 'posture' },
            ],
            answer: 'a',
            explain: 'ในบริบทงาน "position of Senior Analyst" → position = ตำแหน่งงาน = job',
            tip: 'คำศัพท์ในบริบท อย่าเลือกจาก "ความหมายที่คุ้น" ของคำนั้น ให้แทนคำในประโยคแล้วดูว่าตัวไหนความหมายลื่นที่สุดในบริบทนี้',
          },
        ],
      },
    ],
  },
]
