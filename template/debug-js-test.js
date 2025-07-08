// Test script to debug regex patterns
const testJS = `
querySelector('.card__header')
querySelectorAll('.btn')
classList.add('active')
`;

const prefixClass = (className) => {
  const ignoreClasses = ['swiper'];
  if (className.startsWith('ast-')) return className;
  if (ignoreClasses.includes(className)) return className;
  return `ast-${className}`;
};

console.log('Original JS:');
console.log(testJS);

// Test the regex patterns
let result = testJS;

// Process querySelector and querySelectorAll calls
result = result.replace(/(querySelector(?:All)?)\(['"`]([^'"`]*)/g, (match, method, selectorString) => {
  console.log('Regex match:', { match, method, selectorString });
  
  // Process each class selector in the string
  const processedSelector = selectorString.replace(/\.([a-zA-Z][a-zA-Z0-9_-]*(?:__[a-zA-Z0-9_-]+)*(?:--[a-zA-Z0-9_-]+)*)/g, (classMatch, className) => {
    console.log('Class match:', { classMatch, className });
    const prefixedClassName = prefixClass(className);
    console.log('Prefixed:', prefixedClassName);
    return `.${prefixedClassName}`;
  });
  
  const newMatch = `${method}('${processedSelector}`;
  console.log('Result:', newMatch);
  return newMatch;
});

console.log('\nProcessed JS:');
console.log(result);
