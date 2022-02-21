import Link from "next/link";
import styles from "../styles/Header.module.scss";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h1>mDeram's blog</h1>
            <Link href="/"><a>Blog</a></Link>
            <a href="https://github.com/mDeram">Github</a>
        </header>
    );
}

export default Header;
