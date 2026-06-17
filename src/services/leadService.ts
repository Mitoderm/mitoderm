import { GoogleGenerativeAI } from '@google/generative-ai';
import nodemailer from 'nodemailer';
import type { LeadData, ExtractedInfo } from '../types';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
);

export class LeadService {
  private static instance: LeadService;
  private emailTransporter: nodemailer.Transporter | null = null;
  private isEmailConfigured: boolean = false;
  private isGoogleSheetsConfigured: boolean = false;
  private webhookUrl: string;

  constructor() {
    // הגדרת מייל
    const gmailAppPassword = process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD;
    if (gmailAppPassword) {
      this.emailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for port 465
        auth: {
          user: 'mitoderm@gmail.com',
          pass: gmailAppPassword,
        },
        tls: {
          rejectUnauthorized: false, // לפתרון בעיות SSL
          servername: 'smtp.gmail.com',
        },
      });
      this.isEmailConfigured = true;
    }

    // הגדרת Google Sheets
    this.webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || '';
    this.isGoogleSheetsConfigured = !!this.webhookUrl;
  }

  static getInstance(): LeadService {
    if (!LeadService.instance) {
      LeadService.instance = new LeadService();
    }
    return LeadService.instance;
  }

  // חילוץ מידע מהשיחה
  async extractInfoFromConversation(
    conversationHistory: any[]
  ): Promise<ExtractedInfo> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro-preview-06-05' });

      const extractPrompt = `אתה מומחה בחילוץ מידע ממשתמשים. תפקידך לנתח שיחות צ'אט ולחלץ פרטי קשר ונושא הפנייה.

כללי עבודה:
• זהה שם מלא, מספר טלפון, כתובת אימייל מהשיחה
• צור סיכום קצר ומקצועי של נושא הפנייה (מקסימום 2-3 שורות)
• תן תשובה רק בפורמט JSON המדויק הבא:

{
  "name": "שם מלא או ריק",
  "phone": "מספר טלפון או ריק", 
  "email": "כתובת אימייל או ריק",
  "subject": "סיכום נושא הפנייה",
  "confidence": "high/medium/low - רמת ביטחון בזיהוי"
}

חשוב:
• אל תמציא מידע שלא קיים בשיחה
• סיכום הנושא צריך להיות מקצועי ורלוונטי למיטודרם
• זהה רק פרטים ברורים וחד-משמעיים`;

      const conversationText = conversationHistory
        .map(
          (msg: any) =>
            `${msg.role === 'user' ? 'לקוח' : 'מיטודרם'}: ${msg.content}`
        )
        .join('\n');

      const prompt = `${extractPrompt}

השיחה לניתוח:
${conversationText}

החזר רק JSON:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response
        .text()
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const extractedInfo = JSON.parse(text);
      return {
        name: extractedInfo.name || '',
        phone: extractedInfo.phone || '',
        email: extractedInfo.email || '',
        subject: extractedInfo.subject || 'פנייה כללית',
        confidence: extractedInfo.confidence || 'medium',
      };
    } catch (error) {
      console.error('Error extracting info:', error);
      return {
        name: '',
        phone: '',
        email: '',
        subject: 'פנייה כללית',
        confidence: 'low',
      };
    }
  }

  // שמירת ליד מלא
  async saveLead(leadData: Partial<LeadData>): Promise<boolean> {
    const fullLeadData: LeadData = {
      name: leadData.name || '',
      phone: leadData.phone || '',
      email: leadData.email || '',
      source: leadData.source || "צ'אטבוט אתר",
      timestamp: new Date().toLocaleString('he-IL', {
        timeZone: 'Asia/Jerusalem',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      conversationSummary: leadData.conversationSummary || '',
    };

    const [emailSent, sheetUpdated] = await Promise.all([
      this.sendNotificationEmail(fullLeadData),
      this.saveToGoogleSheets(fullLeadData),
    ]);

    return emailSent || sheetUpdated;
  }

  // שליחת מייל התראה
  private async sendNotificationEmail(leadData: LeadData): Promise<boolean> {
    if (!this.isEmailConfigured || !this.emailTransporter) {
      console.log('Email not sent - service not configured');
      return false;
    }

    try {
      const mailOptions = {
        from: 'mitoderm@gmail.com',
        to: 'mitoderm@gmail.com',
        subject: `🔥 ליד חדש מהצ'אטבוט - ${leadData.phone}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl; text-align: right;">
            <h2 style="color: #2c5aa0; text-align: right;">ליד חדש מהצ'אטבוט! 🎉</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; direction: rtl; text-align: right;">
              <h3 style="color: #495057; text-align: right;">פרטי הליד:</h3>
              <p style="text-align: right;"><strong>📱 טלפון:</strong> <a href="tel:${
                leadData.phone
              }">${leadData.phone}</a></p>
              ${
                leadData.name
                  ? `<p style="text-align: right;"><strong>👤 שם:</strong> ${leadData.name}</p>`
                  : ''
              }
              ${
                leadData.email
                  ? `<p style="text-align: right;"><strong>📧 אימייל:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>`
                  : ''
              }
              <p style="text-align: right;"><strong>🌐 מקור:</strong> ${
                leadData.source
              }</p>
              <p style="text-align: right;"><strong>🕐 תאריך:</strong> ${
                leadData.timestamp
              }</p>
            </div>

            ${
              leadData.conversationSummary
                ? `
              <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; direction: rtl; text-align: right;">
                <h3 style="color: #1976d2; text-align: right;">סיכום השיחה:</h3>
                <p style="white-space: pre-wrap; text-align: right;">${leadData.conversationSummary}</p>
              </div>
            `
                : ''
            }

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/972${leadData.phone
                .replace(/[^0-9]/g, '')
                .substring(1)}" 
                 style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                💬 שלח הודעה בוואטסאפ
              </a>
            </div>
          </div>
        `,
      };

      await this.emailTransporter.sendMail(mailOptions);
      console.log('Lead notification email sent successfully');
      return true;
    } catch (error: any) {
      console.error('Error sending notification email:', error);
      return false;
    }
  }

  // שליחת מייל ברוכים הבאים
  private async sendWelcomeEmail(leadData: LeadData): Promise<boolean> {
    if (!leadData.email || !this.isEmailConfigured || !this.emailTransporter) {
      return false;
    }

    try {
      const mailOptions = {
        from: 'mitoderm@gmail.com',
        to: leadData.email,
        subject: '🌟 תודה על ההתעניינות במיטודרם - אקסוזומים מתקדמים!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">שלום ${leadData.name || 'יקרה'}! 👋</h2>
            
            <p>תודה רבה על ההתעניינות במוצרי האקסוזומים המתקדמים של מיטודרם!</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">מה הדבר הבא?</h3>
              <ul>
                <li>נציגה שלנו תחזור אליך בהקדם האפשרי</li>
                <li>נוכל לקבוע פגישת היכרות אישית</li>
                <li>תקבלי מידע מפורט על המוצרים והמחירים המיוחדים</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.mitoderm.com/he/form" 
                 style="background: #2c5aa0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                📅 הרשמה למפגש הדרכה
              </a>
            </div>

            <p style="font-size: 14px; color: #666;">
              יש שאלות? ניתן ליצור קשר בוואטסאפ: 
              <a href="https://wa.me/972547621889">054-762-1889</a>
            </p>
          </div>
        `,
      };

      await this.emailTransporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  // שמירה בGoogle Sheets
  private async saveToGoogleSheets(leadData: LeadData): Promise<boolean> {
    if (!this.isGoogleSheetsConfigured) {
      console.log('Google Sheets not updated - service not configured');
      return false;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: leadData.timestamp,
          phone: "'" + leadData.phone, // הוספת מרכאה כדי לשמור כטקסט
          name: leadData.name || '',
          email: leadData.email || '',
          source: leadData.source,
          conversationSummary: leadData.conversationSummary || '',
        }),
      });

      if (response.ok) {
        console.log('Lead added to Google Sheets successfully');
        return true;
      } else {
        console.error(
          'Error adding lead to Google Sheets:',
          response.statusText
        );
        return false;
      }
    } catch (error) {
      console.error('Error adding lead to Google Sheets:', error);
      return false;
    }
  }
}
