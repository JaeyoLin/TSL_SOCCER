import React from 'react';
import Head from 'next/head';

import App from '../components/App';

import getMenus from '../api/getMenus';

export default class extends React.Component {
  static async getInitialProps() {
    const json = await getMenus();
    return { data: json.data };
  }

  render() {
    return (
      <div>
        <Head>
          <title>TSL SOCCER</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/assets/favicon.png"
          />
          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="TSL" />
          <link rel="apple-touch-icon" href="/static/assets/desktop.png" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <App data={this.props.data} />
      </div>
    );
  }
}
