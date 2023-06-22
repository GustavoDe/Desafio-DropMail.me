export interface Mail{
  toAddr: string;
  text: string;
  rawSize: number;
  headerSubject: string;
  fromAddr: string;
  downloadUrl: string;
  id: string;
}
