
import { useEffect } from 'react';
import Site from '../components/Site';
import { setPageTitle } from '../global/constants/pageTitle';
import { ContextProvider } from '../src/context/context';
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Use a state or context to track the current page name
    // This can be set whenever the page changes, e.g., in your route handling logic.
    const currentPageName = 'Niloy';

    // Set the dynamic page title
    setPageTitle(currentPageName);
  }, []);

  return (
    <>
      <ContextProvider>
        <Site />
        <Component {...pageProps} />
      </ContextProvider>


    </>
  )
}


export default MyApp
