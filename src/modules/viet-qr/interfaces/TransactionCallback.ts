export interface TransactionCallback {
  transactionid: string;
  transactiontime: string;
  referencenumber: string;
  amount: number;
  content: string;
  bankaccount: string;
  orderId: string;
  sign: string;
  terminalCode: string;
  urlLink: string;
  serviceCode: string;
  subTerminalCode: string;
}
