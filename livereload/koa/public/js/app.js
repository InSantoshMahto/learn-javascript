let evtSource = new EventSource('http://localhost:80/event_stream');

evtSource.addEventListener('reload', function(e) {
  console.log(`console logs: reload`, e);
  console.log('reload: ' + e.data);
});

evtSource.onmessage = function(e) {
  console.log('onMsg: ' + e.data);
  console.log(`message received from server`);
};

evtSource.onopen = function(e) {
  console.info('connected', e);
};

evtSource.onerror = function(e) {
  console.error('error', e);
  evtSource.close();
};

// evtSource.addEventListener(
//   'message',
//   function(e) {
//     console.log(e.data);
//   },
//   false
// );

// evtSource.addEventListener(
//   'open',
//   function(e) {
//     // Connection was opened.
//   },
//   false
// );

// evtSource.addEventListener(
//   'error',
//   function(e) {
//     if (e.readyState == EventSource.CLOSED) {
//       // Connection was closed.
//     }
//   },
//   false
// );
