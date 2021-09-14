import {ApolloProvider} from '@apollo/client';
import {useApollo} from '../apolloClient';
import {NextPage} from "next";
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';
import Head from 'next/head';


config.autoAddCss = false

const App: NextPage<any> = ({Component, pageProps}) => {

    const progress = new ProgressBar({
        size: 2,
        color: "#F59E0B",
        className: "bar-of-progress",
        delay: 80,
    });

    Router.events.on("routeChangeStart", progress.start);
    Router.events.on("routeChangeComplete", progress.finish);
    Router.events.on("routeChangeError", progress.finish);


    const apolloClient = useApollo(pageProps);


    return (
        <>
            <ApolloProvider client={apolloClient}>
                <Head>
                    <meta name="viewport" content={'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'}/>
                </Head>
                <Component {...pageProps} />
            </ApolloProvider>
        </>

    )
}

export default App