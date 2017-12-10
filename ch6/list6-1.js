// RTCPeerConnection の生成はメディアストリームの場合と同じ
let pc = new RTCPeerConnection({
  iceServers: [{urls: 'stun:stun.1.google.com:19302'}],
  iceTransportPolicy: 'all'
});

// 接続を要求する側は、createDataChannel メソッドを使って RTCDataChannel を生成する
let dc = pc.createDataChannel(
  // ラベル (65, 535 バイト以内の任意の文字列)
  'label',
  // データチャネルのオプション
  {
    // ordered:  false,
    // maxPacketLifeTime: 100,
    // MAXrETRANSMITS: 0
  }
);

// 以降の手順はメディアストリームの場合と同じ
let offerSdp = await pc.createOffer();
await pc.setLocalDescription(offerSdp);
ws.send({
  to: 'Bob',
  event: 'offer',
  sdp: offerSdp
});
