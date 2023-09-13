import { render, screen } from '@testing-library/react'
import MainNav from '@/components/MainNav'

// Mock useParams and usePathname
jest.mock('next/navigation', () => ({
  useParams: () => ({ storeId: 'exampleStoreId' }),
  usePathname: () => '/exampleStoreId',
}))

describe('MainNav', () => {
  it('renders the MainNav component with links', () => {
    render(<MainNav />)

    // Check if "Overview" link is rendered and active
    const overviewLink = screen.getByText('Overview')
    expect(overviewLink).toBeInTheDocument()
    expect(overviewLink).toHaveClass('text-black dark:text-white')

    // Check if "Settings" link is rendered but not active
    const settingsLink = screen.getByText('Settings')
    expect(settingsLink).toBeInTheDocument()
    expect(settingsLink).toHaveClass('text-muted-foreground')
  })
})
