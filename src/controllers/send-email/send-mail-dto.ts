export interface SendMailDTO {
  from: string;
  to: string;
  subject: string;
  context: {
    name: string;
  };
}
