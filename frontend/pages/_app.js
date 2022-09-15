import '../styles/globals.css'
import {Provider,createClient} from "urql";
import Nav from '../components/Nav';
import {StateContext} from "../lib/context"
//url & URL are different using URL will result in problem
const client = createClient({url:process.env.NEXT_PUBLIC_BACKEND_API});

function MyApp({ Component, pageProps }) {

  return(
    <StateContext>
    <Provider value={client}>
      <Nav/>
      <Component {...pageProps} />
    </Provider>
    </StateContext>
  )  
}

export default MyApp
