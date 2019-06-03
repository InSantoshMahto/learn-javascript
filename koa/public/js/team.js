'use strict';
/**
 * @see initiated AOS library
 */
AOS.init({
  offset: 120, // offset (in px) from the original trigger point
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
});
AOS.refresh({
  offset: 120,
  delay: 200,
  duration: 1500,
});
AOS.refreshHard({
  offset: 120,
  delay: 200,
  duration: 1500,
});
