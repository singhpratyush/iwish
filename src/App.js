import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch} from 'react-router-dom';

import {getStore} from './store';

// Components
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
			<Provider store={getStore()}>
				<BrowserRouter>
					<Header/>
				</BrowserRouter>
			</Provider>
		);
  }
}

export default App;
