let dataChannelInit = {
  ordered: false, // 到達順序を保証しない
  maxPacketLifeTime: 1000 // 最大再送時間は 1000 ミリ秒
  // (最大再送か指数を指定する場合)
  // maxRetransmits: 3 // 最大再送回数は 3回
};
let dataChannel = peerConnection. createDataChannel('foo', dataChannelInit);