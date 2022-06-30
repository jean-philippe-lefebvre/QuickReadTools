import React from 'react';
import './App.css';
import ExMoreInfoByFixation from './exos/ExMoreInfoByFixation'
import ExDetection from './exos/ExDetection'

function App(){
	const [exo, setExo] = React.useState(1)
	const toogleExo = (n) => setExo(prev => n)

  return (
    <div className="App">
				<h1>Quick Read</h1>

				<div style={menuStyle}>
						<button onClick={() => toogleExo(1)} style={buttonStyle}>Info by Fixation</button>
						<button onClick={() => toogleExo(2)} style={buttonStyle}>Detection</button>
				</div>

				{exo === 1? <ExMoreInfoByFixation /> 
						: exo === 2 ? <ExDetection /> : null}

    </div>
  );
}

const menuStyle = {
		marginBottom: '15px'
}
const buttonStyle = {
	margin: '5px'
}

export default App;
