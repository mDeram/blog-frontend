import Title from "../components/Title";
import NotificationManager from "../components/Notification";
import "../styles/globals.scss";


function MyApp({ Component, pageProps }: any) {
    return (
        <>
            <Title />
            <NotificationManager />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp
