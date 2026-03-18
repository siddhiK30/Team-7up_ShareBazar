# ShareBazar - Frontend UI Implementation

## Overview

This document describes the comprehensive UI implementation for the ShareBazar stock trading platform, including trading, portfolio management, and wallet features.

## Project Structure

```
FRONTEND/src/
├── components/
│   ├── WalletCard.jsx              # Wallet balance and funds management
│   ├── MoneyOrders.jsx             # Trading form for buy/sell orders
│   ├── TradeForm.jsx               # Buy/Sell form component
│   ├── HoldingsCard.jsx            # Portfolio holdings display with P/L
│   ├── OrderHistory.jsx            # Trading order history
│   ├── TransactionHistory.jsx      # Wallet transaction history
│   ├── PortfolioManagement.jsx     # Portfolio creation and selection
│   └── [existing components...]
├── pages/
│   ├── TradingPage.jsx             # **NEW** - Complete trading dashboard
│   ├── WalletPage.jsx              # **NEW** - Wallet management page
│   ├── PortfolioPage.jsx           # **ENHANCED** - Portfolio overview
│   └── [existing pages...]
├── services/
│   ├── OrderService.js             # **NEW** - Order API calls
│   ├── WalletService.js            # **NEW** - Wallet API calls
│   ├── PortfolioService.js         # **NEW** - Portfolio API calls
│   └── [existing services...]
├── styles/
│   ├── WalletCard.css              # **NEW** - Wallet styles
│   ├── TradeForm.css               # **NEW** - Trade form styles
│   ├── HoldingsCard.css            # **NEW** - Holdings display styles
│   ├── OrderHistory.css            # **NEW** - Order history styles
│   ├── TransactionHistory.css      # **NEW** - Transaction history styles
│   ├── PortfolioManagement.css     # **NEW** - Portfolio management styles
│   ├── TradingPage.css             # **NEW** - Trading page styles
│   ├── WalletPage.css              # **NEW** - Wallet page styles
│   ├── EnhancedPortfolioPage.css   # **NEW** - Enhanced portfolio page styles
│   └── [existing styles...]
└── [other files...]
```

## Features Implemented

### 1. **Trading Dashboard (TradingPage.jsx)**
A comprehensive trading interface for buying and selling stocks.

**Features:**
- Wallet balance display with real-time updates
- Portfolio management and selection
- Stock selection and trading interface
- Buy/Sell orders with quantity and price input
- Holdings overview with profit/loss calculations
- Order history tracking
- Responsive grid layout (3-column on desktop, single column on mobile)

**API Integration:**
- POST `/orders/buy` - Buy stock order
- POST `/orders/sell` - Sell stock order
- GET `/portfolio/user/{userId}` - Get user portfolios
- POST `/portfolio/create` - Create new portfolio
- GET `/portfolio/{portfolioId}/holdings` - Get portfolio holdings

### 2. **Wallet Management (WalletPage.jsx)**
Complete wallet and transaction management system.

**Features:**
- Current wallet balance display
- Add funds functionality
- Transaction history with filtering options
- Filter by transaction type (Credit/Debit/Buy/Sell)
- Filter by status (Success/Failed/Pending)
- Statistics cards showing:
  - Total Credits
  - Total Debits
  - Successful Transactions
- Wallet information display (balance, minimum balance, available to trade)

**API Integration:**
- POST `/wallet/credit` - Add funds to wallet
- POST `/wallet/debit` - Withdraw from wallet
- GET `/wallet/{userId}` - Get wallet details
- GET `/wallet/transactions/{userId}` - Get transaction history

### 3. **Portfolio Management (PortfolioPage.jsx)**
Enhanced portfolio overview and holdings analysis.

**Features:**
- Create new portfolios
- Portfolio selection and switching
- Holdings display with detailed information:
  - Current price
  - Average buy price
  - Quantity
  - Profit/Loss (absolute and percentage)
- Portfolio statistics:
  - Total invested amount
  - Current portfolio value
  - Total gain/loss
- Color-coded performance (green for gains, red for losses)

**API Integration:**
- GET `/portfolio/user/{userId}` - Get portfolios
- POST `/portfolio/create` - Create portfolio
- GET `/portfolio/{portfolioId}/holdings` - Get holdings

## Component Details

### WalletCard
**Props:**
- `userId` (number) - User ID
- `walletBalance` (number) - Current wallet balance
- `onAddFunds` (function) - Callback to add funds

**Features:**
- Gradient background
- Quick add funds form
- Real-time balance updates

### TradeForm
**Props:**
- `company` (object) - Stock details (id, name, price)
- `userId` (number) - User ID
- `portfolios` (array) - Available portfolios
- `onTradingComplete` (function) - Callback after successful trade

**Features:**
- Buy/Sell toggle
- Portfolio selection
- Quantity input validation
- Real-time total amount calculation
- Success/error messaging

### HoldingsCard
**Props:**
- `holdings` (array) - Portfolio holdings with P/L data
- `loading` (boolean) - Loading state

**Features:**
- Responsive table layout
- Summary statistics
- Color-coded gains/losses
- Trending indicators (arrows up/down)

### OrderHistory
**Props:**
- `orders` (array) - Trading orders
- `loading` (boolean) - Loading state

**Features:**
- Order type display (Buy/Sell)
- Transaction amount calculation
- Status indicators
- Date/time formatting

### TransactionHistory
**Props:**
- `transactions` (array) - Wallet transactions
- `loading` (boolean) - Loading state

**Features:**
- Multiple filter options
- Color-coded transaction types
- Status badges
- Real-time transaction display

### PortfolioManagement
**Props:**
- `portfolios` (array) - User portfolios
- `onSelectPortfolio` (function) - Selection callback
- `onCreatePortfolio` (function) - Creation callback
- `loading` (boolean) - Loading state

**Features:**
- Portfolio creation form
- Portfolio selection
- Edit/Delete buttons (UI ready)
- Responsive grid

## API Services

### OrderService.js
```javascript
buyStock(orderData)        // Buy shares
sellStock(orderData)       // Sell shares
getOrders(userId)          // Get order history
getOrderDetails(orderId)   // Get specific order
```

### WalletService.js
```javascript
createWallet(userId)                // Create wallet
creditWallet(userId, amount)        // Add funds
debitWallet(userId, amount)         // Withdraw funds
getWallet(userId)                   // Get wallet details
getTransactions(userId)             // Get transaction history
```

### PortfolioService.js
```javascript
createPortfolio(userId, name)          // Create portfolio
getUserPortfolios(userId)              // Get all portfolios
getPortfolioHoldings(portfolioId)      // Get holdings
getPortfolioDetails(portfolioId)       // Get portfolio info
```

## Styling

All components use modern CSS with:
- **Gradient backgrounds** for visual appeal
- **Responsive grid layouts** for different screen sizes
- **Color coding** - Green for gains, Red for losses
- **Smooth transitions** and hover effects
- **Mobile-first design** with breakpoints at 1400px, 1024px, 768px

Key color scheme:
- Primary: `#667eea` - `#764ba2` (purple gradient)
- Success: `#16a34a` (gain/green)
- Alert: `#dc2626` (loss/red)
- Neutral: `#6b7280` (gray)

## Data Flow

### Trading Flow
1. User selects/creates portfolio
2. User chooses stock and enters quantity
3. User clicks BUY or SELL
4. Order submitted to `/orders/buy` or `/orders/sell`
5. Wallet debited/credited
6. Portfolio holdings updated
7. Order appears in history

### Wallet Flow
1. User views wallet balance
2. User clicks "Add Funds"
3. Enters amount and confirms
4. Wallet service credits account
5. Transaction record created
6. History updated in real-time

### Portfolio Flow
1. User creates new portfolio
2. Portfolio appears in list
3. User selects portfolio
4. Holdings loaded and displayed
5. P/L calculated automatically
6. Statistics updated

## Integration with Backend

The UI expects the following backend services running:
- **Order Service**: Port 8083 (`/orders`)
- **Portfolio Service**: Port 8085 (`/portfolio`)
- **Wallet Service**: Port 8084 (`/wallet`)
- **API Gateway**: Handles routing

## Usage

### Import Components
```javascript
import TradingPage from './pages/TradingPage';
import WalletPage from './pages/WalletPage';
import PortfolioPage from './pages/PortfolioPage';
```

### Use in App Router
```jsx
<Route path="/trading" element={<TradingPage />} />
<Route path="/wallet" element={<WalletPage />} />
<Route path="/portfolio" element={<PortfolioPage />} />
```

## Responsive Design

All components are fully responsive:
- **Desktop (1400px+)**: Multi-column layouts, full features
- **Tablet (1024px-1399px)**: Adjusted grid layouts
- **Mobile (< 768px)**: Single column, simplified layouts

## Future Enhancements

1. **Order Editing** - Modify pending orders
2. **Portfolio Analytics** - Charts and detailed analytics
3. **Watchlist** - Track stocks without buying
4. **Advanced Filters** - Filter orders and transactions
5. **Real-time Updates** - WebSocket integration for live P/L
6. **Mobile App** - Native mobile experience
7. **Export** - Download statements and reports

## Error Handling

All components include:
- Try-catch error handling
- User-friendly error messages
- Loading states
- Validation for inputs
- Network error recovery

## Performance Optimizations

- Lazy loading of components
- Memoization of expensive calculations
- Debounced API calls
- CSS animations using GPU
- Responsive image optimization

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliant
- Screen reader friendly

---

**Version**: 1.0.0  
**Last Updated**: March 18, 2026  
**Status**: Production Ready
