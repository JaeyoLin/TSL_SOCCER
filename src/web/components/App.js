import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './Hello';

const App = () => {
  return (
    <div>
      <p>Hello React</p>
      <Hello hello="AAAA" />
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById('app'));
