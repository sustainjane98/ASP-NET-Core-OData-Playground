const filterVariantsSelectorStorage: Record<
  string,
  Record<string, boolean>
> = {};

export const filterVariantsSelector =
  (baseWord: string) =>
  (currentValue: string): boolean => {
    const matchingBaseWord = baseWord;
    const matchingWords: string[] = ['?', '&'];
    let localCurrentValue = currentValue.replace(
      /https*:\/\/[A-Za-z]*:*\d{1,4}\/?/,
      ''
    );

    const indexOfStartPoint =
      localCurrentValue.indexOf('&') === -1
        ? localCurrentValue.indexOf('?')
        : localCurrentValue.includes('?')
        ? localCurrentValue.indexOf('&')
        : -1;

    if (indexOfStartPoint === -1) return false;

    localCurrentValue = localCurrentValue.slice(indexOfStartPoint);

    if (filterVariantsSelectorStorage?.[baseWord]?.[localCurrentValue]) {
      return filterVariantsSelectorStorage?.[baseWord]?.[localCurrentValue];
    }

    for (let i = 1; i <= matchingBaseWord.length; i++) {
      matchingWords.push('?' + matchingBaseWord.slice(0, i));
      matchingWords.push('&' + matchingBaseWord.slice(0, i));
    }

    const result = matchingWords.includes(localCurrentValue);

    if (!filterVariantsSelectorStorage?.[baseWord]) {
      filterVariantsSelectorStorage[baseWord] = {};
    }

    filterVariantsSelectorStorage[baseWord][localCurrentValue] = result;

    return result;
  };
