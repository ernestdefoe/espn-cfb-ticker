(function () {
  if (!window.app) {
    return;
  }

  app.initializers.add('espn-cfb-ticker', function () {
    const container = document.createElement('div');
    container.className = 'EspnCfbTicker';
    container.textContent = 'Loading CFB ticker...';

    const header = document.querySelector('.App-header .HeaderSecondary') || document.querySelector('.HeaderSecondary');
    if (header) {
      header.appendChild(container);
    } else {
      document.body.insertBefore(container, document.body.firstChild);
    }

    const apiUrl = app.forum.attribute('apiUrl');
    if (!apiUrl) {
      container.textContent = 'CFB ticker failed to initialize.';
      return;
    }

    fetch(apiUrl + '/cfb-ticker', { credentials: 'same-origin' })
      .then(function (response) {
        return response.json();
      })
      .then(function (payload) {
        if (payload.error) {
          container.textContent = payload.error;
          return;
        }

        container.textContent = '';
        var strip = document.createElement('div');
        strip.className = 'EspnCfbTicker-strip';

        (payload.data || []).forEach(function (item) {
          var span = document.createElement('span');
          span.className = 'EspnCfbTicker-item';
          span.textContent = item;
          strip.appendChild(span);
        });

        if (strip.children.length === 0) {
          container.textContent = 'No CFB games available right now.';
        } else {
          container.appendChild(strip);
        }
      })
      .catch(function () {
        container.textContent = 'Unable to load ESPN CFB ticker.';
      });
  });
})();
