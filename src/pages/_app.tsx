import NotificationManager from '../components/Notification';
import { createClient, Provider } from 'urql'
import '../styles/globals.scss'

const client = createClient({
    url: "http://localhost:7000/graphql",
    /*fetchOptions: {
        credentials: "include"
    }*/
});

function MyApp({ Component, pageProps }: any) {
    return (
        <Provider value={client}>
            <NotificationManager />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp
