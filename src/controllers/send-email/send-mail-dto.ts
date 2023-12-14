export interface SendMailDTO {
  from: string;
  to: string;
  subject: string;
  template: string;
  context: {
    [key: string]: string;
  };
}
