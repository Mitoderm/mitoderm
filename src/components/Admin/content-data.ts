export interface ContentItem {
    id: string;
    section: string;
    type: string;
    hebrew: string;
    english: string;
    russian: string;
    notes: string;
  }
  
  export const contentData: ContentItem[] = [
    { id: "NAV_01", section: "Header", type: "Logo Text", hebrew: "MITODERM", english: "MITODERM", russian: "MITODERM", notes: "Logo" },
    { id: "NAV_02", section: "Header", type: "Nav Link", hebrew: "מוצרים", english: "Products", russian: "Продукты", notes: "" },
    { id: "NAV_03", section: "Header", type: "Nav Link", hebrew: "מידע נוסף", english: "More Info", russian: "Больше информации", notes: "" },
    { id: "NAV_04", section: "Header", type: "Nav Link", hebrew: "תוכנית", english: "Agenda", russian: "Программа", notes: "" },
    { id: "NAV_05", section: "Header", type: "Nav Link", hebrew: "צור קשר", english: "Contact us", russian: "Свяжитесь с нами", notes: "" },
    { id: "NAV_06", section: "Header", type: "Nav Link", hebrew: "תוצאות", english: "Results", russian: "Результаты", notes: "" },
    { id: "NAV_07", section: "Header", type: "Nav Link", hebrew: "אודותינו", english: "About us", russian: "О нас", notes: "" },
    { id: "NAV_08", section: "Header", type: "Language Switcher", hebrew: "EN", english: "EN", russian: "EN", notes: "" },
    { id: "HERO_01", section: "Hero", type: "Tab Button", hebrew: "תחום פנים", english: "Face Treatments", russian: "Область лица", notes: "Tab toggle" },
    { id: "HERO_02", section: "Hero", type: "Tab Button", hebrew: "תחום קרקפת", english: "Scalp Treatments", russian: "Область кожи головы", notes: "Tab toggle" },
    { id: "HERO_03", section: "Hero", type: "Main Heading", hebrew: "בחרו את ההשתלמות שמתאימה לכם", english: "Choose the Training That's Right for You", russian: "Выберите подходящее обучение для вас", notes: "" },
    { id: "HERO_04", section: "Hero", type: "Sub-heading", hebrew: "ההשתלמויות במקצועיות ומיומנויות הכשרתיות – לקוסמטיקאיות, מעצבי שיער, וטרינרים ופרא-רפואיים", english: "Professional training and skill-building workshops – for cosmeticians, hair stylists, veterinarians and paramedics", russian: "Профессиональные тренинги и мастер-классы – для косметологов, парикмахеров, ветеринаров и парамедиков", notes: "" },
    { id: "HERO_05", section: "Hero", type: "CTA Button", hebrew: "הרשמה דרך WhatsApp", english: "Register via WhatsApp", russian: "Регистрация через WhatsApp", notes: "WhatsApp icon — unique CTA" },
    { id: "PROG_01", section: "Programs", type: "Section Heading", hebrew: "התוכניות שלנו", english: "Our Programs", russian: "Наши программы", notes: "" },
    { id: "PROG_02", section: "Programs", type: "Section Sub-heading", hebrew: "ימי הדרכה והשתלמויות בתחומים שונים", english: "Training days and workshops in various fields", russian: "Дни обучения и мастер-классы в различных областях", notes: "" },
    { id: "CARD1_01", section: "Card – Hair Stylists", type: "Tag", hebrew: "הדרכה מקצועית", english: "Professional Training", russian: "Профессиональное обучение", notes: "" },
    { id: "CARD1_02", section: "Card – Hair Stylists", type: "Card Title", hebrew: "יום הדרכה למעצבי שיער בתחום הקרקפת", english: "Training Day for Hair Stylists in the Scalp Field", russian: "День обучения для парикмахеров в области кожи головы", notes: "" },
    { id: "CARD1_03", section: "Card – Hair Stylists", type: "Card Subtitle", hebrew: "היכרות עם עולם הקרקפת מזווית טריכולוגית מתקדמת", english: "Introduction to the world of scalp care from an advanced trichological perspective", russian: "Знакомство с миром кожи головы с позиции передовой трихологии", notes: "" },
    { id: "CARD1_08", section: "Card – Hair Stylists", type: "Button", hebrew: "לפרטים נוספים", english: "More Details", russian: "Подробнее", notes: "CTA Type 2" },
    { id: "CARD2_01", section: "Card – Face", type: "Tag", hebrew: "הדרכה מקצועית", english: "Professional Training", russian: "Профессиональное обучение", notes: "" },
    { id: "CARD2_02", section: "Card – Face", type: "Card Title", hebrew: "יום הדרכה לקוסמטיקאיות בתחום הפנים", english: "Training Day for Cosmeticians in the Facial Field", russian: "День обучения для косметологов в области лица", notes: "" },
    { id: "CARD2_11", section: "Card – Face", type: "Button", hebrew: "לפרטים נוספים", english: "More Details", russian: "Подробнее", notes: "CTA Type 2" },
    { id: "CARD3_01", section: "Card – Scalp", type: "Tag", hebrew: "הדרכה מקצועית", english: "Professional Training", russian: "Профессиональное обучение", notes: "" },
    { id: "CARD3_02", section: "Card – Scalp", type: "Card Title", hebrew: "יום הדרכה לקוסמטיקאיות בתחום הקרקפת", english: "Training Day for Cosmeticians in the Scalp Field", russian: "День обучения для косметологов в области кожи головы", notes: "" },
    { id: "CARD3_09", section: "Card – Scalp", type: "Button", hebrew: "לפרטים נוספים", english: "More Details", russian: "Подробнее", notes: "CTA Type 2" },
    { id: "BEN_01", section: "Benefits Bar", type: "Benefit Title", hebrew: "אסתטיקה מתקדמת", english: "Advanced Aesthetics", russian: "Передовая эстетика", notes: "" },
    { id: "BEN_03", section: "Benefits Bar", type: "Benefit Title", hebrew: "מרצים מומחים", english: "Expert Lecturers", russian: "Эксперты-лекторы", notes: "" },
    { id: "BEN_05", section: "Benefits Bar", type: "Benefit Title", hebrew: "פרקטיקה קלינית", english: "Clinical Practice", russian: "Клиническая практика", notes: "" },
    { id: "BEN_07", section: "Benefits Bar", type: "Benefit Title", hebrew: "תעודות השתתפות", english: "Certificates of Participation", russian: "Сертификаты об участии", notes: "" },
    { id: "COURSE_01", section: "Course Details", type: "Section Heading", hebrew: "פרטי הקורס", english: "Course Details", russian: "Детали курса", notes: "" },
    { id: "COURSE_04", section: "Course Details", type: "Location Name", hebrew: "תל אביב", english: "Tel Aviv", russian: "Тель-Авив", notes: "" },
    { id: "COURSE_05", section: "Course Details", type: "Date", hebrew: "15.04.26", english: "15.04.26", russian: "15.04.26", notes: "" },
    { id: "COURSE_07", section: "Course Details", type: "Location Name", hebrew: "ירושלים", english: "Jerusalem", russian: "Иерусалим", notes: "" },
    { id: "COURSE_09", section: "Course Details", type: "Location Name", hebrew: "חיפה", english: "Haifa", russian: "Хайфа", notes: "" },
    { id: "COURSE_11", section: "Course Details", type: "Location Name", hebrew: "באר שבע", english: "Beer Sheva", russian: "Беэр-Шева", notes: "" },
    { id: "STATS_03", section: "Numbers Speak", type: "Stat Number", hebrew: "+15", english: "15+", russian: "15+", notes: "" },
    { id: "STATS_04", section: "Numbers Speak", type: "Stat Label", hebrew: "שנות ניסיון", english: "Years of Experience", russian: "Лет опыта", notes: "" },
    { id: "STATS_05", section: "Numbers Speak", type: "Stat Number", hebrew: "+50", english: "50+", russian: "50+", notes: "" },
    { id: "STATS_06", section: "Numbers Speak", type: "Stat Label", hebrew: "סדנאות הצלחה", english: "Successful Workshops", russian: "Успешных мастер-классов", notes: "" },
    { id: "STATS_07", section: "Numbers Speak", type: "Stat Number", hebrew: "98%", english: "98%", russian: "98%", notes: "" },
    { id: "STATS_08", section: "Numbers Speak", type: "Stat Label", hebrew: "שביעות רצון", english: "Satisfaction Rate", russian: "Уровень удовлетворённости", notes: "" },
    { id: "CONTACT_01", section: "Contact", type: "Section Heading", hebrew: "צור קשר", english: "Contact Us", russian: "Связаться с нами", notes: "" },
    { id: "CONTACT_03", section: "Contact", type: "Text", hebrew: "לכל הפרטים: 054-326-2182", english: "For all details: 054-326-2182", russian: "Для подробностей: 054-326-2182", notes: "" },
    { id: "CONTACT_05", section: "Contact", type: "Text", hebrew: "רפאל איתן 38, רמת גן, 5590500", english: "Rafael Eitan 38, Ramat Gan, 5590500", russian: "ул. Рафаэль Эйтан 38, Рамат-Ган, 5590500", notes: "" },
    { id: "CONTACT_07", section: "Contact", type: "Text", hebrew: "Mitoderm@gmail.com", english: "Mitoderm@gmail.com", russian: "Mitoderm@gmail.com", notes: "" },
    { id: "FCTA_01", section: "Final CTA", type: "Heading", hebrew: "מוכנים להתחיל את המסע המקצועי שלכם?", english: "Ready to Start Your Professional Journey?", russian: "Готовы начать свой профессиональный путь?", notes: "" },
    { id: "FCTA_03", section: "Final CTA", type: "Button", hebrew: "הירשמו עכשיו", english: "Register Now", russian: "Зарегистрироваться", notes: "CTA Type 1" },
    { id: "FOOTER_01", section: "Footer", type: "Copyright", hebrew: "© 2026 MITODERM. כל הזכויות שמורות.", english: "© 2026 MITODERM. All Rights Reserved.", russian: "© 2026 MITODERM. Все права защищены.", notes: "" },
  ];
  
  export const sections = contentData
    .map((item) => item.section)
    .filter((section, index, allSections) => allSections.indexOf(section) === index);
  