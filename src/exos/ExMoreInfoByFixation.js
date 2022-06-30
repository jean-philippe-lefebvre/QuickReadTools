import React from 'react';

export default function ExMoreInfoByFixation(){
	
	const max = 10
	const [cache, setCache] = React.useState(false)
	const [score, setScore] = React.useState(0)

	const [level, setLevel] = React.useState(2)
	const [time, setTime] = React.useState(300)
	const [fontSize, setFontSize] = React.useState(30)
	const [number, setNumber] = React.useState()
	
	const levelUp = () => setLevel(prev => prev + 1)

	const timeAdd = () => setTime(prev => prev + 10)
	const timeLess = () => setTime(prev => prev - 10 === 0 ? prev : prev - 10)
	const cacheTrue = () => setCache(true)
	const cacheFalse = () => setCache(false)
	const fontSizeAdd = () => setFontSize(prev => prev + 5)
	const fontSizeLess = () => setFontSize(prev => prev - 5)

	const goal = () => {
		setScore(prev => prev + 1)
		if(score === 5){
				levelUp()
				setScore(0)
		}
	}

	const constructNumber = () => {
			let number = ''
			for(let i = 0; i < level; i++){
				number = number + String(Math.trunc(Math.random() * (max - 1)))
			}
			return number
	}
	
	const displayNumber = () => {
			setNumber(constructNumber())
			cacheFalse()
			setTimeout(cacheTrue, time)
			insertSpace(6876)
	}
	
	React.useEffect(() => { 
			displayNumber()
	}, [level, score])

	const check = (evt) => {
		if(evt.target.value == number) {
			goal()
			cacheFalse()
			evt.target.value = ''
		}
	}
	const pass = (evt) => {
		if(evt.key === 'Enter'){
				displayNumber()
				evt.target.value = ''
		}
	}
	const insertSpace = (n) => {
		let number = String(n).split(/(\d{3})/).join(' ').trim()
		return number	
	}

		return (
				<div className='exo'>
				<div style={{display:'flex', justifyContent:'center'}}>
				<div style={infoStyle}>
				A number is displayed for some milliseconds and then obscured. Play with parameters to increase the difficulty. When your score is 5 the next point increases your level, so the next number will have more digits.
				</div></div>

				<h3>Lvl: {level} / score: {score}</h3>

				<div style={flexStyle}>	
					<div style={{fontSize:'0.7em'}}>Time: {time}ms</div>
					<div style={{display:'flex', marginLeft:'10px'}}>
						<div onClick={timeAdd} style={btnStyle2}>+</div>
						<div onClick={timeLess} style={btnStyle2}>-</div>
					</div>
				</div>

				<div style={flexStyle}>
					<div style={{...flexStyle, width:'200px', height:'100px'}}>
						<p style={{...numberStyle, fontSize: String(fontSize)+'px'}}>
							{cache ? 'XXX' : insertSpace(number)}
						</p>
					</div>

					<div style={{display:'flex', marginLeft:'10px'}}>
						<div onClick={fontSizeAdd} style={btnStyle}>+</div>
						<div onClick={fontSizeLess} style={btnStyle}>-</div>
					</div>
				</div>

				<input autoFocus type='number' style={inputStyle} placeholder='0123..'
					onChange={check}
					onKeyDown={pass}
				/>
				<div style={{fontSize:'20px', marginTop:'10px'}}>Enter => Next number</div>
				</div>
		)
}

const btnStyle = {
	marginLeft: '15px',
	fontSize: '1.2em',
}
const btnStyle2 = {
	marginLeft: '10px',
	fontSize: '0.9em',
}
const numberStyle = {
	fontWeight: '500',
}
const inputStyle = {
	borderRadius: '5px',
	fontSize: '1.2em',
	padding: '5px',
	paddingLeft: '15px'
}
const flexStyle = {
	display:'flex', 
	justifyContent: 'center',
	alignItems: 'center'
}

const infoStyle = {
	fontSize: '0.7em',
	width: '70%',
}
