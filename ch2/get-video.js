let captureButton = document.getElementById('capture');
captureButton.addEventListener('click', async(event) => {
  try {

    // 利用可能なデバイスの一覧を取得
    // let mediadevices = await navigator.mediaDevices.enumerateDevices();
    // console.log(mediadevices);

    let constraints = {
      video: {
        width: {min: 640}, height: {min: 480},
      },
      audio: {
        echoCancellation: true
      },
    };
    // ローカルストレージにデバイス選択設定が保存されていたらそれを使う
    if (localStorage.getItem('videoDeviceId')){
      constraints['video']['deviceId'] = localStorage.getItem('videoDeviceId');
    }
    if (localStorage.getItem('audioDeviceId')) {
      constraints['audio']['deviceId'] = localStorage.getItem('audioDeviceId');
    }
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

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
