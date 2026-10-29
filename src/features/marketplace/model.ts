export type Category = 'Paper' | 'Plastic' | 'Metal' | 'Mixed'
export type Quote = { id: string; dealer: string; amount: number; rating: number }
export type Listing = { id: string; title: string; category: Category; weight: number; area: string; description: string; photo?: string; owner: string; quotes: Quote[]; status: 'Open' | 'Accepted' | 'Completed'; acceptedQuote?: string; sellerRating?: number; buyerRating?: number }
export const categories: Category[] = ['Paper', 'Plastic', 'Metal', 'Mixed']
export const seedListings: Listing[] = [
  { id: 'SC-1024', title: 'A fresh start for old newspapers', category: 'Paper', weight: 12, area: 'Indiranagar', description: 'Dry newspapers and a few magazines, neatly bundled and ready for collection.', owner: 'Household-024', status: 'Open', quotes: [{ id: 'q1', dealer: 'Dealer-018', amount: 220, rating: 4.8 }, { id: 'q2', dealer: 'Dealer-042', amount: 240, rating: 4.6 }] },
  { id: 'SC-1025', title: 'Metal odds, ends & possibilities', category: 'Metal', weight: 8, area: 'Koramangala', description: 'Old steel utensils and metal shelving. No sharp or hazardous materials.', owner: 'Household-025', status: 'Open', quotes: [] },
  { id: 'SC-1026', title: 'Plastics with another life ahead', category: 'Plastic', weight: 5, area: 'HSR Layout', description: 'Clean rigid plastic containers and broken household buckets.', owner: 'Household-026', status: 'Open', quotes: [] },
]
export function addQuote(listing: Listing, amount: number): Listing {
  if (listing.status !== 'Open' || !Number.isFinite(amount) || amount <= 0 || amount > 1000000) throw new Error('Enter a valid quote between ₹1 and ₹10,00,000.')
  if (listing.owner === 'Household-024') throw new Error('You cannot quote on your own listing.')
  if (listing.quotes.some(q => q.dealer === 'Dealer-You')) throw new Error('You have already quoted on this listing.')
  return { ...listing, quotes: [...listing.quotes, { id: crypto.randomUUID(), dealer: 'Dealer-You', amount, rating: 0 }] }
}
export function acceptQuote(listing: Listing, quoteId: string): Listing {
  if (listing.owner !== 'Household-024' || listing.status !== 'Open' || !listing.quotes.some(q => q.id === quoteId)) throw new Error('This offer cannot be accepted.')
  return { ...listing, status: 'Accepted', acceptedQuote: quoteId }
}
