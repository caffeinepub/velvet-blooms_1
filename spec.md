# Velvet Blooms

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Public storefront with hero section, product catalog grid, how-to-order section, Instagram follow section, and footer
- 10 products with names, prices in INR, descriptions, and customization badge on each product
- WhatsApp ordering buttons per product that pre-fill a message with the product name
- Instagram follow link to @Velvet.blooms__
- CMS admin panel (login-protected) for:
  - Managing products: add/edit/remove name, price, description, photo
  - Managing "New Arrivals" announcements: title, short text, optional photo
- Authorization with two admin accounts: jasmeet.gill147147@gmail.com and lalasinghh1313@gmail.com
- Blob storage for product photos and announcement photos (uploaded via CMS from phone)
- Product photos start empty (placeholder shown); admins add them via CMS later

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend
- Authorization module with two pre-authorized Google accounts
- Products data store: id, name, price (Nat), description, imageId (optional blob), isActive
- Seed 10 products with names, prices, descriptions at deploy time
- NewArrivals data store: id, title, body, imageId (optional blob), createdAt
- CRUD endpoints for products and new arrivals (admin only)
- Public read endpoints for products and new arrivals

### Frontend – Public Storefront
- Hero section: brand name, tagline, generated hero image, CTA button to product grid
- Product grid: 1-2 column mobile layout, product card with image (or placeholder), name, price, description, customization badge, "Order via WhatsApp" button (pre-filled message), secondary "Order via Instagram" link
- How To Order section: 4-step numbered process
- New Arrivals section: shows published announcements from CMS
- Instagram section: decorative, "Follow us on Instagram" link to @Velvet.blooms__
- Footer: brand name, WhatsApp contact, Instagram link

### Frontend – CMS Admin Panel
- Login via Google (authorization component)
- Products management: list all products, edit price/description/photo, toggle active, add new product
- New Arrivals management: create/edit/delete announcements with optional photo upload
- Photo upload via blob storage component
