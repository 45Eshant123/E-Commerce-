import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '@/context/LocalizationContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, DollarSign, MapPin } from 'lucide-react';

const GlobalSelector = () => {
  const { t } = useTranslation();
  const { language, currency, country, changeLanguage, changeCurrency, changeCountry } = useLocalization();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  ];

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  ];

  return (
    <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <Select value={language} onValueChange={changeLanguage}>
          <SelectTrigger className="w-32 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <Select value={currency} onValueChange={changeCurrency}>
          <SelectTrigger className="w-24 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((curr) => (
              <SelectItem key={curr.code} value={curr.code}>
                <span className="flex items-center gap-2">
                  <span>{curr.symbol}</span>
                  <span>{curr.code}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <Select value={country} onValueChange={changeCountry}>
          <SelectTrigger className="w-32 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((ctry) => (
              <SelectItem key={ctry.code} value={ctry.code}>
                <span className="flex items-center gap-2">
                  <span>{ctry.flag}</span>
                  <span>{ctry.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GlobalSelector;
