import React, {useState} from 'react'
import Timer from '../Timer'

export default function ExDetection() {

	const [lignes, setLignes] = useState(7)
	const [column, setColumn] = useState(8)
	const [sizeNumber, setSizeNumber] = useState(2) 
	const [matrice, setMatrice] = useState(null)
	
	const lignesAdd = () => setLignes(prev => prev + 1)
	const lignesLess = () => setLignes(prev => prev - 1)
	const columnAdd = () => setColumn(prev => prev + 1 )
	const columnLess = () => setColumn(prev => prev - 1)
	const sizeNumberAdd = () => setSizeNumber(prev => prev + 1)
	const nextLvl = () => setSizeNumber(prev => prev + 1)
	
	const Matrice = () => <div style={matriceStyle}>{matrice}</div>
	const random = (min,max) => Math.trunc(Math.random() * ( max - min) + min)
	
	const generateNumber = (memory) => {
		let number = ''
		let prefix = null
		let init = 0

		//Prefix with the same start figure other column number to grow the difficult
		if(sizeNumber > 2 && memory !== null && random(1,3) === 1) {
			prefix = Array.from(memory).slice(0, sizeNumber/2)
			number = prefix.join('')
			init = sizeNumber/2
		} 

		for(let i = init ; i < sizeNumber; i++){
			number = number + String( random(1,9) )
		}

		return number
	}
	
	const generateMatrice = React.useEffect( () => {
		let matrice = []
		let number = []
		let memory = null

		for(let y = 0; y < lignes; y++){
			for(let i = 0; i < column; i++){
				let value = generateNumber(memory)
				if(i === 0) memory = value
				number.push(value)
			}
			
			memory = null
			//Duplicate first number in a other column
			let replaceIndex = Math.trunc(Math.random() * ( column - 1) + 1)
			number[replaceIndex] = number[0]

			number = number.map((x,i) => {
					if(i === 0) return <div style={columnStyle} key={'C-'+y+'-'+i}><strong>{x}</strong></div>
					return <div style={columnStyle} key={'C-'+y+'-'+i}>{x}</div>
			})
			matrice.push(<div style={flexStyle} key={'L-'+y}>{number}</div>)
			number = []
		}

		setMatrice(matrice)

	}, [lignes, column, sizeNumber])

	return (
		<div className='exo'>

				<div style={{display:'flex', justifyContent:'center'}}>
				<div style={infoStyle}>Read the first numbers in bold then find the same numbers on the same line, the most quickly as you can, and then again in the following line. <br/> You're an adult so you can start and stop the timer yourself.</div>
				</div>

			<div style={flexStyle}>
			<h3>Lvl: {sizeNumber} </h3>
			<button onClick={nextLvl} style={{marginLeft:'20px'}}>Next</button>
			</div>

			<Timer/>

			<div style={{...flexStyle, marginTop: '10px'}}>	

				<div style={{fontSize:'0.7em'}}>Ligne: {lignes}</div>
				<div style={{display:'flex'}}>
					<div onClick={lignesAdd} style={btnStyle2}>+</div>
					<div onClick={lignesLess} style={btnStyle2}>-</div>
				</div>

				<div style={{fontSize:'0.7em', marginLeft:'10px'}}>Column: {column}</div>
				<div style={{display:'flex'}}>
					<div onClick={columnAdd} style={btnStyle2}>+</div>
					<div onClick={columnLess} style={btnStyle2}>-</div>
				</div>

			</div>

			<Matrice />

		</div>
	)
}

const matriceStyle = {
		marginTop: '30px'
}
const columnStyle = {
	margin: '5px',
	width: 'auto',
	textAlign: 'center'
}
const btnStyle2 = {
	marginLeft: '10px',
	fontSize: '0.9em',
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
