import type { NextPage } from 'next';
import Head from 'next/head';

import { TrainsGraph } from '../modules/trainsGraph';

const Page: NextPage = () => (
    <>
        <Head>
            <title>Wykres Ruchu Pociągów</title>
        </Head>
        <TrainsGraph />
    </>
);

export default Page;
