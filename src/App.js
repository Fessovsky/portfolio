import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './components/Header';
import PageComponent from './components/PageComponent';
import { UriProvider } from './hooks/UriProvider';

export default function App() {
    return (
        <div className="App container pt-3">
            <UriProvider>
                <Header />
                <PageComponent />
            </UriProvider>
        </div>
    );
}
