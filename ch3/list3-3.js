// 相手のメディアストリームを表示する
// ※ remoteVideoElemは映像の再生を行う video 要素
if (typeof pc.ontrack != 'undefined') {
  // 新仕様
  pc.ontrack = (event) => {
    // ontrack イベントは video と audio で２回発火するが、videoの時のみ処理を行う
    if (event.track.kind == 'video') {
      remoteVideoElem.srcObject = event.streams[0];
    }
  };
}else{
  // 旧仕様
  pc.onaddstream = (event) => {
    remoteVideoElem.srcObject = event.streams;
  };
}