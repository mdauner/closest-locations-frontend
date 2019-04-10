import React from 'react'
import { render } from 'react-testing-library'
import LocationItem from '../LocationItem'

test('Renders LocationItem correctly', () => {
  const { container } = render(
    <LocationItem
      location="Berlin"
      distance={123456}
      closestLocation="Hamburg"
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})
