//TODO lookup import Head from 'next/head'
//TODO lookup import Image from 'next/image'
import { withUrqlClient } from 'next-urql';
import createUrqlClient from '../utils/createUrqlClient';

const Index: React.FC = () => {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

export default withUrqlClient(createUrqlClient)(Index);
