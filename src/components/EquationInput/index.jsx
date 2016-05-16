import React, { Component } from 'react'

class EquationInput extends Component {

	constructor(props) {
		super(props)

		this.state = {
			value: '',
			valid: false
		}
	}

	_filter = (event) => {
		const newValue = this.refs.equation.value
		const { value } = this.state

		if (newValue.length < value.length || '.0123456789+-*/xsct()'.indexOf(newValue.charAt(newValue.length - 1)) > -1) {
			let valid = true
			try {
				eval(`var x = 0; ${newValue.replace('t', 'Math.tan').replace('s', 'Math.sin').replace('c', 'Math.cos')}`)
			}
			catch (exception) {
				valid = false
			}

			this.setState({
				value: newValue,
				valid: valid && newValue.length
			})
		}
	}

	render() {
		const { value, valid } = this.state

		return (
			<div className='equation-input'>
				<input type='text' value={value} placeholder='Equation' onChange={this._filter} ref='equation' />
				<span className='valid'>{valid ? 'Valid' : 'Invalid'}</span>
			</div>
		)
	}

}

export default EquationInput
