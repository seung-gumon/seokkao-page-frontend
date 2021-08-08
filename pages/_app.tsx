import {ApolloProvider} from '@apollo/client';
import {useApollo} from '../apolloClient';
import {NextPage} from "next";
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';

config.autoAddCss = false

const App: NextPage<any> = ({Component, pageProps}) => {

    const progress = new ProgressBar({
        size: 2,
        color: "#FCD34D",
        className: "bar-of-progress",
        delay: 100,
    });

    Router.events.on("routeChangeStart", progress.start);
    Router.events.on("routeChangeComplete", progress.finish);
    Router.events.on("routeChangeError", progress.finish);


    const apolloClient = useApollo(pageProps);


    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default App