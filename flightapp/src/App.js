import HelloWorld from './HelloWorld';
import './App.css';

function App() { // Functional component
  return (
    <div className="App">
      <p>
       Parent App Content
     </p>
	  <HelloWorld/>
    </div>
  );
}

export default App;
