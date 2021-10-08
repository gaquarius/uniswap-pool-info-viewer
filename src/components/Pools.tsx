import React from 'react';

import { gql, useQuery } from '@apollo/client';

import PoolList from './PoolList';

const POOL_QUERY = gql`
  query Pools {
    pools(orderBy: totalValueLockedUSD, orderDirection: desc) {
      totalValueLockedUSD
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
      txCount
      volumeUSD
      id
    }
  }
`;

const Pools: React.FC = () => {
  const { data, loading } = useQuery(POOL_QUERY);

  return (
    <>
      <p className="text-2xl mb-2">All Pools</p>
      <PoolList data={data?.pools || []} loading={loading} />
    </>
  );
};

export default Pools;
