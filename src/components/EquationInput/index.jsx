import React, { Component, PropTypes } from 'react'

class EquationInput extends Component {

	static propTypes = {
		updateEquation: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			value: '',
			valid: false
		}
	}

	_filter = () => {
		const newValue = this.refs.equation.value
		const { value } = this.state
		const { updateEquation } = this.props

		let equation = newValue

		let index = equation.indexOf('sin(')
		while (index > -1) {
			let endIndex = index + 4
			let depth = 1
			while (true) {
				if (equation.charAt(endIndex) === ')') {
					depth--
				}
				else if (equation.charAt(endIndex) === '(') {
					depth++
				}

				if (endIndex == equation.length || depth == 0) {
					break
				}

				endIndex++
			}

			equation = `${equation.substring(0, index)}(Math.nis(${equation.substring(index + 4, endIndex + 1)})${equation.substring(endIndex + 1, equation.length)}`

			index = equation.indexOf('sin(')
		}

		equation = equation.replace('Math.nis', 'Math.sin')

		index = equation.indexOf('cos(')
		while (index > -1) {
			let endIndex = index + 4
			let depth = 1
			while (true) {
				if (equation.charAt(endIndex) === ')') {
					depth--
				}
				else if (equation.charAt(endIndex) === '(') {
					depth++
				}

				if (endIndex == equation.length || depth == 0) {
					break
				}

				endIndex++
			}

			equation = `${equation.substring(0, index)}(Math.soc(${equation.substring(index + 4, endIndex + 1)})${equation.substring(endIndex + 1, equation.length)}`

			index = equation.indexOf('cos(')
		}

		equation = equation.replace('Math.soc', 'Math.cos')

		index = equation.indexOf('tan(')
		while (index > -1) {
			let endIndex = index + 4
			let depth = 1
			while (true) {
				if (equation.charAt(endIndex) === ')') {
					depth--
				}
				else if (equation.charAt(endIndex) === '(') {
					depth++
				}

				if (endIndex == equation.length || depth == 0) {
					break
				}

				endIndex++
			}

			equation = `${equation.substring(0, index)}(Math.nat(${equation.substring(index + 4, endIndex + 1)})${equation.substring(endIndex + 1, equation.length)}`

			index = equation.indexOf('tan(')
		}

		equation = equation.replace('Math.nat', 'Math.tan')

		equation = equation.replace('pi', '(Math.PI)')

		index = equation.search(/[0-9][^0-9+\-*/.^)]/)
		while (index > -1) {
			equation = `${equation.substring(0, index + 1)}*${equation.substring(index + 1)}`
			index = equation.search(/[0-9][^0-9+\-*/.^)]/)
		}

		index = equation.search(/[^+\-*/^(ns]\(/)
		while (index > -1) {
			equation = `${equation.substring(0, index + 1)}*${equation.substring(index + 1)}`
			index = equation.search(/[^+\-*/^(ns]\(/)
		}

		index = equation.indexOf('^')
		while (index > 0) {

			const previous = equation.charAt(index - 1)
			const next = equation.charAt(index + 1)

			if (!next) {
				equation = `${equation.substring(0, index)}!${equation.substring(index + 1)}`
				index = equation.indexOf('^')
				break
			}

			let startIndex = index - 2
			if (/[0-9.]/.test(previous)) {
				while (true) {
					if (startIndex < 0 || !/[0-9.]/.test(equation.charAt(startIndex))) {
						startIndex++
						break
					}

					startIndex--
				}
			}
			else if (previous === ')') {
				let depth = 1
				while (true) {
					if (equation.charAt(startIndex) == '(') {
						depth--
					}
					else if (equation.charAt(startIndex) == ')') {
						depth++
					}

					if (startIndex < 0 || depth == 0) {
						break
					}

					startIndex--
				}
			}
			else if (previous === 'x') {
				startIndex++
			}
			else {
				startIndex = -1
			}

			let endIndex = index + 2
			if (/[0-9.]/.test(next)) {
				while (true) {
					if (endIndex === equation.length || !/[0-9.]/.test(equation.charAt(endIndex))) {
						endIndex--
						break
					}

					endIndex++
				}
			}
			else if (next === '(') {
				let depth = 1
				while (true) {
					if (equation.charAt(endIndex) == ')') {
						depth--
					}
					else if (equation.charAt(endIndex) == '(') {
						depth++
					}

					if (endIndex === equation.length || depth == 0) {
						break
					}

					endIndex++
				}
			}
			else if (next === 'x') {
				endIndex--
			}
			else {
				equation = `${equation.substring(0, index)}!${equation.substring(index + 1)}`
				endIndex = equation.length
			}

			if (startIndex > -1 && endIndex < equation.length) {
				equation = `${equation.substring(0, startIndex)}(Math.pow(${equation.substring(startIndex, index)}, ${equation.substring(index + 1, endIndex + 1)}))${equation.substring(endIndex + 1)}`
			}
			else {
				equation = `${equation.substring(0, index)}!${equation.substring(index + 1)}`
			}

			index = equation.indexOf('^')
		}

		if (/^[0-9+\-*/^.sincotapx()]*$/.test(newValue)) {
			let valid = !!newValue.length

			if (valid) {
				try {
					eval(`var x = 0; ${equation}`)
					console.log(equation)
				}
				catch (exception) {
					valid = false
				}
			}

			updateEquation(valid ? equation : false, valid ? newValue : false)

			this.setState({
				value: newValue,
				valid: valid
			})
		}
		else {
			updateEquation(false, false)
		}
	}

	render() {
		const { value, valid } = this.state

		return (
			<div className='equation-input'>
				<input type='text' className={valid ? 'valid' : ''} value={value} placeholder='Equation' onChange={this._filter} ref='equation' />
			</div>
		)
	}

}

export default EquationInput
