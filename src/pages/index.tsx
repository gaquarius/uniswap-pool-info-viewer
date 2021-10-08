import { useQuery, gql } from '@apollo/client';

import PoolList from '../components/PoolList';
import { Main } from '../templates/Main';

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
    }
  }
`;

const Index = () => {
  const { data, loading, error } = useQuery(POOL_QUERY);

  return (
    <Main>
      {loading ? (
        'Loading ...'
      ) : error ? (
        'Error!'
      ) : (
        <PoolList data={data.pools} />
      )}
    </Main>
  );
};

export default Index;
