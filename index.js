console.log("Starting socket process...")
const WebSocket = require('ws');
const crypto = require("crypto");

clientids = [];
function makeClientId(){
  id = crypto.randomBytes(16).toString("hex");
  //if (!clientids.includes(id)){
    clientids.push(id);
    return id;
  //};
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
const Serve = new WebSocket.Server({ port: 3000 });
Serve.on('connection', (ws) => {
  var clientid = makeClientId();
  var hasPanelAccess = false
  console.log(clientid);
  ws.send("regid:"+clientid);
  ws.on('message', (data) => {
    // the fitnessgraam(c) pacer test is a multistage aaerobic capacity test that progressivly gets more difficult over time, you may start when you her the sound BEEP and must end once you her the sound DINGDINGDINGDITCH. if do you not maake the 20meter pacer test in time two times you must STOP. the pacer test will begin in 30 seconds.. line up at the start
    if (data == "ifyaawannahelpmegitmeanotherbagofemchips"){
      hasPanelAccess = true
      removeClientId(clientid);
    } else if (hasPanelAccess == true) {
      if (data == "gitid"){
        ws.send("rightbackatya:"+clientids.toString());
      } else {
        Serve.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(data);
            }
        });
      }
    }
  });
  ws.on('close',function close(){
    console.log('connection closing removing client id...');
    removeClientId(clientid);
  });
});
