import React from 'react';

import './App.css';

import { streamingManagerV2, DEFAULT_PKT_INFO } from '@msf/msf-reactjs-weblib-base';
import HOC from './components/HOC';

function App() {

  streamingManagerV2.setStreamingURL('wss:/dev.gwcindia.in:8445/')
  streamingManagerV2.setSession('06c4e2e07a020db4a55413a8146cc17b');


  streamingManagerV2.setBinary(true);

  streamingManagerV2.setRetryCount(100);
  streamingManagerV2.setRetryInternal(5000);
  streamingManagerV2.setDisconnectedCB('function () {}');

  // streamingManagerV2.setPacketInfo(DEFAULT_PKT_INFO)


  streamingManagerV2.start();

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>App js</h1> */}
        <HOC />
      </header>
    </div>
  );
}

export default App;
