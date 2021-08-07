     var config = {
 apiKey: "AIzaSyCfIx0BAjQ3enra1gvIII-wLA-4sY36OtY",
    authDomain: "xenialbase.firebaseapp.com",
    databaseURL: "https://xenialbase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "xenialbase",
    storageBucket: "xenialbase.appspot.com",
    messagingSenderId: "331739692960",
    appId: "1:331739692960:web:0fff7288a3b2ad7802aec5",
    measurementId: "G-0KQLFZBB2M"
        };
        firebase.initializeApp(config);

    function init() {
       
        //// Get Firebase Database reference.
        var firepadRef = getExampleRef();

        //// Create Monaco and firepad.
        require.config({ paths: {'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs'}});
        require(['vs/editor/editor.main'], function() {
            window.editor = monaco.editor.create(
                document.getElementById('firepad'),
                {
                    language: 'javascript',
                    theme:'vs-dark'
                }
            );
            Firepad.fromMonaco(firepadRef, editor);
        });


    }
function save() {
   // get the value of the data
   var value = window.editor.getValue()
  alert(value);     
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
      var x = document.getElementById("output");
      x.style.display= "none";
      var y = document.getElementById("cb");
                 y.style.display="none";
    }
function open_input(){
        var x = document.getElementById("input");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
    }
    function open_out(){
        var x = document.getElementById("expout");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
    }


