import type { Token } from './Token';

export interface Pool {
  totalValueLockedUSD: string;
  token0: Token;
  token1: Token;
  volumeUSD: string;
  txCount: string;
  id: string;
}
