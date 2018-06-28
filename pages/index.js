import React from 'react';

import App from '../components/App';

import getMenus from '../api/getMenus';

export default class extends React.Component {
  static async getInitialProps() {
    const json = await getMenus();
    return { data: json.data };
  }

  render() {
    return <App data={this.props.data} />;
  }
}
