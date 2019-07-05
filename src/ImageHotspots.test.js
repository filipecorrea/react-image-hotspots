import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import ImageHotspots from './ImageHotspots'

describe('ImageHotspots', () => {
  describe('when loading products', () => {
    let container

    beforeEach(() => {
      container = document.createElement('div')
      document.body.appendChild(container)
    })

    afterEach(() => {
      document.body.removeChild(container)
      container = null
    })

    it('shows loading', () => {
      act(() => {
        ReactDOM.render(<ImageHotspots />, container)
      })
      const label = container.querySelector('p')
      expect(label.textContent).toBe('ImageHotspots')
    })
  })
})
