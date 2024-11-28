export interface SendEmailBody {
  from: string;
  to: string;
  subject: string;
  html?: string;
  template?: string;
  context?: {
    [key: string]: string;
  };
}
