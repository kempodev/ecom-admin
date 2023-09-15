import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import StoreSwitcher from '@/components/StoreSwitcher'

// Mock the necessary dependencies
jest.mock('next/navigation', () => ({
  useParams: () => ({ storeId: '1' }),
  useRouter: () => ({
    push: jest.fn(), // Mock the router's push function
  }),
}))

describe('StoreSwitcher', () => {
  it('renders the StoreSwitcher component with a store name', () => {
    const items = [
      {
        id: '1',
        name: 'Store 1',
        userId: 'abc',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-02-01'),
      },
      {
        id: '2',
        name: 'Store 2',
        userId: 'abc',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-02-01'),
      },
    ]
    render(<StoreSwitcher items={items} />)
    const button = screen.getByRole('combobox', { name: 'Select a store' })
    expect(button).toBeInTheDocument()
  })

  it('opens the popover when the button is clicked', () => {
    const items = [
      {
        id: '1',
        name: 'Store 1',
        userId: 'abc',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-02-01'),
      },
      {
        id: '2',
        name: 'Store 2',
        userId: 'abc',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-02-01'),
      },
    ]
    render(<StoreSwitcher items={items} />)

    // Check if the popover is initially closed
    const popoverContent = screen.queryByText('Stores')
    expect(popoverContent).not.toBeInTheDocument()

    // Click the button to open the popover
    const button = screen.getByRole('combobox')
    fireEvent.click(button)

    // Check if the popover is now open
    expect(screen.getByText('Stores')).toBeInTheDocument()
  })
})
