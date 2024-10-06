var socket = io();

let btn = document.getElementById('btn');
let inputMessage = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

btn.onclick = function exec(){
    let msg = inputMessage.value;
    socket.emit('msg_send', msg);
}

socket.on('msg_rcvd', (data)=>{
    let listmsg = document.createElement('li');
    listmsg.innerText = data;
    msgList.appendChild(listmsg);
});