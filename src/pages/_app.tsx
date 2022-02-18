import NotificationManager from "../components/Notification";
import urqlClient from "../utils/createUrqlClient";
import "../styles/globals.scss";
import { Provider } from "urql";


function MyApp({ Component, pageProps }: any) {
    return (
        <Provider value={urqlClient}>
            <NotificationManager />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp
