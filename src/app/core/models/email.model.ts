export interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  summary: string;
  sent_at: string;
  read: boolean;
  starred?: boolean;
  hasAttachment?: boolean;
}

export interface EmailResponse {
  success: boolean;
  emails: { json: Email }[];
  count: number;
}