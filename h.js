

function b(){
const branch = async function(){

try{
const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
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
catch(e){
  console.log(e);
}
branch()
}}
window.b=b