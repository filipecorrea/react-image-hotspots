import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from '@testing-library/react'
import { isDOMComponent } from 'react-dom/test-utils'
import ImageHotspots from './ImageHotspots'

describe('ImageHotspots', () => {
  let container
  let root

  beforeEach(() => {
    container = document.createElement('div')
    root = createRoot(container)
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  it('shows loading', () => {
    act(() => {
      root.render(<ImageHotspots />)
    })
    const image = container.querySelector('img')
    expect(isDOMComponent(image)).toBe(false)
  })
})
