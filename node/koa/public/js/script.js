'use strict';
/**
 * @author ONSI India
 */
const copyrightYear = document.querySelector('#copyright-year');

/**
 * passive listen
 */
// document.addEventListener('touchstart', onTouchStart, { passive: true });

/**
 * footer
 * copyright year
 */
(() => {
  copyrightYear.textContent = new Date().getFullYear();
})();

// console.log(`i am from script.js`);
