//////
//// 通信経路候補を見つけた

// 通信経路が見つかった時
pc.onicecandidate = (event) => {
  if (event.candidate) {
    // 通信経路候補を通話相手に教えるため送信
    ws.send({
      to: remoteUser,
      event: 'icecandidate',
      data: event.candidate
    });
  } else {
    // 通信経路候補を見つけ終えたら、event.candidateは空
  }
};

// 相手から通信経路候補が送られてきた
// WebSocketメッセージを受信
ws.onmessage = async(e) => {
  if (e.data.event == 'icecandidate') {
    // 相手から送られてきた通信経路候補を登録
    await pc.addIceCandidate(new RTCIceCandidate(e.data.data));
  }
};