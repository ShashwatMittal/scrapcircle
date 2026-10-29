import { describe, expect, it } from 'vitest'
import { acceptQuote, addQuote, seedListings } from './model'
describe('marketplace rules', () => {
  it('accepts a valid quote without mutating the original listing', () => {
    const result = addQuote(seedListings[1], 300)
    expect(result.quotes[0].amount).toBe(300)
    expect(seedListings[1].quotes).toHaveLength(0)
  })
  it.each([0, -1, NaN, Infinity, 1000001])('rejects invalid quote %s', amount => {
    expect(() => addQuote(seedListings[1], amount)).toThrow()
  })
  it('rejects self-bidding, duplicate quotes and closed listings', () => {
    expect(() => addQuote(seedListings[0], 100)).toThrow()
    expect(() => addQuote(addQuote(seedListings[1], 100), 200)).toThrow()
    expect(() => addQuote({...seedListings[1], status:'Completed'}, 100)).toThrow()
  })
  it('accepts only existing offers on an open listing belonging to the seller', () => {
    expect(acceptQuote(seedListings[0], 'q1')).toMatchObject({status:'Accepted', acceptedQuote:'q1'})
    expect(() => acceptQuote(seedListings[0], 'missing')).toThrow()
    expect(() => acceptQuote({...seedListings[0], status:'Accepted'}, 'q1')).toThrow()
    expect(() => acceptQuote(seedListings[1], 'q1')).toThrow()
  })
})
