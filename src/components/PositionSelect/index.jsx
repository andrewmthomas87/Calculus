import React, { Component, PropTypes } from 'react'

class PositionSelect extends Component {

	static propTypes = {
		updatePosition: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			position: 1
		}
	}

	_changePosition = (event) => {
		const { updatePosition } = this.props

		const position = parseInt(event.target.getAttribute('data-position'))

		if (position) {
			updatePosition(position)
			this.setState({
				position: position
			})
		}
	}

	render() {
		const { position } = this.state

		return (
			<div className='position-select'>
				<a data-position='1' className={position === 1 ? 'active' : ''} onClick={this._changePosition}>Left</a>
				<a data-position='2' className={position === 2 ? 'active' : ''} onClick={this._changePosition}>Middle</a>
				<a data-position='3' className={position === 3 ? 'active' : ''} onClick={this._changePosition}>Right</a>
			</div>
		)
	}

}

export default PositionSelect
