// Helper function to get translated text
export const getText = (textObj, language = 'en') => {
  if (typeof textObj === 'string') {
    return textObj;
  }
  if (typeof textObj === 'object' && textObj !== null) {
    return textObj[language] || textObj.en || '';
  }
  return '';
};

// Helper to translate array of items
export const getTextArray = (array, language = 'en') => {
  if (!Array.isArray(array)) return [];
  return array.map(item => getText(item, language));
};
