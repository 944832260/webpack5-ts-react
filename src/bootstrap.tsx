
import * as React from 'react'
import { createRoot } from 'react-dom/client';
import Routers from '@router/router';
import { Provider } from 'react-redux';
import { BrowserRouter, } from 'react-router-dom';
import createStore from '@store/index';
const store = createStore();
import './rely'

const container = (document.getElementById('root') as HTMLElement);
const root = createRoot(container);

declare var module: any;
if (module.hot) {
    console.log('热更新');
    module.hot.accept()
}
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
    </Provider>
);