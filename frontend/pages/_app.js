import '../styles/globals.css'
import {Provider,createClient} from "urql";
import Nav from '../components/Nav';
import {StateContext} from "../lib/context"
import {Toaster} from 'react-hot-toast';
import { UserProvider } from '@auth0/nextjs-auth0';
//url & URL are different using URL will result in problem
const client = createClient({url:process.env.NEXT_PUBLIC_BACKEND_API});

function MyApp({ Component, pageProps }) {

  return(
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav/>
            <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  )  
}

export default MyApp
