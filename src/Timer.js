import React, {useState} from 'react'

export default function Timer() {
	const [minute, setMinute] = useState(0)	
	const [seconde, setSeconde] = useState(0)	
	const [start, setStart] = useState(false)	
	const [idTimer, setIdTimer] = useState(null)	

	const addSeconde = () => {
		setSeconde(prev => prev + 1)
		setIdTimer(setTimeout(addSeconde, 1000))
	}
	
	React.useEffect(() => {
		if(seconde === 60){
			setMinute(prev => prev + 1)
			setSeconde(0)
		}
	},[seconde])
	
	const startClick = () => {
			if(start){
				setStart(false)
				clearTimeout(idTimer)
			}
			else {
				setStart(true)
				addSeconde()
			}
	}

	const resetClick = () => {
		setSeconde(0)
		setMinute(0)
	}

	const format = (value) => {
		let newValue = String(value).padStart(2, '0')
		return newValue
	}

	return (
		<div style={timerStyle}>
			<div style={valueTimeStyle}>{format(minute)+ ':' + format(seconde)}</div>
			<button onClick={startClick}>{start ? 'Stop' : 'Start'}</button>
			<button onClick={resetClick}>Reset</button>
		</div>
	)
}

const timerStyle = {
	display:'flex',
	justifyContent: 'center'
}
const valueTimeStyle = {
	marginRight: '5px'
}
