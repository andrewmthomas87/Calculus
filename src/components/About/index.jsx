import React, { Component } from 'react'

class About extends Component {

	constructor(props) {
		super(props)

		this.pages = [
			<p>This application is a graphical <span>Riemann Sum Calculator</span>. It allows the user to input an <span>equation</span>, <span>bounds</span> and <span>number of intervals</span>, as well as <span>type</span> of Riemann Sum to use. Riemann Sums are useful as an <span>introduction</span> to <span>integration</span>. This application is useful because it allows a user to <span>visually</span> see how Riemann Sums are constructed. Also, it shows how as the number of intervals approaches <span>infinity</span>, the computed area is increasingly accurate.</p>,
			<p>To calculate a <span>Riemann Sum</span>...<br />Input an equation in the top input box. This equation can involve <span>sin</span>, <span>cos</span>, <span>tan</span>, the <span>+ - * / ^</span> operators, the constant <span>pi</span>, and any necessary <span>parentheses</span>.<br />Select the type of <span>Riemann Sum</span>: <span>Left</span>, <span>Middle</span>, or <span>Right</span>.<br />Input the <span>left X</span> and <span>right X</span> values, as well as the number of <span>intervals</span>. Tap the <span>enter</span> key when one of these inputs is focused to update these values.</p>,
			<p>Lots of <span>code</span>, yo.<br /><img src='code.png' /></p>
		]
		this.state = {
			active: false,
			page: 1
		}
	}

	_open = () => {
		this.setState({
			active: true
		})
	}

	_close = (event) => {
		if (event.target === this.refs.overlay) {
			this.setState({
				active: false,
				page: 1
			})
		}
	}

	_changePage = (event) => {
		const page = parseInt(event.target.getAttribute('data-page'))

		if (page) {
			this.setState({
				page: page
			})
		}
	}

	render() {
		const { active, page } = this.state

		const question = <span className='question' onClick={this._open}>?</span>

		return active ? (
			<div>
				{question}
				<section className='overlay' onClick={this._close} ref='overlay'>
					<div className='about'>
						<h1>About</h1>
						<nav>
							<a className={page === 1 ? 'active' : ''} data-page='1' onClick={this._changePage}>About</a>
							<a className={page === 2 ? 'active' : ''} data-page='2' onClick={this._changePage}>Usage</a>
							<a className={page === 3 ? 'active' : ''} data-page='3' onClick={this._changePage}>Making</a>
						</nav>
						<div className='page'>
							{this.pages[page - 1]}
						</div>
					</div>
				</section>
			</div>
		) : question
	}

}

export default About
