import React, { Component } from 'react'

import EquationInput from '../EquationInput'
import PositionSelect from '../PositionSelect'
import RangeIntervalsInput from '../RangeIntervalsInput'
import Graph from '../Graph'
import Information from '../Information'

class RiemannSumCalculator extends Component {

	constructor(props) {
		super(props)

		this.state = {
			equation: false,
			leftX: 0,
			rightX: 0,
			intervals: 0,
			position: 1,
			hovered: false,
			x: 0
		}
	}

	_updateEquation = (equation) => {
		this.setState({
			equation: equation
		})
	}

	_updateRangeIntervals = (leftX, rightX, intervals) => {
		this.setState({
			leftX: leftX,
			rightX: rightX,
			intervals: intervals
		})
	}

	_updatePosition = (position) => {
		this.setState({
			position: position
		})
	}

	_updateHovered = (hovered, x) => {
		if (!hovered) {
			this.setState({
				hovered: false,
				x: 0
			})
		}
		else {
			this.setState({
				hovered: true,
				x: x
			})
		}
	}

	render() {
		const { equation, leftX, rightX, intervals, position, hovered, x } = this.state

		return (
			<div>
				<EquationInput updateEquation={this._updateEquation} />
				<PositionSelect updatePosition={this._updatePosition} />
				<RangeIntervalsInput updateRangeIntervals={this._updateRangeIntervals} />
				<Graph equation={equation || ''} leftX={leftX} rightX={rightX} intervals={intervals} position={position} updateHovered={this._updateHovered} />
				<Information hovered={hovered} x={x} equation={equation || ''} leftX={leftX} rightX={rightX} intervals={intervals} position={position} /> 
			</div>
		)
	}

}

export default RiemannSumCalculator
