import { Head, Html, Main, NextScript } from 'next/document'

export default () => (
  <Html>
    <Head />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)
