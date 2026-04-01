import { IDefaultCurrencies } from '@/models/config';
import countryCurrency from 'country-to-currency';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);
export const getCurrencyCodeFromCountry = (
  country: string,
  defaultCurrencies?: IDefaultCurrencies
) => {
  const defaultCurrencyOverride = (
    countryCode: string,
    defaultCurrencies: IDefaultCurrencies = {}
  ) => {
    for (const key in defaultCurrencies) {
      const currencies = defaultCurrencies[key as keyof IDefaultCurrencies];
      if (
        currencies
          .map((currency) => currency.toLowerCase())
          .includes(countryCode.toLowerCase())
      ) {
        return key;
      }
    }

    return;
  };

  try {
    // Convert country name to ISO 3166-1 alpha-2 code
    const countryCode = countries.getAlpha2Code(country, 'en');
    const defaultCurrency = defaultCurrencyOverride(
      countryCode ?? '',
      defaultCurrencies
    );
    if (defaultCurrency) return defaultCurrency;

    if (!countryCode) return 'USD';

    // Get currency code from country code
    const currencyCode =
      countryCurrency[countryCode as keyof typeof countryCurrency];

    return currencyCode || 'USD';
  } catch (error) {
    console.error(`Error getting currency for country ${country}:`, error);
    return 'USD';
  }
};
