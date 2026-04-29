# ZippyBooks Security Specification

## Data Invariants
- A user can only access their own orders and payments.
- Only admins can create/update/delete books.
- An order must have a valid status flow (pending -> success/failed).
- Download access is only granted if a verified payment exists for that book.

## Identity, Integrity, and State Payloads (Dirty Dozen)
1. **Anonymous Book Deletion**: Attempt to delete a book without authentication. (Expected: DENIED)
2. **Standard User Book Creation**: Attempt to create a book as a 'user' role. (Expected: DENIED)
3. **Identity Spoofing**: Attempt to create an order for another user's ID. (Expected: DENIED)
4. **Order Status Injection**: Attempt to create an order with status 'success' immediately. (Expected: DENIED)
5. **Price Manipulation**: Attempt to update a book's price during checkout. (Expected: DENIED)
6. **Payment Proof Faking**: Attempt to create a payment doc without a server-side verified signature. (Expected: DENIED)
7. **Cart Pollution**: Attempt to add 10,000 items to a single user's cart. (Expected: DENIED via size limits)
8. **Shadow Field Injection**: Adding `isVerified: true` to a user profile at creation. (Expected: DENIED via strict keys)
9. **Role Escalation**: Updating user role from 'user' to 'admin' via client SDK. (Expected: DENIED)
10. **Book Field Poisoning**: Inserting 1MB of garbage text into book description. (Expected: DENIED via size limits)
11. **Orphaned Payment**: Creating a payment for a non-existent order. (Expected: DENIED via relational check)
12. **Status Skip**: Updating order from 'failed' back to 'pending'. (Expected: DENIED via terminal state locking)

## Security Architecture
- **Master Gate**: All writes are validated via `isValid[Entity]` helpers.
- **Admin Lock**: Admin collection determines privileged access.
- **Verification Requirement**: All writes require `email_verified == true`.
