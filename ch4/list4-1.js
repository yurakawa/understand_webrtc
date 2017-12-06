let pc = new RTCPeerConnection({
  iceServers: [{urls: 'stun:stun.1.google.com:19302'}],
  iceTransportPolicy: 'all'
});