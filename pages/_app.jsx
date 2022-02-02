import { DataProvider } from '../store/GlobalState';
import '../styles/globals.scss';

function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default App;
