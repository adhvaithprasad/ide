

     var config = {
 apiKey: "AIzaSyC-3XDB0vSiQlbGL-Sa9rOiteFYitYfstw",
  authDomain: "firescrypt-web.firebaseapp.com",
  databaseURL: "https://firescrypt-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firescrypt-web",
  storageBucket: "firescrypt-web.appspot.com",
  messagingSenderId: "276701233302",
  appId: "1:276701233302:web:5e513b1d8c681e830082b7",
  measurementId: "G-T12DZ6GPNN"
        };
        firebase.initializeApp(config);

        
var tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
var contentEls = document.querySelectorAll('.content');

tabBar.listen('MDCTabBar:activated', function(event) {
  // Hide currently-active content
  document.querySelector('.content--active').classList.remove('content--active');
  // Show content for newly-activated tab
  contentEls[event.detail.index].classList.add('content--active');
});
function init(){
  var df= document.getElementById("before-load");
setTimeout(function(){
  df.style.display="none";
},1000);
        var firepadRef = getExampleRef();
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));
require(["vs/editor/editor.main"], function () {
  window.editor = monaco.editor.create(document.getElementById('firepad-container'), {
    language: 'javascript',
    theme: 'vs-dark'
  });
  Firepad.fromMonaco(firepadRef, window.editor);
});


}
function save() {
   // get the value of the data
   var value = window.editor.getValue()
 
// var y = document.getElementById("snackbar-text");
//  y.innerHTML="downloading";
//     var x = document.getElementById("snackbar");
//   x.className = "show";
//   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

    // Helper to get hash from end of URL or generate a random one.
    function getExampleRef() {
       var ref = firebase.database().ref();
        var hash = window.location.hash.replace(/#/g, '');
        if (hash) {
            ref = ref.child(hash);
        } else {
            ref = ref.push(); // generate unique location.
            window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
// document.getElementById("init").innerHTML=ref.key;
            
        }
        if (typeof console !== 'undefined') {
            console.log('Firebase data: ', ref.toString());
        }
        return ref;


    }

  //   function open_dev(){
  //       var x = document.getElementById("output");
  // if (x.style.display === "block") {
  //   x.style.display = "none";
  // } else {
  //   x.style.display = "block";
  // }
  //   }
    function close_dev(){
      var x = document.getElementById("tim");
      x.style.display= "none";
      var y = document.getElementById("cb");
      y.style.display="none";

    }


    function chat(){
       var x = document.getElementById("chat");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
    }
    function c_chat(){
       var x = document.getElementById("chat");
       x.style.display="none";
    }
  function f(){
    new mdc.dialog.MDCDialog(document.querySelector('.git')).open();
  
  }

window.onresize = function (){
    editor.layout();
};
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.display="block";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.display="none";
}

let firestore = firebase.firestore();
let localStream;
let remoteStream;
let roomId;
let roomIdData = [];
let peerConnection;

let configuration = {
    'iceServers': [
      {'urls': 'stun:stun.services.mozilla.com'},
      {'urls': 'stun:stun.l.google.com:19302'},
    ]
  }

//Reference to the Buttons
let openButton = document.getElementById("open");
let createButton = document.getElementById("create");
let joinButton = document.getElementById("join");
let hangupButton = document.getElementById("hangup");



// Reference to the Video Tags
let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");


const openButtonFunc = async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        remoteStream = new MediaStream();
        remoteVideo.srcObject = remoteStream;

                       var hash = window.location.hash.replace(/#/g, '');
const dbRef = firebase.database().ref();
dbRef.child(hash).child("room").get().then((snapshot) => {
  if (snapshot.exists()) {
    joinButtonFunc().then(console.log("joined room"));
  } else {
    createButtonFunc().then(console.log("created"))
  }
}).catch((error) => {
  console.error(error);
});

    } catch (error) {
        console.log(error)
    }
}
const createButtonFunc = async () => {
    peerConnection = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream)
    })

    // Code for collecting ICE candidates below
    const roomRef = firestore.collection("rooms").doc();
    const callerCandidatesCollection = roomRef.collection("callerCandidates");

    peerConnection.addEventListener("icecandidate", event => {
      if(!event.candidate){
       //  console.log("Got Final Candidate!");
        return;
      }
     //  console.log('Got candidate: ', event.candidate);
     callerCandidatesCollection.add(event.candidate.toJSON());
    })
    // Code for creating a room below
     const offer = await peerConnection.createOffer();
     await peerConnection.setLocalDescription(offer);

     const roomWithOffer = {
       'offer': {
         type: offer.type,
         sdp: offer.sdp,
       },
       roomId: roomRef.id
     };
     await roomRef.set(roomWithOffer);
     roomId = roomRef.id;


               var hash = window.location.hash.replace(/#/g, '');
      firebase.database().ref(hash).set({
room:roomId
  });

     // Code for creating a room above

     peerConnection.addEventListener("track", event => {
        // console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach(track => {
          // console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track);
        })
       })

       // Listening for remote session description below
      let unsubscribe = roomRef.onSnapshot(async snapshot => {
        const data = snapshot.data();
        if(peerConnection.iceConnectionState !== "closed"){

          if(!peerConnection.currentRemoteDescription && data && data.answer){
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
            var hash = window.location.hash.replace(/#/g, '');
            const dbRef = firebase.database().ref();
dbRef.child(hash).child("room").get().then((snapshot) => {
  if (snapshot.exists()) {
  roomId=snapshot.val()
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

 

    peerConnection = new RTCPeerConnection(configuration);

    const roomRef = firestore.collection("rooms").doc(roomId);
    const roomSnapshot = await roomRef.get();

    if(roomSnapshot.exists){
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream)
        })

        // Code for collecting ICE candidates below
        const calleeCandidatesCollection = roomRef.collection("calleCandidates");
        peerConnection.addEventListener("icecandidate", event => {
          if(!event.candidate){
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

    if(remoteStream){
        remoteStream.getTracks().forEach(track => track.stop())
    }

    if(peerConnection){
        peerConnection.close();
    }

    //Delete a room on hangup below
    if(roomId){
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
    //Delete a room on hangup above


    // document.location.reload(true);
}
openButton.addEventListener("click", openButtonFunc);
// createButton.addEventListener("click", createButtonFunc);
// joinButton.addEventListener("click", joinButtonFunc);
hangupButton.addEventListener("click", hangupButtonFunc);