import {useState} from 'react'
import './App.css';
import {MXWidget} from './MXWidget';

function App() {
  const [widgetURL, setWidgetURL] = useState("")
  const [loadWidget, setLoadWidget] = useState(false)

  return (
    <div className="App">
      <input type="text" name="widgetURL" onChange={event => setWidgetURL(event.target.value)} />
      <button onClick={() => setLoadWidget(true)}>Load Widget</button>
      <button onClick={() => setLoadWidget(false)}>Close Widget</button>
      {loadWidget &&
        <MXWidget
          url={widgetURL}
          onEvent={(event) => {
            console.log('MX message: ', event)
          }}
        />
      }
    </div>
  );
}

export default App;
