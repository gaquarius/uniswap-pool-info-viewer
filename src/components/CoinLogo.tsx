import React from 'react';

import { getCoinImage } from '../utils/formatter';

interface ICoinLogoProps {
  address: string;
  size: number;
}

const CoinLogo: React.FC<ICoinLogoProps> = ({ address, size }) => {
  return (
    <img
      className="rounded-full"
      src={getCoinImage(address)}
      width={size}
      height={size}
      alt="token"
    />
  );
};

export default CoinLogo;
