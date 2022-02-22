import Link from "next/link";
import styles from "../styles/Header.module.scss";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({
    title = "mDeram's blog"
}) => {
    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            <Link href="/"><a>Blog</a></Link>
            <a href="https://github.com/mDeram">Github</a>
        </header>
    );
}

export default Header;
