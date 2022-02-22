import Header from "../components/Header";
import styles from "../styles/Layout.module.scss";

const Layout: React.FC = ({
    children
}) => {
    return (
        <>
        <Header />
        <div className={styles.centered}>
            {children}
        </div>
        </>
    );
}

export default Layout;
