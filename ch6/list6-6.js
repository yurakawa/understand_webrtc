//// 送信側

// FileReader を使い、 File を ArrayBuffer として読み込む
let fileReader = new FileReader();
fileReader.onload = (e) => {
  // 指定サイズの切り出しができるように ArrayBufferView(Uint8Array) に変換
  let data = new Uint8Array(e.target.result);
  // 16KiB のチャンクに分割しながら送信する
  // 先頭 1バイトは終了フラグとして扱うため、実際のデータは 16KiB-1 バイトごと
  let chunkSize = 1024 * 16 - 1;
  let start = 0;
  while(start < data.byteLength) {
    let end = start + chunkSize;
    let chunkData = data.slice(start, end);
    let chunk = new Uint8Array(chunkData.byteLength + 1);
    // 先頭バイトに終了フラグをセット
    // 続きがある場合...0 最後のチャンクの場合...1
    chunk[0] = end >= data.byteLength ? 1 : 0;
    // 2バイト目以降に実データをセット
    chunk.set(new Uint8Array(chunkData), 1);
    // 送信
    dataChannel.send(chunk);
    start = end;
  }
};
fileReader.readAsArrayBuffer(file);



//// 受信側

// 受信したチャンクを一時的に溜めておく配列
let chunks = [];

dataChannel.onmessage = (event) => {
  // バイナリデータは ArrayBuffer 形式で送られてくるので
  // Uint8Array に変換して配列に溜めておく
  let receivedData = new Uint8Array(event.data);
  chunks.push(receivedData);
  // 先頭1バイトの終了フラグが立っているか確認
  if (receivedData[0] == 0) {
    return;
  }
  // ここから先は最後のチャンクを受け取った場合の処理
  // 受信したチャンクの合計データサイズを計算(終了フラグ各1バイトは除外)
  let length = chunks.reduce((length, chunk)=>{
    return length + chunk.byteLength -1;
  }, 0);
  // データサイズぶんの Uint8Array を生成し、
  // 各チャンクの実データ部分をはめ込んでいく
  let data = new Uint8Array(length);
  let pos = 0;
  chunks.forEach((chunk) => {
    data.set(chunk.slice(1), pos);
    pos += chunk.length - 1;
  });
  // 完了
  console.log(data);
}
