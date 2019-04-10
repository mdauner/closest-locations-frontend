import React from 'react'
import { render, fireEvent, waitForElement } from 'react-testing-library'
import ClosestLocations from '../ClosestLocations'

beforeEach(() => {
  fetch.resetMocks()
})

test('Renders ClosestLocations correctly', async () => {
  const { container } = render(<ClosestLocations />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Enables Button when more than two lines are entered in textarea', () => {
  const { getByText, getByPlaceholderText } = render(<ClosestLocations />)
  const textarea = getByPlaceholderText(/enter locations/i)
  const fetchButton = getByText(/get closest locations/i)
  fireEvent.change(textarea, {
    target: { value: 'New York\nSan Francisco' }
  })
  expect(fetchButton).not.toHaveAttribute('disabled')
})

test('Shows error message when less than two locations are valid', async () => {
  fetch.mockResponseOnce('error message')

  const { getByText, getByPlaceholderText } = render(<ClosestLocations />)
  const textarea = getByPlaceholderText(/enter locations/i)
  const fetchButton = getByText(/get closest locations/i)
  fireEvent.change(textarea, {
    target: { value: 'New York\nasdfasdf' }
  })
  fireEvent.click(fetchButton)
  await waitForElement(() => getByText(/error/i))
})

test('Shows location items', async () => {
  fetch.mockResponseOnce(
    JSON.stringify([
      {
        closestLocation: 'Paris',
        distance: 878606,
        location: 'Berlin'
      },
      {
        closestLocation: 'Berlin',
        distance: 878606,
        location: 'Paris'
      },
      {
        closestLocation: 'Paris',
        distance: 5857061,
        location: 'The Statue of Liberty'
      }
    ])
  )

  const { getByText, getByPlaceholderText, getAllByTestId } = render(
    <ClosestLocations />
  )
  const textarea = getByPlaceholderText(/enter locations/i)
  const fetchButton = getByText(/get closest locations/i)
  fireEvent.change(textarea, {
    target: { value: 'New York\nParis\nThe Statue of Liberty' }
  })
  fireEvent.click(fetchButton)
  const locations = await waitForElement(() => getAllByTestId('location-item'))
  expect(locations.length).toEqual(3)
})
