import React from 'react'
import ReactDOM from 'react-dom'
import EditWidget from './editWidget'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditWidget />,
    document.body.appendChild(document.createElement('div')),
  )
})