import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div className="container">
            <Head>
                <title>Kalkulatory i generatory</title>
            </Head>
            <Link href="/trains-graph">Wykres Ruchu Pociągów</Link>
        </div>
    );
};

export default Home;
