
// メディアストリームの登録
// メディアストリームは事前に取得しておく
// var localStream = await navigator.mediaDevices.getUserMedia(
//   {audio: true, video: true}
// );


// アリス (発信側)
let pc = createRTCPeerConnection();
// オファーSDPを生成
let offerSdp = await pc.createOffer();
// 生成したオファーSDPをLocalDescriptionに設定
await pc.setLocalDescription(offerSdp);
// ボブにオファーSDPを送信し、通信開始を要求
// ※ ws はWebSocket 接続オブジェクト
// ※ この部分は仕様で定められていないので自由に実装できる
ws.send({
  to: 'Bob',
  event: 'offer',
  sdp: offerSdp
});

///////////////////

// ボブ(着信側)
// WebSocket メッセージを受信
ws.onmessage = async (e) => {
  if(e.data.event == 'offer') {
    // 相手から送られてきたオファーSDP を RemoteDescription に設定
    await pc.setRemoteDescription(new RTCSessionDescription(e.data.sdp));
    // オファーに対するアンサーSDPを生成
    let answerSdp = await pc.createAnswer();
    // 生成したアンサーSDP を LocalDescriptionに設定
    await pc.setLocalDescription(answerSdp);
    // アリスにアンサーSDPを送信
    ws.send({
      to: 'Alice',
      event: 'answer',
      sdp: 'answerSdq'
    });
  }
};

///////////////////

// 再びアリス
// WebSocket メッセージを受信
ws.onmessage = async (e) => {
  if(e.data.event == 'answer') {
    // 相手から送られてきたオファーSDP を RemoteDescription に設定
    await pc.setRemoteDescription(new RTCSessionDescription(e.data.sdp));
  }
};

// 発信側・着信側共通
// RTCPeerConnection オブジェクトの生成や、メディアストリームの登録、
// 各種コールバック関数の設定は発信側、着信側の両方で行うので、関数化しておくと便利
function createRTCPeerConnection() {
  let pc = new RTCPeerConnection({
    iceServers: [{urls: 'stun.1.google.com:19302'}],
    iceTransportPolicy: 'all'
  });

  // ※ localStream は Webカメラなどから取得したメディアストリーム
  // ※ メディアストリームは事前に取得できている想定
  if ('addTrack' in pc) {
    // 新仕様
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
  }else{
    // 旧仕様
    pc.addStream(localStream);
  }

  // ※ remoteVideoElem は映像の再生を行う video要素
  if (typeof pc.ontrack != 'undefined') {
    // 新仕様
    pc.ontrack= (event) => {
      if(event.track.kind == 'video') {
        remoteVideoElem.srcObject = event.streams[0];
      }
    };
  }else{
    // 旧仕様
    pc.onaddstream = (event) => {
      remoteVideoElem.srcObject = event.stream;
    };
  }
}
