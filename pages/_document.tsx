import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link href="https://fonts.googleapis.com/earlyaccess/nikukyu.css" rel="stylesheet" />
        <meta name="robots" content="noindex" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
