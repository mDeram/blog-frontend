import Header from "../components/Header";
import styles from "../styles/Layout.module.scss";

interface LayoutProps {
    title?: string
}

const Layout: React.FC<LayoutProps> = ({
    children,
    title
}) => {
    return (
        <>
        <Header title={title}/>
        <div className={styles.centered}>
            {children}
        </div>
        </>
    );
}

export default Layout;
