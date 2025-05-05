
/**
 * Utility to detect if the application is running within the Lovable editor environment
 */
export const isLovableEnvironment = (): boolean => {
  // Check for Lovable-specific URL patterns or domains
  const isLovableDomain = window.location.hostname.includes('lovableproject.com');
  const hasLovableParam = new URLSearchParams(window.location.search).has('lovableEditor');
  
  // Check for any Lovable-specific elements in the DOM
  const hasLovableEditorElement = document.querySelector('#lovable-editor') !== null;
  
  // For debugging
  console.log('Environment detection:', {
    hostname: window.location.hostname,
    isLovableDomain,
    hasLovableParam,
    hasLovableEditorElement,
    result: isLovableDomain || hasLovableParam || hasLovableEditorElement
  });
  
  // Return true if any of the conditions match
  return isLovableDomain || hasLovableParam || hasLovableEditorElement;
};
