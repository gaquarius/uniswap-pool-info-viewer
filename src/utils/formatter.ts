import numbro from 'numbro';
import Web3 from 'web3';

import { TransactionType } from '../interfaces/Transaction';

export const formatCurrency = (value: number) => {
  if (value === 0) {
    return '$0.00';
  }
  if (!value) {
    return '-';
  }

  return numbro(value).formatCurrency({
    average: true,
    mantissa: 2,
  });
};

export const formatTokenSymbol = (name: string) => {
  if (name === 'WETH') {
    return 'ETH';
  }
  return name;
};

export const reduceEtherscanURL = (url: string) => {
  return `${url.substring(0, 30)}...${url.substring(
    url.length - 20,
    url.length
  )}`;
};

export const fromTransactionType = (type: TransactionType) => {
  return type === TransactionType.SWAP
    ? 'swap'
    : type === TransactionType.MINT
    ? 'mint'
    : 'burn';
};

export const formatTime = (ts: number) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - ts;
  if (diff < 60) {
    return 'Recently';
  }
  if (diff < 3600) {
    const inMinutes = Math.floor(diff / 60);
    return `${inMinutes} minute${inMinutes > 1 ? 's' : ''} ago`;
  }
  if (diff < 3600 * 24) {
    const inHours = Math.floor(diff / 3600);
    return `${inHours} hour${inHours > 1 ? 's' : ''} ago`;
  }
  const inDays = Math.floor(diff / 3600 / 24);
  return `${inDays} day${inDays > 1 ? 's' : ''} ago`;
};

export const getCoinImage = (id: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${Web3.utils.toChecksumAddress(
    id
  )}/logo.png`;
