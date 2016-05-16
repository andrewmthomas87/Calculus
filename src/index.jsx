import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import EquationInput from './components/EquationInput'

ReactDOM.render(<EquationInput />, document.querySelector('section#content'))
