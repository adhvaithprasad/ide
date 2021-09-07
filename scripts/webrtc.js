let firestore = firebase.firestore();
let localStream;
let remoteStream;
let roomId;
let roomIdData = [];
let peerConnection;

let configuration = {
  'iceServers': [
    { 'urls': 'stun:stun.services.mozilla.com' },
    { 'urls': 'stun:stun.l.google.com:19302' },
  ]
}

//Reference to the Buttons
let openButton = document.getElementById("open");

let hangupButton = document.getElementById("hangup");

let createButton = document.getElementById("create");
let joinButton = document.getElementById("join");
// Reference to the Video Tags
let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");
const createButtonFunc = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  remoteStream = new MediaStream();
  remoteVideo.srcObject = remoteStream;
  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream)
  })

  // Code for collecting ICE candidates below
  const roomRef = firestore.collection("rooms").doc();
  const callerCandidatesCollection = roomRef.collection("callerCandidates");

  peerConnection.addEventListener("icecandidate", event => {
    if (!event.candidate) {
      //  console.log("Got Final Candidate!");
      return;
    }
    //  console.log('Got candidate: ', event.candidate);
    callerCandidatesCollection.add(event.candidate.toJSON());
  })
  // Code for creating a room below
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
var hash = window.location.hash.replace(/#/g, '');
  const roomWithOffer = {
    'offer': {
      type: offer.type,
      sdp: offer.sdp,
    },
    roomId: roomRef.id
  };
  await roomRef.set(roomWithOffer);
  roomId = roomRef.id;

  
  firebase.database().ref(hash).set({
    room: roomId
  });


  peerConnection.addEventListener("track", event => {

    event.streams[0].getTracks().forEach(track => {

      remoteStream.addTrack(track);
    })
  })

  // Listening for remote session description below
  let unsubscribe = roomRef.onSnapshot(async snapshot => {
    const data = snapshot.data();
    if (peerConnection.iceConnectionState !== "closed") {

      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        // console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }

    }
  })
  // Listening for remote session description above

  // Listen for remote ICE candidates below
  let unsubscribe2 = roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === 'added') {
        let data = change.doc.data();
        // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  // Listen for remote ICE candidates above

  return () => {
    unsubscribe();
    unsubscribe2();
  }

}
const joinButtonFunc = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  remoteStream = new MediaStream();
  remoteVideo.srcObject = remoteStream;


  var hash = window.location.hash.replace(/#/g, '');

 const dbRef = firebase.database().ref();
dbRef.child(hash).child("room").get().then((snapshot) => {
  if (snapshot.exists()) {
    roomId= snapshot.val()
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

  peerConnection = new RTCPeerConnection(configuration);

  const roomRef = firestore.collection("rooms").doc(roomId);
  const roomSnapshot = await roomRef.get();

  if (roomSnapshot.exists) {
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream)
    })

    // Code for collecting ICE candidates below
    const calleeCandidatesCollection = roomRef.collection("calleCandidates");
    peerConnection.addEventListener("icecandidate", event => {
      if (!event.candidate) {
        // console.log('Got final candidate!');
        return;
      }
      // console.log('Got candidate: ', event.candidate);
      calleeCandidatesCollection.add(event.candidate.toJSON());
    })
    // Code for collecting ICE candidates above

    peerConnection.addEventListener("track", event => {
      // console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        // console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      })
    })

    // Code for creating SDP answer below
    const offer = roomSnapshot.data().offer;
    // console.log('Got offer:', offer);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    //   console.log('Created answer:', answer);
    await peerConnection.setLocalDescription(answer);

    const roomWithAnswer = {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    };
    await roomRef.update(roomWithAnswer);
    // Code for creating SDP answer above

    // Listening for remote ICE candidates below
    let unsubscribe = roomRef.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listening for remote ICE candidates 

    return () => unsubscribe()
  }



}
const hangupButtonFunc = async () => {
  const tracks = localVideo.srcObject.getTracks();
  tracks.forEach(track => track.stop());

  if (remoteStream) {
    remoteStream.getTracks().forEach(track => track.stop())
  }

  if (peerConnection) {
    peerConnection.close();
  }

  //Delete a room on hangup below
  if (roomId) {
    const roomRef = firestore.collection("rooms").doc(roomId);
    const calleeCandidates = await roomRef.collection('calleeCandidates').get();
    calleeCandidates.forEach(async candidate => {
      await candidate.ref.delete();
    });
    const callerCandidates = await roomRef.collection('callerCandidates').get();
    callerCandidates.forEach(async candidate => {
      await candidate.ref.delete();
    });
    await roomRef.delete();
  }

}
openButton.addEventListener("click", openButtonFunc);
createButton.addEventListener("click", createButtonFunc);
joinButton.addEventListener("click", joinButtonFunc);
hangupButton.addEventListener("click", hangupButtonFunc);

createButtonFunc()