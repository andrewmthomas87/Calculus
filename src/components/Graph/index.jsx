import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Graph extends Component {

	static propTypes = {
		equation: PropTypes.string.isRequired,
		leftX: PropTypes.number.isRequired,
		rightX: PropTypes.number.isRequired,
		intervals: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired,
		updateHovered: PropTypes.func.isRequired
	}

	_handleMouseEnter = (event) => {
		const { updateHovered } = this.props

		const xValue = parseFloat(event.target.getAttribute('data-x-value'))
		updateHovered(true, xValue)
	}

	_handleMouseLeave = (event) => {
		const { updateHovered } = this.props
		updateHovered(false)
	}

	render() {
		const { equation, leftX, rightX, intervals, position } = this.props

		if (!(equation && intervals)) {
			return (
				<section className='graph'>
					<span className='error'>Riemann sum calculator</span>
				</section>
			)
		}

		const values = []
		const xValues = []

		let maxValue = 0
		for (let i = 0; i < intervals; i++) {
			let x
			switch (position) {
				case 1:
					x = leftX + i * (rightX - leftX) / intervals
					break;
				case 2:
					x = leftX + (i * 2 + 1) * (rightX - leftX) / (intervals * 2)
					break;
				case 3:
					x = rightX - (intervals - i - 1) * (rightX - leftX) / intervals
					break;
			}

			const value = eval(`var x = ${x}; ${equation}`)
			if (Math.abs(value) > maxValue) {
				maxValue = Math.abs(value)
			}
			xValues.push(x)
			values.push(value)
		}

		if (maxValue === Infinity) {
			return (
				<section className='graph'>
					<span className='error'>Infinite value</span>
				</section>
			)
		}

		let definiteMaxValue = 0, definiteMinValue = 0
		for (let i = 0; i <= intervals * 2; i++) {
			const x = leftX + i * (rightX - leftX) / (intervals * 2)
			const value = eval(`var x = ${x}; ${equation}`)
			if (value > definiteMaxValue) {
				definiteMaxValue = value
			}
			else if (value < definiteMinValue) {
				definiteMinValue = value
			}
		}

		let range = definiteMaxValue - definiteMinValue
		definiteMaxValue += range / 10
		definiteMinValue -= range / 10

		range *= 1.2
		const xAxisFromTop = definiteMaxValue / range

		return (
			<section className='graph'>
				{values.map((value, index) => {
					const style = {
						width: `${100 / intervals}%`,
						height: `${100 * Math.abs(value) / range}%`,
						left: `${index * 100 / intervals}%`,
						backgroundColor: `rgb(78, ${Math.floor(205 - 23 * (index / intervals))}, ${Math.floor(164 + 41 * (index / intervals))})`
					}

					if (value < 0) {
						style.top = `${xAxisFromTop * 100}%`
					}
					else {
						style.bottom = `${(1.0 - xAxisFromTop) * 100}%`
					}

					return <div key={index} className='box' style={style} data-x-value={xValues[index]} onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}></div>
				})}
			</section>
		)
	}

}

export default Graph
