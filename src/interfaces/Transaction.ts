export enum TransactionType {
  SWAP,
  MINT,
  BURN,
}

export type Transaction = {
  type?: TransactionType;
  hash: string;
  timestamp: string;
  id: string;
  amountUSD: string;
  transaction: {
    id: string;
  };
};
