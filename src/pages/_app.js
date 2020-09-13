import { SWRConfig } from 'swr';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (args) => {
          let query = args;
          let variables;
          if (Array.isArray(query)) {
            [query, variables] = args;
          }
          return fetch('/api/graphql', {
            method: 'post',
            body: JSON.stringify({ query, variables })
          }).then((r) => r.json());
        }
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
