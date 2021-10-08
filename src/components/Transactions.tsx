import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { Transaction, TransactionType } from '../interfaces/Transaction';
import TransactionList from './TransactionList';

interface ITransactionProps {
  address: string;
}

const TRANSACTIONS_QUERY = (address: string) =>
  gql(
    `
  query transactions {
    mints(first: 100, orderBy: timestamp, orderDirection: desc, where: { pool: "${address}" }, subgraphError: allow) {
      timestamp
      transaction {
        id
      }
      amountUSD
    }
    swaps(first: 100, orderBy: timestamp, orderDirection: desc, where: { pool: "${address}" }, subgraphError: allow) {
      timestamp
      transaction {
        id
      }
      amountUSD
    }
    burns(first: 100, orderBy: timestamp, orderDirection: desc, where: { pool: "${address}" }, subgraphError: allow) {
      timestamp
      transaction {
        id
      }
      amountUSD
    }
  }
  `
  );

const Transactions: React.FC<ITransactionProps> = ({ address }) => {
  const { data, loading, error } = useQuery(TRANSACTIONS_QUERY(address));
  const [activeType, setActiveType] = React.useState<TransactionType | -1>(-1);

  const transactions = React.useMemo(() => {
    if (!data) {
      return [];
    }
    const { mints, burns, swaps } = data;
    const combined = [
      ...mints.map((tx: Transaction) => ({
        ...tx,
        type: TransactionType.MINT,
      })),
      ...burns.map((tx: Transaction) => ({
        ...tx,
        type: TransactionType.BURN,
      })),
      ...swaps.map((tx: Transaction) => ({
        ...tx,
        type: TransactionType.SWAP,
      })),
    ];
    combined.sort((l, r) => r.timestamp - l.timestamp);
    return combined.filter((tx) => tx.type === activeType || activeType === -1);
  }, [data, activeType]);

  const handleTypeChanges = React.useCallback(({ target: { value } }) => {
    console.log(value);
    setActiveType(parseInt(value, 10));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex mb-4">
        <p className="text-2xl">Transactions</p>
        <select
          className="ml-2 rounded-md"
          value={activeType}
          onChange={handleTypeChanges}
        >
          <option value={TransactionType.SWAP}>Swap</option>
          <option value={TransactionType.MINT}>Mint</option>
          <option value={TransactionType.BURN}>Burn</option>
          <option value={-1}>-</option>
        </select>
      </div>
      {loading ? (
        'Loading ...'
      ) : error ? (
        'Error'
      ) : (
        <TransactionList data={transactions} />
      )}
    </div>
  );
};

export default Transactions;
