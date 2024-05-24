const startButton = document.getElementById('startButton');
const hangupButton = document.getElementById('hangupButton');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        { urls: 'stun:stun.stunprotocol.org' },
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

startButton.addEventListener('click', startCall);
hangupButton.addEventListener('click', hangUp);

async function startCall() {
    startButton.disabled = true;
    hangupButton.disabled = false;

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    peerConnection = new RTCPeerConnection(servers);

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            // Normally, you'd send the candidate to the remote peer via your signaling server
            console.log('New ICE candidate:', event.candidate);
        }
    };

    peerConnection.ontrack = event => {
        remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
    };

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Normally, you'd create the offer, set local description, and send the offer to the remote peer via signaling server
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Simulate receiving the offer and creating an answer
    // In a real application, the offer would be sent to the remote peer who would then create an answer
    simulateRemotePeer(offer);
}

async function simulateRemotePeer(offer) {
    const remotePeer = new RTCPeerConnection(servers);

    remotePeer.onicecandidate = event => {
        if (event.candidate) {
            // Normally, you'd send the candidate to the local peer via your signaling server
            console.log('Remote ICE candidate:', event.candidate);
        }
    };

    remotePeer.ontrack = event => {
        remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
    };

    remotePeer.setRemoteDescription(new RTCSessionDescription(offer));

    localStream.getTracks().forEach(track => {
        remotePeer.addTrack(track, localStream);
    });

    const answer = await remotePeer.createAnswer();
    await remotePeer.setLocalDescription(answer);
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function hangUp() {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
    remoteVideo.srcObject = null;
    localVideo.srcObject = null;
    startButton.disabled = false;
    hangupButton.disabled = true;
}
