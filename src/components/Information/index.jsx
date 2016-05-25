import React, { Component, PropTypes } from 'react'

class Information extends Component {

	static propTypes = {
		values: PropTypes.object.isRequired,
		leftX: PropTypes.number.isRequired,
		rightX: PropTypes.number.isRequired,
		equation: PropTypes.string.isRequired,
		hoverIndex: PropTypes.number.isRequired
	}

	render() {
		const { values, leftX, rightX, equation, hoverIndex } = this.props

		if (!values.x.length) {
			return null
		}

		const area = values.y.map(value => value * (rightX - leftX) / values.x.length).filter(value => !isNaN(value)).reduce((previous, current) => previous + current)

		const coordinate = hoverIndex > -1 ? (
			<span className='coordinate'>{`${Math.round(values.x[hoverIndex] * 10000) / 10000}, ${Math.round(values.y[hoverIndex] * 10000) / 10000}`}</span>
		) : null

		return (
			<div className='information'>
				{coordinate}
				<span className='integral' data-left-x={Math.round(leftX * 10000) / 10000} data-right-x={Math.round(rightX * 10000) / 10000}>{equation}</span>
				<span className='area'>Area = {Math.round(area * 10000) / 10000}</span>
			</div>
		)
	}

}

export default Information
