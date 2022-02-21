import Header from "../components/Header";
import styles from "../styles/Layout.module.scss";

const Layout: React.FC = ({
    children
}) => {
    return (
        <>
        <Header />
        <div className={styles.content}>
            <div className={styles.centered}>
                {children}
            </div>
        </div>
        </>
    );
}

export default Layout;
