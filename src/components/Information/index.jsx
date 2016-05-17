import React, { Component, PropTypes } from 'react'

class Information extends Component {

	static propTypes = {
		hovered: PropTypes.bool.isRequired,
		x: PropTypes.number.isRequired,
		equation: PropTypes.string.isRequired,
		leftX: PropTypes.number.isRequired,
		rightX: PropTypes.number.isRequired,
		intervals: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired
	}

	render() {
		const { hovered, x, equation, leftX, rightX, intervals, position } = this.props

		if (!(intervals && equation)) {
			return null
		}

		const values = []

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
			values.push(value)
		}

		if (maxValue === Infinity) {
			return null
		}

		const area = values.map(value => value * (rightX - leftX) / intervals).reduce((previous, current) => previous + current)

		const coordinate = hovered ? (
			<span className='coordinate'>{`(${x}, ${eval(`var x = ${x}; ${equation}`)})`}</span>
		) : null

		return (
			<div className='information'>
				{coordinate}
				<span className='area'>Area - {Math.round(area * 10000) / 10000}</span>
			</div>
		)
	}

}

export default Information
