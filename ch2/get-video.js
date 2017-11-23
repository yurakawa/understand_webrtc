let captureButton = document.getElementById('capture');
captureButton.addEventListener('click', async(event) => {
  try {
    let mediaStream = await navigator.mediaDevices.getUserMedia(
      {
        audio: {
          echoCancellation: false
        }
      }
    );
    // メディアストリームを再生するvideoタグを生成
    // (音声のみの場合はaudioタグでも良い)
    let mediaElement = document.createElement('video');
    // 取得したメディアストリームをsrcObject属性に設定する
    mediaElement.srcObject = mediaStream;
    // 自動再生を設定(これを忘れると再生されない)
    mediaElement.autoplay = true;
    // videoタグを貼り付ける
    document.body.appendChild(mediaElement);
    //取得開始ボタンを削除
    document.body.removeChild(captureButton);
  } catch(error) {
    // メディアストリーム取得失敗時
    // ※ブラウザによってエラーオブジェクトの型が異なる
    console.log(error);
    alert('デバイスを利用できませんでした。');
  }
  event.preventDefault()
});
