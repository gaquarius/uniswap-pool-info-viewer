import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import '../styles/main.css';
import client from '../apollo-client';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
