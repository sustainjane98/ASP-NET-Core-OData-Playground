import { TranslationKeysIndexUnion } from './translation-keys-index.enum';
import { NamespacesUnion } from './namespaces.enum';

export type TranslationKeysUnion<NS extends NamespacesUnion = NamespacesUnion> =
  NS extends 'index' ? TranslationKeysIndexUnion : never;
