// Main variable
let theInput=document.querySelector(".get-repos input");
let getButton=document.querySelector(".get-button");
let reposData=document.querySelector(".show-data");

// Get Repos Function 

getButton.onclick=function(){
    getRepos();
};

function getRepos(){
    
    if(theInput.value==""){
        reposData.innerHTML="<span> Please Write Github UserName </span>"; 
    }
    else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`) 

       .then((response) => response.json())
       
       .then((repositories)=>{
         
        // Empty the container
        reposData.innerHTML = '';

        repositories.forEach(repo => {
            //Create the main div
            let mainDiv= document.createElement("div");
            // Create a link for each repo
            let repoName=document.createTextNode(repo.name);

            mainDiv.append(repoName);

            let theUrl=document.createElement("a");

            let theUrlText=document.createTextNode(" Visit ");

            theUrl.appendChild(theUrlText);

            theUrl.href=`https://github.com/${theInput.value}/${repo.name}`;

            theUrl.setAttribute("target","_blank");
            
            mainDiv.appendChild(theUrl)

            let starsSpan=document.createElement("span");

            let starsText =document.createTextNode(` ${repo.stargazers_count} Stars`);

            starsSpan.appendChild(starsText);

            mainDiv.appendChild(starsSpan);

            mainDiv.className="repo-box";

            reposData.appendChild(mainDiv);

        });

       });

    }
}