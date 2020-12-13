import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store, { history, persistor } from "./ducks/store";
import routes from "./routes/routes";
import "./App.scss";
import { ConnectedRouter } from 'connected-react-router';
import Auth from './components/auth/Auth';
import SideNav from './components/layout/sideNav/SideNav';
import MobileNav from './components/layout/navbar/MobileNav';

import { PersistGate } from 'redux-persist/integration/react';

function App() {

  useEffect(() => {
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth />
        <ConnectedRouter history={history}>
          <SideNav />
          <MobileNav />

          <div>{routes}</div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
