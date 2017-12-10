// データチャネルが利用可能になると onopen イベントが発火する
dc.onopen = () => {
  // 文字列も送信できる
  dc.send(' 文字列');
  // バイナリデータも送信できる
  dc.send(new Uint8Array([0,1,2,253,254,255]));
  dc.send(new ArrayBuffer(128));
  dc.send(new Blob(['blob'], {type: "text/plain"}));
}