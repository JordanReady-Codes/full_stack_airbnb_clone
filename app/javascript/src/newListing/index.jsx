import React from 'react'
import ReactDOM from 'react-dom'
import CreateWidget from './createWidget'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CreateWidget />,
    document.body.appendChild(document.createElement('div')),
  )
})





