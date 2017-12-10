let pc = new RTCPeerConnection({
  icServers: [
    {urls: 'stun:198.51.100.135:3478'}
    // ↓ 複数の場合は配列で指定する
    // {urls: ['stun:198.51.100.135:3478', 'stun:stun.1.google.com:19302']}
  ],
  iceTransportPolicy: 'all'
});