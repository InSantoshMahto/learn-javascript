(function() {
  function subscribe(url, callback) {
    var source = new window.EventSource(url);

    source.onmessage = function(e) {
      callback(e.data);
    };

    source.onerror = function(e) {
      if (source.readyState == window.EventSource.CLOSED) return;

      console.log('sse error', e);
    };

    return source.close.bind(source);
  }

  subscribe('/eventstream', function(data) {
    if (data && /reload/.test(data)) {
      console.log('data send by server  is', data);
      window.location.reload();
    }
  });
})();
