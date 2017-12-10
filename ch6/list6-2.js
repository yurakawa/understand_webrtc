// 接続を要求された側
let pc;
let dc;
ws.onmessage = async(e) => {
  if (e.data.event == 'offer') {
    // RTCPeerConnection の生成は接続を要求する側と同じ
    pc = new RTCPeerConnection({
      iceServers: [{urls: 'stun:stun.1.google.com:19302'}],
      iceTransportPolicy: 'all'
    });
    // 接続を要求された側は ondatachannel イベントの引数で RTCDataChannel を取得する
    pc.ondatachannel = (event) => {
      // RTCDataChannel オブジェクトは引数の channel プロパティに格納されている
      dc = event.channel;
    }

    // 以降の手順はメディアストリームの場合と同じ
    await pc.setRemoteDescription(new RTCSessionDescription(e.data.sdp));
    let answerSdp = await pc.createAnswer();
    await pc.localDescription(answerSdp);
    ws.send({
      to: 'Alice',
      event: 'answer',
      sdp: answerSdp
    });
  }
};