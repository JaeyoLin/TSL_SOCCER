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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
        </Head>
        <App data={this.props.data} />
      </div>
    );
  }
}
