import { useTranslation as useTranslationI18n } from 'react-i18next';
import { TranslationKeysUnion } from './enums/translation-keys/translation-keys.enum';

type UseTranslationI18nType = typeof useTranslationI18n;

type NSType = Parameters<UseTranslationI18nType>[0];
type OptionsType = Parameters<UseTranslationI18nType>[1];
type UseTranslationI18nReturnType = Omit<
  ReturnType<UseTranslationI18nType>,
  't'
> & { t: (key: TranslationKeysUnion) => string };

export const useTranslation = (
  ns: NSType,
  options?: OptionsType
): UseTranslationI18nReturnType => useTranslationI18n(ns, options);
