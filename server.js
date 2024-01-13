const WebSocket = require('ws');

CLIENTS = [];
const wss = new WebSocket.Server({ port: 8000 });
wss.on('connection', (ws) => {
  CLIENTS.push(ws);
  console.log(CLIENTS);
  ws.on('message', (data) => {
    console.log(data)
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    });
  });
});
