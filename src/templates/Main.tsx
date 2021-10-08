import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { Meta } from 'layout/Meta';

const Main: React.FC = (props) => (
  <div className="antialiased w-full text-gray-400">
    <Meta title="Uniswap pool info" description="Uniswap pool info viewer" />
    <div className="max-w-screen-lg mx-auto">{props.children}</div>
  </div>
);

export { Main };
