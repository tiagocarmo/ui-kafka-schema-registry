import Document, { Html, Head, Main, NextScript } from 'next/document';

const styles = {
  body: {
    backgroundColor: 'rgba(248,249,250, 1)!important'
  }
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU' crossOrigin='anonymous' />
        </Head>
        <body className='bg-light p-3' style={styles.styles}>
          <Main />
          <NextScript />
          <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js' integrity='sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ' crossOrigin='anonymous'></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
