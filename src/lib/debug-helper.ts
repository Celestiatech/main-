/**
 * CSS Debug Helper
 * 
 * Use this utility to enable/disable CSS debugging modes during development
 * 
 * Usage in browser console:
 * - debugCSS.enable() - Enable full debug mode with outlines on all elements
 * - debugCSS.disable() - Disable debug mode
 * - debugCSS.enable('grid') - Enable specific debug mode
 * - debugCSS.addClass(element, 'debug-border') - Add debug class to element
 */

declare global {
  interface Window {
    debugCSS?: {
      enable: (mode?: DebugMode) => void;
      disable: () => void;
      addClass: (element: HTMLElement, debugClass: string) => void;
      removeClass: (element: HTMLElement, debugClass: string) => void;
      toggleClass: (element: HTMLElement, debugClass: string) => void;
      logLayout: (element: HTMLElement | null) => void;
      watch: (element: HTMLElement | null) => MutationObserver | undefined;
      modes: typeof CSS_DEBUG_MODES;
    };
  }
}

export const CSS_DEBUG_MODES = {
  OUTLINE_ALL: 'outline-all',
  BORDERS: 'border',
  FLEX: 'flex',
  GRID: 'grid',
  SPACING: 'spacing',
  TEXT: 'text',
  Z_INDEX: 'z-index',
  OVERFLOW: 'overflow',
  SLOW_ANIMATIONS: 'slow-animations',
  PAUSE_ANIMATIONS: 'pause-animations',
  RESPONSIVE: 'responsive',
  GRID_BG: 'grid-bg',
  A11Y: 'a11y',
  SCROLL_STACK: 'scroll-stack',
};

type DebugMode = typeof CSS_DEBUG_MODES[keyof typeof CSS_DEBUG_MODES];

/**
 * Enable CSS debug mode on the document
 */
export function enableDebugMode(mode: DebugMode = 'outline-all') {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;

  if (mode === 'outline-all') {
    // Enable full debug mode
    html.setAttribute('data-debug', 'true');
    console.log('✅ CSS Debug Mode Enabled - All elements outlined');
    console.log('Use disableDebugMode() to turn off');
  } else {
    // Enable specific debug mode via classes
    const debugClasses = {
      'border': 'debug-border',
      'flex': 'debug-flex',
      'grid': 'debug-grid',
      'spacing': 'debug-spacing',
      'text': 'debug-text',
      'z-index': 'debug-z-index',
      'overflow': 'debug-overflow',
      'slow-animations': 'debug-slow',
      'pause-animations': 'debug-pause',
      'responsive': 'debug-responsive',
      'grid-bg': 'debug-grid-bg',
      'a11y': 'debug-a11y',
      'scroll-stack': 'debug-scroll-stack',
    };

    const className = debugClasses[mode as keyof typeof debugClasses] || '';
    if (className) {
      document.body.classList.add(className);
      console.log(`✅ Debug Mode "${mode}" Enabled`);
      console.log('Use disableDebugMode() to turn off');
    }
  }
}

/**
 * Disable CSS debug mode
 */
export function disableDebugMode() {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  html.removeAttribute('data-debug');

  // Remove all debug classes
  Object.values(CSS_DEBUG_MODES).forEach((mode) => {
    const debugClasses = {
      'outline-all': 'debug-outline-all',
      'border': 'debug-border',
      'flex': 'debug-flex',
      'grid': 'debug-grid',
      'spacing': 'debug-spacing',
      'text': 'debug-text',
      'z-index': 'debug-z-index',
      'overflow': 'debug-overflow',
      'slow-animations': 'debug-slow',
      'pause-animations': 'debug-pause',
      'responsive': 'debug-responsive',
      'grid-bg': 'debug-grid-bg',
      'a11y': 'debug-a11y',
      'scroll-stack': 'debug-scroll-stack',
    };
    const className = debugClasses[mode as keyof typeof debugClasses];
    document.body.classList.remove(className);
  });

  console.log('❌ CSS Debug Mode Disabled');
}

/**
 * Add debug class to specific element
 */
export function addDebugClass(element: HTMLElement, debugClass: string) {
  if (!element) return;
  element.classList.add(debugClass);
  console.log(`✅ Added class "${debugClass}" to element`, element);
}

/**
 * Remove debug class from specific element
 */
export function removeDebugClass(element: HTMLElement, debugClass: string) {
  if (!element) return;
  element.classList.remove(debugClass);
  console.log(`❌ Removed class "${debugClass}" from element`, element);
}

/**
 * Toggle debug class on element
 */
export function toggleDebugClass(element: HTMLElement, debugClass: string) {
  if (!element) return;
  element.classList.toggle(debugClass);
  const hasClass = element.classList.contains(debugClass);
  console.log(`${hasClass ? '✅ Added' : '❌ Removed'} class "${debugClass}"`, element);
}

/**
 * Log element layout information
 */
export function logElementLayout(element: HTMLElement | null) {
  if (!element) {
    console.log('❌ No element provided');
    return;
  }

  const rect = element.getBoundingClientRect();
  const computed = window.getComputedStyle(element);

  const info = {
    element: element.tagName,
    id: element.id || 'none',
    class: element.className || 'none',
    display: computed.display,
    position: computed.position,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    padding: computed.padding,
    margin: computed.margin,
    zIndex: computed.zIndex,
  };

  console.table(info);
}

/**
 * Watch element for changes (useful for debugging animations)
 */
export function watchElement(element: HTMLElement | null) {
  if (!element) {
    console.log('❌ No element provided');
    return;
  }

  console.log('👁️ Watching element for changes...');

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(`📝 ${mutation.type}:`, mutation);
    });
  });

  observer.observe(element, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    subtree: true,
  });

  console.log('To stop watching, call: observer.disconnect()');
  return observer;
}

/**
 * Initialize global debug utilities (available in console)
 */
export function initializeDebugGlobals() {
  if (typeof window === 'undefined') return;

  window.debugCSS = {
    enable: enableDebugMode,
    disable: disableDebugMode,
    addClass: addDebugClass,
    removeClass: removeDebugClass,
    toggleClass: toggleDebugClass,
    logLayout: logElementLayout,
    watch: watchElement,
    modes: CSS_DEBUG_MODES,
  };

  console.log('✅ CSS Debug Utilities Loaded');
  console.log('Use window.debugCSS to access debug functions');
  console.log('Available methods:', Object.keys(window.debugCSS));
}

/**
 * Print available debug modes
 */
export function printDebugModes() {
  console.group('🎨 Available Debug Modes');
  Object.entries(CSS_DEBUG_MODES).forEach(([key, value]) => {
    console.log(`${key}: enableDebugMode('${value}')`);
  });
  console.groupEnd();
}
