# E-Commerce Admin Dashboard - Operations Guide

## Overview
This guide provides step-by-step instructions for administrators to manage the e-commerce platform using the Role-Based Access Control (RBAC) system.

## Prerequisites
- Admin account with role: `admin`
- Access to admin dashboard at `/admin/dashboard`
- Backend API running on port 5000
- Frontend running on port 3000

## Admin Login Process

### Step 1: Access Admin Login
1. Navigate to `http://localhost:3000/admin/login`
2. Enter admin credentials:
   - **Email**: `admin@test.com`
   - **Password**: `admin123`

### Step 2: Authentication
- Click "Sign In" button
- System validates credentials and user role
- Redirects to admin dashboard if successful
- Displays error if credentials are invalid or user lacks admin role

## Dashboard Navigation

### Main Tabs
- **Overview**: Dashboard statistics and charts
- **Products**: Product management (CRUD operations)
- **Orders**: Order management and status updates
- **Customers**: Customer management (placeholder)
- **Analytics**: Advanced analytics (placeholder)

## Product Management Operations

### Adding a New Product

1. **Navigate to Products Tab**
   - Click "Products" tab in the navigation

2. **Open Add Product Form**
   - Click the "Add Product" button (green + icon)

3. **Fill Product Details**
   - **Product Name**: Enter descriptive name (required)
   - **Price**: Enter numeric price (required, e.g., 99.99)
   - **Category**: Enter category (required, e.g., Electronics, Fashion)
   - **Image URL**: Enter full image URL (required)
   - **Description**: Enter detailed product description (required)

4. **Save Product**
   - Click "Add Product" button
   - Form validates all required fields
   - Success: Product appears in list, toast notification shows
   - Error: Validation messages display, product not saved

### Editing an Existing Product

1. **Locate Product**
   - Scroll through products table or use search if implemented

2. **Open Edit Form**
   - Click the edit icon (pencil) in the Actions column

3. **Modify Details**
   - Update any fields as needed
   - All fields are editable

4. **Save Changes**
   - Click "Update Product" button
   - Success: Product list refreshes with changes
   - Error: Error message displays, changes not saved

### Deleting a Product

1. **Locate Product**
   - Find product in the products table

2. **Initiate Deletion**
   - Click the delete icon (trash) in the Actions column

3. **Confirm Deletion**
   - System shows confirmation dialog (if implemented)
   - Click "Delete" to confirm

4. **Deletion Result**
   - Success: Product removed from list
   - Error: Error message displays, product remains

## Order Management Operations

### Viewing All Orders

1. **Navigate to Orders Tab**
   - Click "Orders" tab in the navigation

2. **View Order List**
   - Orders display in table format with columns:
     - Order ID
     - Customer Name
     - Total Amount
     - Status (color-coded badges)
     - Date Created
     - Status Update Dropdown

### Searching Orders

1. **Use Search Bar**
   - Enter order ID in the search input field
   - Click search icon or press Enter

2. **View Filtered Results**
   - Only matching orders display
   - Clear search to show all orders

### Updating Order Status

1. **Locate Order**
   - Find order in the orders table

2. **Open Status Dropdown**
   - Click the status dropdown in the Actions column

3. **Select New Status**
   - Choose from available statuses:
     - `pending`: Initial order state
     - `processing`: Order being prepared
     - `shipped`: Order dispatched
     - `delivered`: Order completed
     - `cancelled`: Order cancelled

4. **Confirm Status Change**
   - Dropdown automatically saves selection
   - Success: Status badge updates with new color
   - Error: Error message displays, status unchanged

### Order Status Color Coding

- **Pending**: Yellow badge (awaiting processing)
- **Processing**: Blue badge (being prepared)
- **Shipped**: Purple badge (in transit)
- **Delivered**: Green badge (completed)
- **Cancelled**: Gray badge (terminated)

## Security and Access Control

### RBAC Protection

**Frontend Protection:**
- Admin dashboard checks `user.role === 'admin'`
- Non-admin users redirected to login page
- Admin-only features hidden from regular users

**Backend Protection:**
- All admin routes require authentication + authorization
- JWT tokens validated for user role
- Unauthorized requests return `403 Forbidden`

### Session Management

**Automatic Logout:**
- Invalid tokens redirect to login
- Expired sessions require re-authentication

**Manual Logout:**
- Click "Logout" button in dashboard header
- Clears authentication state
- Redirects to home page

## Error Handling

### Common Error Scenarios

**Authentication Errors:**
- Invalid credentials: "Login Failed" message
- Expired token: Redirect to login page
- Insufficient permissions: "403 Forbidden" response

**API Errors:**
- Network issues: "Failed to connect" messages
- Server errors: "Internal server error" notifications
- Validation errors: Field-specific error messages

### Troubleshooting

**Dashboard Not Loading:**
1. Verify admin login status
2. Check network connectivity
3. Confirm backend server is running (port 5000)

**Operations Failing:**
1. Verify admin permissions
2. Check form validation errors
3. Confirm backend API responses
4. Check browser console for errors

## API Endpoints Reference

### Product Management
- `GET /api/products` - List all products
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Order Management
- `GET /api/orders` - List all orders (admin only)
- `PATCH /api/orders/:orderId/status` - Update order status (admin only)

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get user profile (includes role)

## Best Practices

### Product Management
- Use descriptive, SEO-friendly product names
- Include high-quality product images
- Categorize products consistently
- Keep descriptions clear and detailed
- Regularly update pricing and availability

### Order Management
- Process orders in logical sequence (pending → processing → shipped → delivered)
- Update statuses promptly to keep customers informed
- Use search functionality for large order volumes
- Monitor cancelled orders for patterns

### Security
- Never share admin credentials
- Log out when session complete
- Report suspicious activity
- Keep software updated

## Support

For technical issues or questions:
1. Check this documentation first
2. Review browser console for errors
3. Verify backend server logs
4. Contact development team with specific error details

---

**Last Updated**: Current Implementation
**Version**: RBAC v1.0
**Admin Email**: admin@test.com
**Admin Password**: admin123 (for testing only)
