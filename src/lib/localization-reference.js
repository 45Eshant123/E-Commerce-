// ==========================================
// LOCALIZATION QUICK REFERENCE
// ==========================================

// 1. HOW TO USE TRANSLATIONS IN ANY COMPONENT
// ==========================================
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <button>{t('common.addToCart')}</button>
    </div>
  );
}

// 2. HOW TO FORMAT PRICES WITH CURRENCY
// ==========================================
import { useLocalization } from '@/context/LocalizationContext';
import { formatPrice } from '@/lib/currency';

function ProductPrice({ price }) {
const { currency } = useLocalization();
  return <span>{formatPrice(price, currency)}</span>;
}

import { useLocalization } from '@/context/LocalizationContext';

function MyComponent() {
  const { language, currency, country } = useLocalization();
  console.log(language);
  console.log(currency);
  console.log(country);
}

import { useLocalization } from '@/context/LocalizationContext';

function LanguageSwitcher() {
  const { changeLanguage, changeCurrency, changeCountry } = useLocalization();
  
  return (
    <div>
    <button onClick={() => changeLanguage('hi')}>हिंदी</button>
    <button onClick={() => changeCurrency('EUR')}>€ Euro</button>
    <button onClick={() => changeCountry('IN')}>India</button>
    </div>
  );
}

{
  "nav": {
    "home": "Home",
    "cart": "Cart"
  },
  "common": {
    "addToCart": "Add to Cart",
    "search": "Search"
  },
  "home": {
    "title": "Welcome to ShopHub"
  }
}

t('nav.home')              // "Home"
t('nav.cart')              // "Cart"
t('nav.wishlist')          // "Wishlist"
t('nav.profile')           // "Profile"
t('common.search')         // "Search"
t('common.addToCart')      // "Add to Cart"
t('common.buyNow')         // "Buy Now"
t('common.loading')        // "Loading..."
t('common.save')           // "Save"
t('common.cancel')         // "Cancel"
t('footer.customerService') // "Customer Service"
t('footer.contactUs')      // "Contact Us"

{
  "mySection": {
    "myKey": "My English Text"
  }
}

{
  "mySection": {
    "myKey": "मेरा हिंदी टेक्स्ट"
  }
}

{
  "mySection": {
    "myKey": "Mi Texto en Español"
  }
}

const { t } = useTranslation();
<p>{t('mySection.myKey')}</p>

import { formatPrice, getCurrencySymbol, convertCurrency } from '@/lib/currency';

formatPrice(99.99, 'USD')           // "$99.99"
formatPrice(99.99, 'EUR')           // "€91.91"
formatPrice(99.99, 'INR')           // "₹8,299.88"

getCurrencySymbol('USD')            // "$"
getCurrencySymbol('EUR')            // "€"
getCurrencySymbol('INR')            // "₹"

convertCurrency(100, 'USD', 'EUR')  // 92 (example)

import GlobalSelector from '@/components/GlobalSelector';

function MyHeader() {
  return (
    <header>
      <GlobalSelector />
    </header>
  );
}

{
  "product": {
    "title": "{{productName}} - ShopHub"
  }
}

t('product.title', { productName: 'iPhone 15' })

