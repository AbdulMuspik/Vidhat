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

const socket = io.connect();

startButton.addEventListener('click', startCall);
hangupButton.addEventListener('click', hangUp);

socket.on('offer', async (offer) => {
    if (!peerConnection) {
        createPeerConnection();
    }
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer);
});

socket.on('answer', async (answer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on('ice-candidate', async (candidate) => {
    try {
        await peerConnection.addIceCandidate(candidate);
    } catch (e) {
        console.error('Error adding received ice candidate', e);
    }
});

async function startCall() {
    startButton.disabled = true;
    hangupButton.disabled = false;

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    createPeerConnection();

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', offer);
}

function createPeerConnection() {
    peerConnection = new RTCPeerConnection(servers);

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
        }
    };

    peerConnection.ontrack = event => {
        remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
    };
}

function hangUp() {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
    remoteVideo.srcObject = null;
    localVideo.srcObject = null;
    startButton.disabled = false;
    hangupButton.disabled = true;
}

socket.on('connect', () => {
    console.log('Connected to signaling server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from signaling server');
});
