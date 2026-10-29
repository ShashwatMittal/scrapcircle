// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import App from './App'
HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', '') }
HTMLDialogElement.prototype.close = function () { this.removeAttribute('open') }
afterEach(cleanup)
describe('marketplace demo', () => {
  it('filters listings by material and search', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', {name:/^Metal$/}))
    expect(screen.getByText('Metal odds, ends & possibilities')).toBeInTheDocument()
    expect(screen.queryByText('A fresh start for old newspapers')).not.toBeInTheDocument()
    await user.type(screen.getByLabelText('Search listings'), 'no match')
    expect(screen.getByText(/No listings here yet/)).toBeInTheDocument()
  })
  it('lets a household select an offer, complete collection and rate', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', {name:'View A fresh start for old newspapers'}))
    await user.click(screen.getAllByRole('button', {name:'Accept offer'})[0])
    await user.click(screen.getByRole('button', {name:'Confirm collection (demo)'}))
    await user.selectOptions(screen.getByLabelText('Rate your experience'), '5')
    expect(screen.getByLabelText('Rate your experience')).toHaveValue('5')
    expect(screen.queryByRole('button', {name:'Accept offer'})).not.toBeInTheDocument()
  })
  it('allows a dealer to quote once on another household listing', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.selectOptions(screen.getByLabelText('Your role'), 'buyer')
    await user.click(screen.getByRole('button', {name:'View Metal odds, ends & possibilities'}))
    await user.type(screen.getByLabelText('Total offer (₹)'), '350')
    await user.click(screen.getByRole('button', {name:'Send anonymous quote'}))
    expect(screen.getByRole('button', {name:'Send anonymous quote'})).toBeDisabled()
  })
  it('creates a listing with a valid photo', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', {name:/Create a listing/}))
    await user.type(screen.getByLabelText('Listing title'), 'Kitchen containers')
    await user.type(screen.getByLabelText('Estimated weight (kg)'), '3')
    await user.type(screen.getByLabelText('Neighbourhood'), 'HSR Layout')
    await user.type(screen.getByLabelText('Item details'), 'Clean old household containers')
    await user.upload(screen.getByLabelText(/Item photo/), new File(['sample'], 'items.png', {type:'image/png'}))
    await screen.findByAltText('Selected items')
    await user.click(screen.getByRole('button', {name:'Publish listing →'}))
    expect(screen.getByRole('button', {name:'Kitchen containers'})).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('requires a photo before creating a listing', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', {name:/Create a listing/}))
    await user.type(screen.getByLabelText('Listing title'), 'Old newspapers')
    await user.type(screen.getByLabelText('Estimated weight (kg)'), '10')
    await user.type(screen.getByLabelText('Neighbourhood'), 'Indiranagar')
    await user.type(screen.getByLabelText('Item details'), 'Dry bundled newspapers')
    await user.click(screen.getByRole('button', {name:'Publish listing →'}))
    expect(screen.getByRole('alert')).toHaveTextContent('Please add a photo')
  })
})
