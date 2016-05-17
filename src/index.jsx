import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import RiemannSumCalculator from './components/RiemannSumCalculator'

ReactDOM.render(<RiemannSumCalculator />, document.querySelector('section#content'))
