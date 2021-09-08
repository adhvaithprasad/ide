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

tabBar.listen('MDCTabBar:activated', function (event) {
  // Hide currently-active content
  document.querySelector('.content--active').classList.remove('content--active');
  // Show content for newly-activated tab
  contentEls[event.detail.index].classList.add('content--active');
});
function init() {
  var df = document.getElementById("before-load");
  setTimeout(function () {
    df.style.display = "none";
  }, 1000);
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
}


// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
  var ref = firebase.database().ref();

    var hash = window.location.hash.replace(/#/g, '');



  if (hash) {
    ref = ref.child(hash);

 
// joinButtonFunc()

  } else {
    ref = ref.push(); // generate unique location.
    var x = ref.key
    window.location = window.location + '#' + x;



  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  return ref;


}
function close_dev() {
  var x = document.getElementById("tim");
  x.style.display = "none";
  var y = document.getElementById("cb");
  y.style.display = "none";

}


function chat() {
  var x = document.getElementById("chat");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function c_chat() {
  var x = document.getElementById("chat");
  x.style.display = "none";
}
function f() {
  new mdc.dialog.MDCDialog(document.querySelector('.git')).open();

}

window.onresize = function () {
  editor.layout();
};
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.display = "none";
}

const db = firebase.database();


 function postChat(e) {
     var hash = window.location.hash.replace(/#/g, '');
	// e.preventDefault();
	const timestamp = Date.now();
	
	const message = $("#mjk").val();
   

	db.ref(hash+"/room/"+ timestamp).set({

	  msg: message

	});
  }




  setInterval(function(){ 

	var hash = window.location.hash.replace(/#/g, '');
const fetchChat = db.ref(hash+"/room/");
  fetchChat.on("child_added", function (snapshot) {
	const messages = snapshot.val();
	const msg = "<div><p id='msg2'>"+ messages.msg +"</p></div>";


   	document.querySelector('.mnc').innerHTML += msg;
  

  });

}, 2);//run this thang every 2 seconds
