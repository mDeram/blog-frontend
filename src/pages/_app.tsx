import NotificationManager from "../components/Notification";
import "../styles/globals.scss";


function MyApp({ Component, pageProps }: any) {
    return (
        <>
            <NotificationManager />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp
