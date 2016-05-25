import React, { Component } from 'react'

class About extends Component {

	constructor(props) {
		super(props)

		this.pages = [
			<p>This application is a graphical <span>Riemann Sum Calculator</span>. It allows the user to input an <span>equation</span>, <span>bounds</span> and <span>number of intervals</span>, as well as <span>type</span> of Riemann Sum to use. Riemann Sums are useful as an <span>introduction</span> to <span>integration</span>. This application is useful because it allows a user to <span>visually</span> see how Riemann Sums are constructed. Also, it shows how as the number of intervals approaches <span>infinity</span>, the computed area is increasingly accurate.<br /><img src='intervals.gif' /></p>,
			<p>To calculate a <span>Riemann Sum</span>...<br />Input an equation in the top input box. This equation can involve <span>sin</span>, <span>cos</span>, <span>tan</span>, the <span>+ - * / ^</span> operators, the constant <span>pi</span>, and any necessary <span>parentheses</span>.<br />Select the type of <span>Riemann Sum</span>: <span>Left</span>, <span>Middle</span>, or <span>Right</span>.<br />Input the <span>left X</span> and <span>right X</span> values, as well as the number of <span>intervals</span>. Tap the <span>enter</span> key when one of these inputs is focused to update these values.<br /><br /><span>Example equations</span><br />(2x^3+15.4x-5)/(sin(pi*x)^2), pi*tan(x)/(x^0.5), cos(2pi*x)<br /><br /><span>Example bounds</span><br />-3.2938, 20, pi, -17pi<br /><br />The color of the borders of the input boxes indicates the validity of the inputs; <span>teal</span> means valid, <span className='red'>red</span> means invalid.</p>,
			<p><span>Linear equations</span> that pass through the origin (no c value) will have the same computed area using a <span>Middle</span> Riemann Sum calculation regardless of the number of intervals. For example, using the equation <span>15.4x</span> on the interval <span>[3.5, 7.333]</span>, the area is <span>319.7262</span> using <span>1</span>, <span>1000</span>, or <span>any number</span> of intervals.<br /><br />Any <span>quadratic function</span> with <span>one term</span> looks the same for any position number <span>n</span> on the interval <span>[0, n]</span>. For example, the equation <span>2.5x^3</span> looks the same on the intervals <span>[0, 0.00001]</span> and <span>[0, 9382.283]</span>.</p>,
			<p>Lots of <span>code</span>, yo.<br /><img src='code.png' />All of the code is on Github (<a href='https://github.com/andrewmthomas87/Calculus' target='_blank'>https://github.com/andrewmthomas87/Calculus</a>).</p>
		]
		this.state = {
			active: true,
			page: 1
		}
	}

	_open = () => {
		this.setState({
			active: true
		})
	}

	_close = (event) => {
		if (event.target === this.refs.overlay || event.target === this.refs.close) {
			this.setState({
				active: false
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
						<span className='close' onClick={this._close} ref='close'></span>
						<h1>Riemann Sum Calculator</h1>
						<nav>
							<a className={page === 1 ? 'active' : ''} data-page='1' onClick={this._changePage}>About</a>
							<a className={page === 2 ? 'active' : ''} data-page='2' onClick={this._changePage}>Usage</a>
							<a className={page === 3 ? 'active' : ''} data-page='3' onClick={this._changePage}>Insights</a>
							<a className={page === 4 ? 'active' : ''} data-page='4' onClick={this._changePage}>Making</a>
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
