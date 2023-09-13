import { render, screen } from '@testing-library/react'
import TestPage from '@/app/test/page'

describe('TestPage', () => {
  it('renders without errors', async () => {
    render(<TestPage />)
    expect(await screen.findByText('TestPage')).toBeVisible()
  })
})
