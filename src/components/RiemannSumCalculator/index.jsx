import React, { Component } from 'react'

import EquationInput from '../EquationInput'
import PositionSelect from '../PositionSelect'
import RangeIntervalsInput from '../RangeIntervalsInput'
import Graph from '../Graph'
import Information from '../Information'
import About from '../About'

class RiemannSumCalculator extends Component {

	constructor(props) {
		super(props)

		this.equation = false
		this.leftX = 0
		this.rightX = 0
		this.intervals = 0
		this.position = 0
		this.values = {
			x: [],
			y: []
		}
		this.definiteMin = 0
		this.definiteMax = 0

		this.state = {
			values: {
				x: [],
				y: []
			},
			hoverIndex: -1
		}
	}

	_updateValues(values, intervals, position) {
		if (!(values.x.length && position !== null)) {
			this.setState({
				values: {
					x: [],
					y: []
				},
				hoverIndex: -1
			})
			return
		}

		const filteredValues = {
			x: [],
			y: []
		}

		for (let i = 0; i < intervals; i++) {
			filteredValues.x.push(values.x[position + i * 2])
			filteredValues.y.push(values.y[position + i * 2])
		}

		this.setState({
			values: filteredValues,
			hoverIndex: -1
		})
	}

	_updateEquationValues(equation, leftX, rightX, intervals) {
		if (!(equation && leftX !== null && rightX !== null && intervals)) {
			this.values.x = []
			this.values.y = []
			this.definiteMin = 0
			this.definiteMax = 0

			this.setState({
				values: {
					x: [],
					y: []
				},
				hoverIndex: -1
			})
			return
		}

		const x = []
		const y = []
		this.definiteMin = 0
		this.definiteMax = 0

		for (let i = 0; i < intervals * 2 + 1; i++) {
			const xCoordinate = leftX + i * (rightX - leftX) / (intervals * 2)
			const yCoordinate = eval(`var x = ${xCoordinate}; ${equation}`)

			x.push(xCoordinate)
			y.push(yCoordinate)

			if (yCoordinate > this.definiteMax) {
				this.definiteMax = yCoordinate
			}
			else if (yCoordinate < this.definiteMin) {
				this.definiteMin = yCoordinate
			}
		}

		this.values.x = x
		this.values.y = y

		this._updateValues(this.values, this.intervals, this.position)
	}

	_updateEquation = (equation) => {
		this.equation = equation

		this._updateEquationValues(equation, this.leftX, this.rightX, this.intervals)
	}

	_updateRangeIntervals = (leftX, rightX, intervals) => {
		this.leftX = leftX
		this.rightX = rightX
		this.intervals = intervals

		this._updateEquationValues(this.equation, leftX, rightX, intervals)
	}

	_updatePosition = (position) => {
		this.position = position

		this._updateValues(this.values, this.intervals, position)
	}

	_updateHoverIndex = (index) => {
		this.setState({
			hoverIndex: index
		})
	}

	render() {
		const { values, hoverIndex } = this.state

		return (
			<div>
				<EquationInput updateEquation={this._updateEquation} />
				<PositionSelect updatePosition={this._updatePosition} />
				<RangeIntervalsInput updateRangeIntervals={this._updateRangeIntervals} />
				<Information values={values} leftX={this.leftX} rightX={this.rightX} hoverIndex={hoverIndex} />
				<Graph yValues={values.y} definiteMin={this.definiteMin} definiteMax={this.definiteMax} updateHoverIndex={this._updateHoverIndex} />
				<About />
			</div>
		)
	}

}

export default RiemannSumCalculator
