import { Octokit, App } from "https://cdn.skypack.dev/octokit";
// smple key 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





function login() {
  var y = document.getElementById('apikey').value;
  var u = document.getElementById('username');
  console.log(y)


  const login = async function () {
    try {
      const {
        data: { login },
      } = await octokit.rest.users.getAuthenticated();

      const name = await octokit.request('GET /users/{username}/repos', {
        username: login
      })

      const data = name.data;
      for (let i in data) {
        // console.log('Repo:', data[i].name);
        var o = document.createElement("OPTION");
        o.setAttribute("value", data[i].name);
        var t = document.createTextNode(data[i].name);
        o.appendChild(t);
        document.getElementById("lm").appendChild(o);
      }
      //  var rep = document.getElementById("lm").value;
      //  const branch = await octokit.request('GET /repos/{owner}/{repo}/branches', {
      //   owner: login,
      //   repo: rep
      // })
      // console.log(branch)
      u.innerHTML = login;
      document.querySelector(".wrap").style.display = "none";
    }
    catch (e) {
      console.log(e)
      if (e.status == 401) {
        // console.log('rq');
        document.getElementById('oauth').innerHTML = "<p>your auth token has either expired , incorrectly submitted or you have not submitted it.</p>";
      }
    }


  }
  const octokit = new Octokit({
    auth: y,
  });
  login()

}


function b() {
  const branch = async function () {

    try {

      var rep = document.getElementById("lm").value;
      const branch = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: login,
        repo: rep
      })

      const data = branch.data;
      for (let i in data) {
        console.logo(data[i].branch)


      }

    }
    catch (e) {
      console.log(e);
    }
    branch()
  }
}
window.b = b



window.login = login








