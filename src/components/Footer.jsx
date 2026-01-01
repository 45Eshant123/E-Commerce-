import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import GlobalSelector from '@/components/GlobalSelector';

const Footer = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const footerSections = [
    {
      title: t('footer.customerService'),
      links: [
        { name: t('footer.contactUs'), href: '/customer-service' },
        { name: t('footer.orderTracking'), href: '#' },
        { name: t('footer.helpCenter'), href: '#' },
        { name: t('footer.reportIssue'), href: '#' }
      ]
    },
    {
      title: t('footer.shippingDelivery'),
      links: [
        { name: t('footer.shippingInfo'), href: '/shipping-delivery' },
        { name: t('footer.deliveryOptions'), href: '#' },
        { name: t('footer.shippingCharges'), href: '#' },
        { name: t('footer.estimatedDelivery'), href: '#' },
        { name: t('footer.internationalShipping'), href: '#' }
      ]
    },
    {
      title: t('footer.returnsExchanges'),
      links: [
        { name: t('footer.returnPolicy'), href: '/returns-exchanges' },
        { name: t('footer.howToReturn'), href: '#' },
        { name: t('footer.refundProcess'), href: '#' },
        { name: t('footer.exchangePolicy'), href: '#' }
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { name: t('footer.aboutUs'), href: '/company/about-us' },
        { name: t('footer.careers'), href: '/company/careers' },
        { name: t('footer.pressMedia'), href: '/company/press-media' },
        { name: t('footer.sustainability'), href: '/company/sustainability' }
      ]
    }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ];

  return (
    <footer className="bg-[#232f3e] dark:bg-gray-900 text-white w-full mt-auto transition-colors">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-[#febd69] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-gray-600 mb-8" />

        {/* Lower Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          {/* Brand */}
          <div className="text-xl font-bold text-white">
            ShopHub
          </div>

          {/* Selectors */}
          <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg">
            <GlobalSelector />
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-gray-400">
          <div className="flex gap-4">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-[#febd69] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
          <span>© 2025 ShopHub. {t('footer.allRightsReserved')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
