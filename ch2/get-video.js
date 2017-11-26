let captureButton = document.getElementById('capture');
captureButton.addEventListener('click', async(event) => {
  try {

    // 利用可能なデバイスの一覧を取得
    // let mediadevices = await navigator.mediaDevices.enumerateDevices();
    // console.log(mediadevices);

    let constraints = {
      video: {
        // 最低条件 640 以上 x 480 以上
        width: {min: 640},
        height: {min: 480},
        advanced: [                    // advancedの中では数値をそのまま使用するとideal(理想値)ではなくexact(完全一致)と同意になる
          {width: 1920, height: 1080}, // 第1条件 1,920 x 1,080
          {width: 1280, height: 720}, // 第2条件 1,280 x 720
          {frameRate: 60.0}, // 第3条件 フレームレート 60.0fps
          {frameRate: 30.0}, // 第4条件 フレームレート 30.0fps
          {frameRate: 15.0}, // 第5条件 フレームレート 15.0fps
        ],
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
