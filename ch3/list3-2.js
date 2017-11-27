// メディアストリームは事前に取得しておく
let localStream = await navigator.mediaDevices.getUserMedia(
  {audio: true, video: true}
);
// 送信したい自分のメディアストリームを登録する
// ※ pc は RTCPeerConnection オブジェクト
if('addTrack' in pc){
  // 新仕様
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream); });
}else{
  // 旧仕様
  pc.addStream(localStream);
}
