const WebSocket = require('ws');
const { randomUUID } = require('crypto');

clientids = [];
function makeClientId(){
  id = randomUUID().toString();
  if (!clientids.includes(id)){
    clientids.push(id);
    return id;
  };
};
function removeClientId(id){
  clientids.filter(function(value, index, arr) {
    if (value === id) {
        arr.splice(index, 1);
        return true;
    }
    return false;
  });
}
const Serve = new WebSocket.Server({ port: 8000 });
Serve.on('connection', (ws) => {
  var clientid = makeClientId();
  ws.on('message', (data) => {
    Serve.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    });
  });
  ws.on('ready',function ready(){
    client.send("regid:"+id);
  });
  ws.on('close',function close(){
    console.log('connection closing removing client id...');
    removeClientId(clientid);
  });
});
