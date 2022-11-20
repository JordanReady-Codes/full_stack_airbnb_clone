import React from 'react'
import ReactDOM from 'react-dom'
import PropertyBookings from './propertyBookings'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PropertyBookings />,
    document.body.appendChild(document.createElement('div')),
  )
})