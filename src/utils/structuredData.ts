export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

const baseUrl = 'https://mitoderm.com';

/**
 * Generate Organization schema
 */
export function getOrganizationSchema(lang: string): StructuredData {
  const orgData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mitoderm',
    alternateName: 'מיטודרם',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+972-54-762-1889',
      contactType: 'Customer Service',
      areaServed: 'IL',
      availableLanguage: ['he', 'en', 'ru'],
    },
    sameAs: [
      'https://www.facebook.com/mitoderm',
      'https://www.instagram.com/mitoderm',
      'https://www.tiktok.com/@mitoderm',
    ],
  };

  if (lang === 'he') {
    orgData.description =
      'מומחים בטכנולוגיית אקסוזומים מתקדמת למקצועות האסתטיקה. מערכת V-Tech - אקסוזומים סינתטיים ו-PDRN פולינוקלאוטידים';
  } else if (lang === 'ru') {
    orgData.description =
      'Эксперты в области передовых технологий экзосом для эстетики. Система V-Tech - синтетические экзосомы и PDRN полинуклеотиды';
  } else {
    orgData.description =
      'Experts in advanced exosome technology for aesthetics. V-Tech System - synthetic exosomes and PDRN polynucleotides';
  }

  return orgData as StructuredData;
}

/**
 * Generate Product schema
 */
export function getProductSchema(
  productName: string,
  productUrl: string,
  lang: string
): StructuredData {
  const productData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: 'VM Corporation',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'VM Corporation',
    },
    category: 'Cosmetic Product',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'ILS',
    },
  };

  // Add language-specific descriptions
  if (productName.includes('Exotech Gel') || productName.includes('ג׳ל')) {
    if (lang === 'he') {
      productData.description =
        'ג׳ל המכיל אקסוזומים סינתטיים עם פפטידים ביו-מימטיים, חומצה היאלורונית, פוליסכריד מוצין חילזון טהור ו-PDRN';
    } else if (lang === 'ru') {
      productData.description =
        'Гель, содержащий синтетические экзосомы с биомиметическими пептидами, гиалуроновой кислотой, чистым полисахаридом слизи улитки и PDRN';
    } else {
      productData.description =
        'A gel containing synthetic exosomes that encapsulate biomimetic peptides, hyaluronic acid, pure snail mucin polysaccharide, and PDRN';
    }
  } else if (
    productName.includes('Exosignal Hair') ||
    productName.includes('אמפולות')
  ) {
    if (lang === 'he') {
      productData.description =
        'אמפולות מקצועיות עם אקסוזומים סינתטיים לטיפול בנשירת שיער. מגרה זקיקי שיער רדומים, מחזק ומזין מהשורש';
    } else if (lang === 'ru') {
      productData.description =
        'Профессиональные ампулы с синтетическими экзосомами для лечения выпадения волос. Стимулирует спящие фолликулы, укрепляет и питает от корня';
    } else {
      productData.description =
        'Professional ampoules with synthetic exosomes for hair loss treatment. Stimulates dormant hair follicles, strengthens and nourishes from the root';
    }
  } else if (
    productName.includes('Hair Spray') ||
    productName.includes('ספריי')
  ) {
    if (lang === 'he') {
      productData.description =
        'פורמולה חדשנית לטיפול יומיומי המשלב אקסוזומים סינתטיים, פפטידים ביו-מימטיים ו-PDRN. מפחית נשירת שיער ומאזן את הקרקפת';
    } else if (lang === 'ru') {
      productData.description =
        'Инновационная формула для ежедневного ухода, сочетающая синтетические экзосомы, биомиметические пептиды и PDRN. Уменьшает выпадение волос и балансирует кожу головы';
    } else {
      productData.description =
        'An innovative formula for daily care, combining synthetic exosomes, biomimetic peptides and PDRN. Designed to reduce hair loss and balance the scalp';
    }
  }

  // Ensure the returned object matches the StructuredData type
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    ...productData,
  } as StructuredData;
}

/**
 * Generate FAQPage schema
 */
export function getFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Event schema
 */
export function getEventSchema(
  eventUrl: string,
  lang: string
): StructuredData {
  const eventData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: '',
    url: eventUrl,
    organizer: {
      '@type': 'Organization',
      name: 'Mitoderm',
      url: baseUrl,
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };

  if (lang === 'he') {
    eventData.name = 'מפגש מקצועי לקוסמטיקאיות ואסתטיקאיות';
    eventData.description =
      'מפגש מקצועי להכרת מערכת V-Tech - אקסוזומים סינתטיים + PDRN. הכשרות מקצועיות והדגמות חיות';
  } else if (lang === 'ru') {
    eventData.name = 'Профессиональное мероприятие для косметологов';
    eventData.description =
      'Профессиональное мероприятие для знакомства с системой V-Tech - синтетические экзосомы + PDRN. Профессиональное обучение и живые демонстрации';
  } else {
    eventData.name = 'Professional Event for Cosmetologists and Aestheticians';
    eventData.description =
      'Professional event to discover the V-Tech System - synthetic exosomes + PDRN. Professional training and live demonstrations';
  }

  return eventData as StructuredData;
}
