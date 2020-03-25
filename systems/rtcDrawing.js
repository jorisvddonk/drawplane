AFRAME.registerSystem("rtcDrawing", {
  init: function () {
    let host = false;
    if (!location.hash) {
      host = true;
    }
    this.connections = [];
    const peer = new Peer();
    if (host) {
      peer.on('open', function (id) {
        location.hash = id;
      });
      peer.on('connection', (conn) => {
        this.connections.push(conn);
        conn.on('data', function (data) {
          if (data.type === 'HELLO') {
            console.log("received HELLO");
            // TODO: send complete drawing!
          }
        });
        conn.on('close', () => {
          this.connections.remove(conn);
        });
      });
    } else {
      const conn = peer.connect(location.hash.substr(1));
      conn.on('open', function () {
        conn.send({ type: 'HELLO' });
      });
      conn.on('data', function (data) {
        if (data.type === 'DRAW') {
          // create new line!
          const lineElement = document.createElement('a-entity');
          lineElement.setAttribute('meshline', `lineWidth: 20; path: ${data.data.path.map(x => `${x[0]} ${x[1]} ${x[2]}`)}; color: ${data.data.color}`);
          document.getElementById('points').appendChild(lineElement);
        }
      });
    }
  },
  emit: function (path, color) {
    this.connections.forEach(conn => {
      conn.send({ type: 'DRAW', data: { path, color } });
    });
  }
});