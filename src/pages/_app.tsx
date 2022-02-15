import { createClient, Provider } from 'urql'
import '../styles/globals.css'

const client = createClient({
    url: "http://localhost:7000/graphql",
    /*fetchOptions: {
        credentials: "include"
    }*/
});

function MyApp({ Component, pageProps }: any) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp
