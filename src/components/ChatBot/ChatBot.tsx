/**
 * Copyright (c) 2024 Mitoderm. All rights reserved.
 *
 * This software and associated documentation files (the "Software") are proprietary
 * to Mitoderm and are protected by copyright law. No part of the Software may be
 * reproduced, distributed, or transmitted in any form or by any means, including
 * photocopying, recording, or other electronic or mechanical methods, without the
 * prior written permission of Mitoderm, except in the case of brief quotations
 * embodied in critical reviews and certain other noncommercial uses permitted by
 * copyright law.
 *
 * For permission requests, contact: info@mitoderm.com
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './ChatBot.module.scss';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  showForm?: boolean; // מזהה עבור הודעה עם טופס
}

interface ChatbotProps {
  locale: string;
}

// רכיב טופס חכם עם local state - מחוץ לפונקציה הראשית למניעת re-renders
const ContactFormInMessage = React.memo(
  ({ initialData, onSubmit, onCancel, onUpdate, isLoading, styles }: any) => {
    const [localData, setLocalData] = useState(initialData || {
      name: '',
      phone: '',
      email: '',
      subject: 'פנייה כללית מהצ\'אטבוט'
    });

    // עדכון local state כשמגיע מידע חדש
    useEffect(() => {
      setLocalData(initialData || {
        name: '',
        phone: '',
        email: '',
        subject: 'פנייה כללית מהצ\'אטבוט'
      });
    }, [initialData]);

    const handleFieldChange = (field: string, value: string) => {
      setLocalData((prev: any) => ({ ...prev, [field]: value }));
      onUpdate(field, value);
    };

    return (
      <div className={styles.contactFormInMessage}>
        <div className={styles.formField}>
          <label>שם מלא:</label>
          <input
            type='text'
            value={localData.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder='השם שלך'
            className={styles.formInput}
          />
        </div>

        <div className={styles.formField}>
          <label>טלפון: *</label>
          <input
            type='tel'
            value={localData.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder='050-1234567'
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formField}>
          <label>אימייל:</label>
          <input
            type='email'
            value={localData.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder='name@example.com'
            className={styles.formInput}
          />
        </div>

        <div className={styles.formField}>
          <label>נושא הפנייה:</label>
          <textarea
            value={localData.subject || ''}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
            placeholder='בקצרה - במה אתם עוסקים?'
            className={styles.formTextarea}
            rows={2}
          />
        </div>

        <div className={styles.formActions}>
          <button
            onClick={onSubmit}
            disabled={!localData.phone || isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'שולח...' : '✅ אישור ושליחה'}
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            ביטול
          </button>
        </div>
      </div>
    );
  }
);

const Chatbot: React.FC<ChatbotProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(true); // מתחיל פתוח
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);

  const [showContactForm, setShowContactForm] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [hasAskedForContact, setHasAskedForContact] = useState(false);
  
  // הוספה: state עבור כפתורים מוכנים
  const [showPredefinedButtons, setShowPredefinedButtons] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // טיימר חוסר פעילות
  const startInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    if (!hasAskedForContact && messages.length > 1 && !showContactForm) {
      const timer = setTimeout(() => {
        // בדיקה נוספת שאין טופס פתוח ולא ביקשנו פרטים
        if (!hasAskedForContact && !showContactForm) {
          const autoMessage: Message = {
            role: 'assistant',
            content: 'האם תרצי שנחזור אליך? 😊',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, autoMessage]);
          setHasAskedForContact(true);
        }
      }, 8000); // 8 שניות

      setInactivityTimer(timer);
    }
  };

  // עצירת טיימר
  const stopInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  };



  // חילוץ מידע באמצעות Gemini לטופס (ללא הוספת הודעות)
  const extractContactInfoForForm = async () => {
    // יצירת ערך ברירת מחדל תמיד
    const defaultInfo = {
      name: '',
      phone: '',
      email: '',
      subject: "פנייה כללית מהצ'אטבוט",
    };

    try {
      const response = await fetch('/api/extract-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationHistory: conversationHistory,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (
          result.success &&
          (result.data.phone || result.data.name || result.data.email)
        ) {
          // שמירה על פרטים קיימים ועדכון רק נתונים חדשים
          setExtractedInfo((prevInfo: any) => ({
            name: result.data.name || prevInfo?.name || defaultInfo.name,
            phone: result.data.phone || prevInfo?.phone || defaultInfo.phone,
            email: result.data.email || prevInfo?.email || defaultInfo.email,
            subject:
              result.data.subject ||
              prevInfo?.subject ||
              defaultInfo.subject,
          }));
          setShowContactForm(true);
        } else {
          // אם אין מידע מספיק אבל יש פרטים קיימים, תשמור עליהם
          setExtractedInfo((prevInfo: any) => ({
            name: prevInfo?.name || defaultInfo.name,
            phone: prevInfo?.phone || defaultInfo.phone,
            email: prevInfo?.email || defaultInfo.email,
            subject: prevInfo?.subject || defaultInfo.subject,
          }));
          setShowContactForm(true);
        }
      } else {
        // שגיאת HTTP - צור ערך ברירת מחדל
        setExtractedInfo((prevInfo: any) => ({
          name: prevInfo?.name || defaultInfo.name,
          phone: prevInfo?.phone || defaultInfo.phone,
          email: prevInfo?.email || defaultInfo.email,
          subject: prevInfo?.subject || defaultInfo.subject,
        }));
        setShowContactForm(true);
      }
    } catch (error) {
      console.error('Error extracting contact info:', error);
      // במקרה של שגיאה - צור ערך ברירת מחדל
      setExtractedInfo((prevInfo: any) => ({
        name: prevInfo?.name || defaultInfo.name,
        phone: prevInfo?.phone || defaultInfo.phone,
        email: prevInfo?.email || defaultInfo.email,
        subject: prevInfo?.subject || defaultInfo.subject,
      }));
      setShowContactForm(true);
    }
  };

  // שליחת הטופס המאושר
  const submitConfirmedLead = async () => {
    if (!extractedInfo || !extractedInfo?.phone) {
      console.error('No contact info to submit');
      return;
    }

    setIsLoading(true);

    try {
      const leadData = {
        name: extractedInfo?.name || 'לא צוין',
        phone: extractedInfo?.phone || 'לא צוין',
        email: extractedInfo?.email || 'לא צוין',
        source: "אתר מיטודרם - צ'אטבוט",
        conversationSummary: extractedInfo?.subject || 'פנייה כללית',
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setShowContactForm(false);
        setExtractedInfo(null);

        const successMessage: Message = {
          role: 'assistant',
          content:
            '🎉 נהדר! הפרטים נשלחו אלינו בהצלחה!\nמישהו מהצוות יצור איתך קשר בהקדם.\n\nיש לך עוד שאלות בינתיים?',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMessage]);
      } else {
        throw new Error('Failed to submit lead');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'מצטערת, הייתה שגיאה בשליחת הפרטים. אפשר לנסות שוב או לכתוב לנו בוואטסאפ ישירות 😊',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // עדכון פרטי הטופס - מוכן לביצועים טובים יותר
  const updateExtractedInfo = useCallback((field: string, value: string) => {
    setExtractedInfo((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // סגירת הטופס עם useCallback למניעת re-renders
  const handleFormCancel = useCallback(() => {
    setShowContactForm(false);
    setExtractedInfo(null);
  }, []);

  // הודעת פתיחה עם שאלות בחירה
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `היי יקירה! 😊 אני כאן מטעם מיטודרם - מומחית האקסוזומים שלכם!
השירותים שלנו מיועדים במיוחד לקוסמטיקאיות מוסמכות. יש לי דברים מדהימים לשתף!
תרצי לשמוע על הטכנולוגיה המהפכנית שלנו?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);

      // התחלת טיימר ראשוני
      setTimeout(() => {
        startInactivityTimer();
      }, 1000);
    }
  }, []);
  
  // useEffect שמוודא שהכפתורים מוצגים בפעם הראשונה בלבד
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      // הודעה ראשונה - הצג כפתורים פעם אחת בלבד
      setShowPredefinedButtons(true);
    }
  }, [messages]);

  // ניקוי טיימר בעת סגירת הרכיב
  useEffect(() => {
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [inactivityTimer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // עצירת טיימר חוסר פעילות
    stopInactivityTimer();

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    setIsLoading(true);

    try {
      // בדיקה אם יש מספר טלפון בהודעה (זיהוי אוטומטי לטופס)
      const phoneMatch = currentInput.match(/05\d-?\d{7}|05\d{8}/);
      const hasPhoneNumber = phoneMatch !== null;

      // אם כבר יש טופס פתוח ומגיעים פרטים חדשים - עדכן את הטופס הקיים
      if (showContactForm && hasPhoneNumber) {
        // חילוץ שם ואימייל אם קיימים
        let extractedName = '';
        let extractedEmail = '';

        // זיהוי אימייל
        const emailMatch = currentInput.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        );
        if (emailMatch) {
          extractedEmail = emailMatch[0];
        }

        // זיהוי שם - לפני או אחרי הטלפון
        const phoneIndex = currentInput.indexOf(phoneMatch[0]);
        const phoneLength = phoneMatch[0].length;

        // בדיקה לפני הטלפון
        if (phoneIndex > 0) {
          const beforePhone = currentInput.substring(0, phoneIndex).trim();
          const namePart = beforePhone
            .replace(/^(שמי|אני|קוראים לי|השם שלי)/i, '')
            .trim();
          if (namePart && namePart.length > 1 && !namePart.includes('@')) {
            extractedName = namePart;
          }
        }

        // בדיקה אחרי הטלפון (אם לא מצאנו שם לפני)
        if (!extractedName && phoneIndex + phoneLength < currentInput.length) {
          const afterPhone = currentInput
            .substring(phoneIndex + phoneLength)
            .trim();
          const namePart = afterPhone
            .replace(/^(שמי|אני|קוראים לי|השם שלי)/i, '')
            .trim();
          if (namePart && namePart.length > 1 && !namePart.includes('@')) {
            extractedName = namePart;
          }
        }

        // עדכון הטופס הקיים עם הפרטים החדשים
        setExtractedInfo((prev: any) => ({
          ...prev,
          name: extractedName || prev.name,
          phone: phoneMatch[0].replace(/-/g, '') || prev.phone,
          email: extractedEmail || prev.email,
          confidence: 95,
        }));

        const updateMessage: Message = {
          role: 'assistant',
          content:
            'מעולה! עדכנתי את הפרטים בטופס. תוכלי לעדכן את שאר הפרטים ולשלוח 😊',
          timestamp: new Date(),
          showForm: true,
        };

        setMessages((prev) => [...prev, updateMessage]);
        setIsLoading(false);
        return;
      }

      // בדיקה אם זו בקשה מפורשת ליצירת קשר
      const isExplicitContactRequest =
        currentInput.includes('רוצה שיחזרו אליי') ||
        currentInput.includes('אני רוצה שיחזרו אליי') ||
        currentInput.includes('אשמח שיחזרו אלי') ||
        currentInput.includes('אשמח שיחזרו אליי') ||
        currentInput.includes('תחזרו אליי') ||
        currentInput.includes('יוכלו לחזור אלי') ||
        currentInput.includes('שיחזרו אליי') ||
        currentInput.toLowerCase().includes('callback') ||
        (currentInput.includes('בבקשה') &&
          (currentInput.includes('חזור') || currentInput.includes('קשר')));

      // אם יש מספר טלפון או בקשה מפורשת ליצירת קשר
      if (hasPhoneNumber || isExplicitContactRequest) {
        let contactMessage = '';
        let shouldShowForm = false;

        if (hasPhoneNumber) {
          // חילוץ שם ואימייל אם קיימים
          let extractedName = '';
          let extractedEmail = '';

          // זיהוי אימייל
          const emailMatch = currentInput.match(
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
          );
          if (emailMatch) {
            extractedEmail = emailMatch[0];
          }

          // זיהוי שם - לפני או אחרי הטלפון
          const phoneIndex = currentInput.indexOf(phoneMatch[0]);
          const phoneLength = phoneMatch[0].length;

          // בדיקה לפני הטלפון
          if (phoneIndex > 0) {
            const beforePhone = currentInput.substring(0, phoneIndex).trim();
            const namePart = beforePhone
              .replace(/^(שמי|אני|קוראים לי|השם שלי)/i, '')
              .trim();
            if (namePart && namePart.length > 1 && !namePart.includes('@')) {
              extractedName = namePart;
            }
          }

          // בדיקה אחרי הטלפון (אם לא מצאנו שם לפני)
          if (
            !extractedName &&
            phoneIndex + phoneLength < currentInput.length
          ) {
            const afterPhone = currentInput
              .substring(phoneIndex + phoneLength)
              .trim();
            const namePart = afterPhone
              .replace(/^(שמי|אני|קוראים לי|השם שלי)/i, '')
              .trim();
            if (namePart && namePart.length > 1 && !namePart.includes('@')) {
              extractedName = namePart;
            }
          }

          // אם יש מספר טלפון, הראה טופס עם המספר והשם
          contactMessage =
            'מצוין! קיבלתי את מספר הטלפון שלך. בואי נמלא את שאר הפרטים ומישהו מהצוות יחזור אליך בהקדם! 😊';
          shouldShowForm = true;

          setExtractedInfo({
            name: extractedName || '',
            phone: phoneMatch[0].replace(/-/g, ''),
            email: extractedEmail || '',
            subject: "בקשה ליצירת קשר מהצ'אטבוט",
            confidence: 90,
          });
          setShowContactForm(true);
        } else if (isExplicitContactRequest) {
          // בקשה מפורשת ליצירת קשר
          contactMessage =
            'נהדר! כדי שמישהו מהצוות יוכל לחזור אליך, אני צריכה כמה פרטים קטנים 😊\n\nאפשר לכתוב לי את השם ומספר הטלפון שלך?';
        }

        const directContactMessage: Message = {
          role: 'assistant',
          content: contactMessage,
          timestamp: new Date(),
          showForm: shouldShowForm,
        };

        setMessages((prev) => [...prev, directContactMessage]);

        // עדכון היסטוריית השיחה מקומית (בשביל מקרים שלא עוברים דרך API)
        setConversationHistory((prev) => [
          ...prev,
          { role: 'user', content: currentInput },
          { role: 'assistant', content: contactMessage },
        ]);

        setHasAskedForContact(true);
        setIsLoading(false);
        return;
      }

      // שליחת ההיסטוריה הנוכחית ללא עדכון מקומי - האPI יטפל בעדכון

      // שליחה לצ'אטבוט הרגיל
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // בדיקה אם הודעה מכילה shortcode לטופס
      const contactFormRegex = /\[SHOW_CONTACT_FORM(?::([^\]]+))?\]/;
      const shortcodeMatch = data.message.match(contactFormRegex);
      const hasContactFormShortcode = shortcodeMatch !== null;

      // בדיקה אם צריך להציג טופס גם בלי שורטקוד (backup לגמיני)
      const needsContactFormBackup =
        // אם המשתמש ענה חיובית לשאלה על יצירת קשר
        (conversationHistory.some(
          (msg: any) =>
            msg.role === 'assistant' &&
            (msg.content.includes('תרצי שנחזור אליך') ||
              msg.content.includes('האם תרצי שנחזור אליך'))
        ) &&
          (currentInput.includes('כן') ||
            currentInput.includes('בטח') ||
            currentInput.includes('אשמח') ||
            currentInput.includes('בוודאי') ||
            currentInput.includes('נהדר') ||
            currentInput.includes('OK') ||
            currentInput.toLowerCase().includes('yes')));

      console.log('=== CONTACT FORM LOGIC DEBUG ===');
      console.log('hasContactFormShortcode:', hasContactFormShortcode);
      console.log('needsContactFormBackup:', needsContactFormBackup);
      console.log('currentInput:', currentInput);
      console.log('=== END CONTACT FORM DEBUG ===');

      let messageContent = data.message;
      let showForm = false;
      let shortcodeParams: any = {};

      if (hasContactFormShortcode || needsContactFormBackup) {
        messageContent = data.message.replace(contactFormRegex, '').trim();
        showForm = true;
        setHasAskedForContact(true);
        setShowContactForm(true);

        // עיבוד פרמטרים אם קיימים
        if (shortcodeMatch && shortcodeMatch[1]) {
          const paramsString = shortcodeMatch[1];
          const paramPairs = paramsString
            .split(',')
            .map((p: string) => p.trim());

          paramPairs.forEach((pair: string) => {
            const [key, value] = pair.split('=').map((s: string) => s.trim());
            if (key && value) {
              shortcodeParams[key] = value;
            }
          });
        }

        if (Object.keys(shortcodeParams).length > 0) {
          setExtractedInfo({
            name: shortcodeParams.name || '',
            phone: shortcodeParams.phone || '',
            email: shortcodeParams.email || '',
            subject: shortcodeParams.subject || 'בקשה ליצירת קשר',
            confidence: 95,
          });
        } else {
          await extractContactInfoForForm();
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: messageContent,
        timestamp: new Date(),
        showForm: showForm,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // עדכון היסטוריית השיחה עם מה שהAPI החזיר (כולל ההודעה שלנו והתשובה)
      setConversationHistory(data.conversationHistory || []);

      // התחלת טיימר חוסר פעילות רק אם עדיין לא ביקשנו פרטים
      if (
        !hasAskedForContact &&
        !hasContactFormShortcode &&
        !needsContactFormBackup
      ) {
        startInactivityTimer();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'מצטערת, הייתה שגיאה בחיבור. אנא נסי שוב או צרי קשר ישירות בוואטסאפ 😊',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // פונקציה לשליחת שאלות מוכנות
  const sendPredefinedMessage = async (message: string) => {
    stopInactivityTimer();
    
    // הוספה לרשימת שאלות שכבר נשלחו
    setUsedQuestions(prev => [...prev, message]);

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // בדיקה אם יש מספר טלפון בהודעה
      const phoneMatch = message.match(/05\d-?\d{7}|05\d{8}/);
      const hasPhoneNumber = phoneMatch !== null;

      // בדיקה אם זו בקשה מפורשת ליצירת קשר
      const isExplicitContactRequest =
        message.includes('רוצה שיחזרו אליי') ||
        message.includes('אני רוצה שיחזרו אליי') ||
        message.includes('אשמח שיחזרו אלי') ||
        message.includes('אשמח שיחזרו אליי') ||
        message.includes('תחזרו אליי') ||
        message.includes('יוכלו לחזור אלי') ||
        message.includes('שיחזרו אליי') ||
        message.toLowerCase().includes('callback') ||
        (message.includes('בבקשה') &&
          (message.includes('חזור') || message.includes('קשר')));

      // אם יש מספר טלפון או בקשה מפורשת ליצירת קשר
      if (hasPhoneNumber || isExplicitContactRequest) {
        let contactMessage = '';
        let shouldShowForm = false;

        if (hasPhoneNumber) {
          // חילוץ שם ואימייל אם קיימים
          let extractedName = '';
          let extractedEmail = '';

          // זיהוי אימייל
          const emailMatch = message.match(
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
          );
          if (emailMatch) {
            extractedEmail = emailMatch[0];
          }

          // זיהוי שם - לפני או אחרי הטלפון
          const phoneIndex = message.indexOf(phoneMatch[0]);
          const phoneLength = phoneMatch[0].length;

          // בדיקה לפני הטלפון
          if (phoneIndex > 0) {
            const beforePhone = message.substring(0, phoneIndex).trim();
            const namePart = beforePhone
              .replace(/^(שמי|אני|קוראים לי|השם שלי)/i, '')
              .trim();
            if (namePart && namePart.length > 1 && !namePart.includes('@')) {
              extractedName = namePart;
            }
          }

          // בדיקה אחרי הטלפון (אם לא מצאנו שם לפני)
          if (!extractedName && phoneIndex + phoneLength < message.length) {
            const afterPhone = message
              .substring(phoneIndex + phoneLength)
              .trim();
            const namePart = afterPhone
              .replace(/^(שמי|אני|קוראים לי|השם שלי)/i, '')
              .trim();
            if (namePart && namePart.length > 1 && !namePart.includes('@')) {
              extractedName = namePart;
            }
          }

          contactMessage =
            'מצוין! קיבלתי את מספר הטלפון שלך. בואי נמלא את שאר הפרטים ומישהו מהצוות יחזור אליך בהקדם! 😊';
          shouldShowForm = true;

          setExtractedInfo({
            name: extractedName || '',
            phone: phoneMatch[0].replace(/-/g, ''),
            email: extractedEmail || '',
            subject: "בקשה ליצירת קשר מהצ'אטבוט",
            confidence: 90,
          });
          setShowContactForm(true);
        } else if (isExplicitContactRequest) {
          contactMessage =
            'נהדר! כדי שמישהו מהצוות יוכל לחזור אליך, אני צריכה כמה פרטים קטנים 😊\n\nאפשר לכתוב לי את השם ומספר הטלפון שלך?';
        }

        const directContactMessage: Message = {
          role: 'assistant',
          content: contactMessage,
          timestamp: new Date(),
          showForm: shouldShowForm,
        };

        setMessages((prev) => [...prev, directContactMessage]);

        // עדכון היסטוריית השיחה מקומית (בשביל מקרים שלא עוברים דרך API)
        setConversationHistory((prev) => [
          ...prev,
          { role: 'user', content: message },
          { role: 'assistant', content: contactMessage },
        ]);

        setHasAskedForContact(true);
        setIsLoading(false);
        return;
      }

      // שליחת ההיסטוריה הנוכחית ללא עדכון מקומי - האPI יטפל בעדכון
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // בדיקה אם הודעה מכילה shortcode לטופס
      const contactFormRegex = /\[SHOW_CONTACT_FORM(?::([^\]]+))?\]/;
      const shortcodeMatch = data.message.match(contactFormRegex);
      const hasContactFormShortcode = shortcodeMatch !== null;

      // בדיקה אם צריך להציג טופס גם בלי שורטקוד (backup לגמיני)
      const needsContactFormBackup =
        // אם המשתמש ענה חיובית לשאלה על יצירת קשר
        (conversationHistory.some(
          (msg: any) =>
            msg.role === 'assistant' &&
            (msg.content.includes('תרצי שנחזור אליך') ||
              msg.content.includes('האם תרצי שנחזור אליך'))
        ) &&
          (message.includes('כן') ||
            message.includes('בטח') ||
            message.includes('אשמח') ||
            message.includes('בוודאי') ||
            message.includes('נהדר') ||
            message.includes('OK') ||
            message.toLowerCase().includes('yes')));

      console.log('=== CONTACT FORM LOGIC DEBUG ===');
      console.log('hasContactFormShortcode:', hasContactFormShortcode);
      console.log('needsContactFormBackup:', needsContactFormBackup);
      console.log('message:', message);
      console.log('=== END CONTACT FORM DEBUG ===');

      let messageContent = data.message;
      let showForm = false;
      let shortcodeParams: any = {};

      if (hasContactFormShortcode || needsContactFormBackup) {
        messageContent = data.message.replace(contactFormRegex, '').trim();
        showForm = true;
        setHasAskedForContact(true);
        setShowContactForm(true);

        // עיבוד פרמטרים אם קיימים
        if (shortcodeMatch && shortcodeMatch[1]) {
          const paramsString = shortcodeMatch[1];
          const paramPairs = paramsString
            .split(',')
            .map((p: string) => p.trim());

          paramPairs.forEach((pair: string) => {
            const [key, value] = pair.split('=').map((s: string) => s.trim());
            if (key && value) {
              shortcodeParams[key] = value;
            }
          });
        }

        if (Object.keys(shortcodeParams).length > 0) {
          setExtractedInfo({
            name: shortcodeParams.name || '',
            phone: shortcodeParams.phone || '',
            email: shortcodeParams.email || '',
            subject: shortcodeParams.subject || 'בקשה ליצירת קשר',
            confidence: 95,
          });
        } else {
          await extractContactInfoForForm();
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: messageContent,
        timestamp: new Date(),
        showForm: showForm,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // עדכון היסטוריית השיחה עם מה שהAPI החזיר
      setConversationHistory(data.conversationHistory || []);

      if (
        !hasAskedForContact &&
        !hasContactFormShortcode &&
        !needsContactFormBackup
      ) {
        startInactivityTimer();
      }
    } catch (error) {
      console.error('Error sending predefined message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'מצטערת, הייתה שגיאה בחיבור. אנא נסי שוב או צרי קשר ישירות בוואטסאפ 😊',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* כפתור פתיחת הצ'אט */}
      <button
        className={`${styles.chatButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleChat}
        aria-label="פתח צ'אט"
      >
        {isOpen ? (
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M18 6L6 18M6 6L18 18'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : (
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </button>

      {/* חלון הצ'אט */}
      {isOpen && (
        <div className={styles.chatWindow} dir='rtl'>
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <div className={styles.avatar}>
                <Image
                  src='/images/logo.svg'
                  alt='Mitoderm'
                  width={32}
                  height={32}
                />
              </div>
              <div className={styles.headerText}>
                <h3>מיטודרם צ'אט</h3>
                <p>מומחית אקסוזומים</p>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="סגור צ'אט"
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M18 6L6 18M6 6L18 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`${styles.message} ${
                    message.role === 'user'
                      ? styles.userMessage
                      : styles.assistantMessage
                  }`}
                >
                  <div className={styles.messageContent}>
                    {message.role === 'assistant' && (
                      <div className={styles.assistantAvatar}>
                        <Image
                          src='/images/logo.svg'
                          alt='Mitoderm'
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                    <div className={styles.messageText}>
                      {/* תוכן ההודעה */}
                      <div
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />

                      {/* טופס אישור פרטים בתוך ההודעה */}
                      {message.role === 'assistant' &&
                        message.showForm &&
                        showContactForm &&
                        // הצג את הטופס רק בהודעה האחרונה שיש לה showForm=true
                        index ===
                          messages.findLastIndex((msg) => msg.showForm) && (
                          <ContactFormInMessage
                            key={`contact-form-${index}`}
                            initialData={extractedInfo || {
                              name: '',
                              phone: '',
                              email: '',
                              subject: 'פנייה כללית מהצ\'אטבוט'
                            }}
                            onSubmit={submitConfirmedLead}
                            onCancel={handleFormCancel}
                            onUpdate={updateExtractedInfo}
                            isLoading={isLoading}
                            styles={styles}
                          />
                        )}
                    </div>
                  </div>
                  <div className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* הצגת כפתורי השאלות - רק בהודעה הראשונה */}
                {(index === 0 && message.role === 'assistant' && messages.length === 1) && (
                  <div style={{ marginTop: '10px', marginRight: '40px' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {/* כפתור אקסוזומים */}
                      {!usedQuestions.includes('מהם אקסוזומים?') && (
                        <button
                          className={styles.predefinedQuestionBtn}
                          onClick={() =>
                            sendPredefinedMessage('מהם אקסוזומים?')
                          }
                        >
                          🧬 מהם אקסוזומים ולמה הם מהפכה?
                        </button>
                      )}
                      
                      {/* כפתור התועלות */}
                      {!usedQuestions.includes('מה התועלות העיקריות של המוצרים?') && (
                        <button
                          className={styles.predefinedQuestionBtn}
                          onClick={() =>
                            sendPredefinedMessage('מה התועלות העיקריות של המוצרים?')
                          }
                        >
                          ✨ מה התועלות העיקריות של המוצרים?
                        </button>
                      )}
                      
                      {/* כפתור מחירים */}
                      {!usedQuestions.includes('כמה עולים המוצרים?') && (
                        <button
                          className={styles.predefinedQuestionBtn}
                          onClick={() =>
                            sendPredefinedMessage('כמה עולים המוצרים?')
                          }
                        >
                          💰 כמה עולים המוצרים וכמה הרווח?
                        </button>
                      )}
                      
                      {/* כפתור הרשמה */}
                      {!usedQuestions.includes('איך נרשמים למפגש ההדרכה?') && (
                        <button
                          className={styles.predefinedQuestionBtn}
                          onClick={() =>
                            sendPredefinedMessage('איך נרשמים למפגש ההדרכה?')
                          }
                        >
                          📚 איך נרשמים למפגש ההדרכה?
                        </button>
                      )}
                      
                      {/* כפתור ההבדלים */}
                      {!usedQuestions.includes('במה המוצר שונה וטוב יותר ממוצרים אחרים דומים?') && (
                        <button
                          className={styles.predefinedQuestionBtn}
                          onClick={() =>
                            sendPredefinedMessage('במה המוצר שונה וטוב יותר ממוצרים אחרים דומים?')
                          }
                        >
                          🏆 במה המוצרים שלנו שונים וטובים יותר?
                        </button>
                      )}
                      
                      {/* כפתור קשר */}
                      {!usedQuestions.includes('אני רוצה שיחזרו אליי!') && (
                        <button
                          className={styles.predefinedQuestionBtn}
                          onClick={() =>
                            sendPredefinedMessage('אני רוצה שיחזרו אליי!')
                          }
                        >
                          📞 אני רוצה שיחזרו אליי!
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.assistantAvatar}>
                    <Image
                      src='/images/logo.svg'
                      alt='Mitoderm'
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder='כתבי הודעה...'
              className={styles.messageInput}
              disabled={isLoading}
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={styles.sendButton}
              aria-label='שלח הודעה'
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
