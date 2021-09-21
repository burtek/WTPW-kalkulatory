import '../styles/globals.css';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
export default MyApp;
