import { TranslationKeysIndexUnion } from './translation-keys-index.enum';
import { NamespacesUnion } from './namespaces.enum';
import { TranslationKeysOdataCommonUnion } from './translation-keys-odata-common.enum';
import { TranslationKeysCommonUnion } from './translation-keys-common.enum';

export type TranslationKeysUnion<NS extends NamespacesUnion = NamespacesUnion> =
  NS extends 'index'
    ? TranslationKeysIndexUnion
    : NS extends 'odata-common'
    ? TranslationKeysOdataCommonUnion
    : NS extends 'common'
    ? TranslationKeysCommonUnion
    : never;
