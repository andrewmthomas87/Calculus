import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Graph extends Component {

	static propTypes = {
		yValues: PropTypes.array.isRequired,
		definiteMin: PropTypes.number.isRequired,
		definiteMax: PropTypes.number.isRequired,
		updateHoverIndex: PropTypes.func.isRequired
	}

	_handleMouseEnter = (event) => {
		const { updateHoverIndex } = this.props
		const index = parseInt(event.target.getAttribute('data-index'))

		if (index || index === 0) {
			updateHoverIndex(index)
		}
	}

	_handleMouseLeave = (event) => {
		const { updateHoverIndex } = this.props

		updateHoverIndex(-1)
	}

	render() {
		const { yValues, definiteMin, definiteMax } = this.props

		let content

		if (!yValues.length) {
			content = <span className='error'>Riemann sum calculator</span>
		}
		else {
			let temporaryMax = 0
			const max = yValues.filter(value => {
				const magnitude = Math.abs(value)

				if (magnitude > temporaryMax) {
					temporaryMax = magnitude
					return true
				}

				return false
			}).pop()

			if (max === Infinity) {
				content = <span className='error'>Infinite value</span>
			}
			else {
				let range = (definiteMax - definiteMin) * 1.2
				const xAxisFromTop = (definiteMax + range / 10) / range

				content = yValues.map((value, index) => {
					if (isNaN(value)) {
						value = 0
					}

					const style = {
						width: `${100 / yValues.length}%`,
						height: `${100 * Math.abs(value) / range}%`,
						left: `${index * 100 / yValues.length}%`,
						backgroundColor: `rgb(78, ${Math.floor(205 - 23 * (index / yValues.length))}, ${Math.floor(164 + 41 * (index / yValues.length))})`
					}

					if (value < 0) {
						style.top = `${xAxisFromTop * 100}%`
					}
					else {
						style.bottom = `${(1.0 - xAxisFromTop) * 100}%`
					}

					return <div key={index} data-index={index} className='box' style={style} onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}></div>
				})
			}
		}

		return <section className='graph'>{content}</section>
	}

}

export default Graph
