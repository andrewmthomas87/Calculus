import React, { Component, PropTypes } from 'react'

class RangeIntervalsInput extends Component {

	static propTypes = {
		updateRangeIntervals: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			leftX: 0.0,
			rightX: 0.0,
			intervals: 0,
			valid: false
		}
	}

	_updateRangeIntervals = () => {
		const leftXValue = this.refs.leftX.value
		const rightXValue = this.refs.rightX.value
		const intervalsValue = this.refs.intervals.value

		try {
			let leftX = parseFloat(leftXValue)
			let rightX = parseFloat(rightXValue)
			const intervals = parseInt(intervalsValue)

			if (leftX != rightX && !(isNaN(leftX) || isNaN(rightX)) && intervals > 0) {
				if (leftXValue.endsWith('pi')) {
					leftX *= Math.PI
				}
				if (rightXValue.endsWith('pi')) {
					rightX *= Math.PI
				}

				this.setState({
					leftX: Math.min(leftX, rightX),
					rightX: Math.max(leftX, rightX),
					intervals: intervals,
					valid: true
				})
			}
			else {
				this.setState({
					leftX: 0.0,
					rightX: 0.0,
					intervals: 0,
					valid: false
				})
			}
		}
		catch (exception) {
			this.setState({
				leftX: 0.0,
				rightX: 0.0,
				intervals: 0,
				valid: false
			})
		}
	}

	_submitRangeIntervals = (event) => {
		if (event.key !== 'Enter') {
			return
		}

		const { updateRangeIntervals } = this.props
		const { leftX, rightX, intervals } = this.state

		updateRangeIntervals(leftX, rightX, intervals)
	}

	render() {
		const { valid } = this.state

		return (
			<div className={`range-intervals-input${valid ? ' valid' : ''}`}>
				<input type='text' placeholder='Left x' onChange={this._updateRangeIntervals} ref='leftX' onKeyDown={this._submitRangeIntervals} />
				<input type='text' placeholder='Right x' onChange={this._updateRangeIntervals} ref='rightX' onKeyDown={this._submitRangeIntervals} />
				<input type='text' placeholder='Intervals' onChange={this._updateRangeIntervals} ref='intervals' onKeyDown={this._submitRangeIntervals} />
			</div>
		)
	}

}

export default RangeIntervalsInput
