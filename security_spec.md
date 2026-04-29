# Security Specification - Tejas Mobile Hub

## 1. Data Invariants
- A **Product** must have a unique ID, name, price, and category.
- An **Order** must have a unique ID, a valid customer (name, mobile), and at least one product item.
- An **Order** date must be the server time of creation.
- A **User** profile is identified by their unique authentication ID.

## 2. The Dirty Dozen Payloads
1. **The Ghost Product**: Create a product with a hidden `discount: 99` field.
2. **The Price Slasher**: Update a product's price from $100 to $1.
3. **The ID Hijacker**: Create an order with an ID that already exists.
4. **The Spoofed Customer**: Create an order as one user but with another user's mobile number.
5. **The Status Jump**: Update an order status from 'Pending' directly to 'Refunded' without admin approval.
6. **The Shadow Admin**: Create a document in a restricted collection as a non-admin.
7. **The Jumbo ID**: Use a 2MB string as a product ID to crash listeners.
8. **The Orphan Order**: Create an order with product IDs that don't exist in the database.
9. **The Zero-Dollar Order**: Create an order with `total: 0`.
10. **The PII Leak**: List all user profiles without filtering for the current user.
11. **The Future Order**: Set the `date` of an order to 2099.
12. **The Self-Assigned Admin**: Create a user profile with `role: 'admin'`.

## 3. Test Runner (Conceptual)
Tests will verify that:
- Non-admins cannot write to `/products`.
- Users can only read their own data in `/users` and `/orders`.
- Orders cannot be created without required fields.
- Admin (niteshk142udhd@gmail.com) has full access.
