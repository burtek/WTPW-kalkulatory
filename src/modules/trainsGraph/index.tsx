import { NextPage } from 'next';
import { Provider } from 'react-redux';
import { Config } from './components/Config';
import { Plot } from './components/Plot';
import { persistor, store } from './state';
import { PersistGate } from 'redux-persist/integration/react';

export const TrainsGraph: NextPage = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="container">
                    <Config />
                    <hr />
                    <Plot />
                </div>
            </PersistGate>
        </Provider>
    );
};
TrainsGraph.displayName = 'TrainsGraph';
