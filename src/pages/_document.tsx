/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script
                        async
                        defer
                        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=spacetravelingfragata"
                    />
                </body>
            </Html>
        );
    }
}
