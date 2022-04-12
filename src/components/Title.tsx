import Head from "next/head";
import { DEFAULT_TITLE } from "../constants";

interface TitleProps {
    prefix?: string | null
}

const Title: React.FC<TitleProps> = ({
    prefix
}) => {
    let title = DEFAULT_TITLE;

    if (prefix)
        title = `${prefix} | ${title}`;

    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
}

export default Title;
