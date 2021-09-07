import {getallEpisode, getEpisode, getDetailOfCharacter} from "./api_episode.js";
const title = document.getElementById("header");
title.textContent = "Ricky y Morty API";
//console.log(title.textContent);

async function init() {
 
  const episodes = await getallEpisode();
  console.log(episodes);
  //console.log(episodes.promiseresult);
  for(let i=0; i<episodes.length; i++){
    console.log(episodes[i]);
    const list = document.getElementById("episodeList");
    //const list = document.createElement("ul");
    //Section.appendChild(list);
    const listItem = document.createElement("li");
    const itemlink = document.createElement("a");
    itemlink.href="#";// onclick=" getEpisode(1);"
    //Itemlink.addEventListener("click", function(){getEpisodeDetails(i+1);return false;});
    itemlink.addEventListener("click", function(){getEpisodeDetails(episodes[i].id);return false;});
    itemlink.textContent = "Episode " + episodes[i].id;
    //listItem.addEventListener("click", getEpisode(1));
    //console.log(itemlink.href);
    listItem.appendChild(itemlink);
    list.appendChild(listItem);
    
  }

  const nav = document.getElementById("episodeSection");
  const paginationButton = document.createElement("button");
  paginationButton.textContent = "Load Episodes";
 
  paginationButton.addEventListener("click", loadEpisodes);
  nav.appendChild(paginationButton);
  getEpisodeDetails(1);    // always loading first episode on page init
}

async function getEpisodeDetails(eNum) {
  console.log(eNum);
  const detailOfEpisode = await getEpisode(eNum);
  console.log(detailOfEpisode);
  //const aboutEpisode = document.getElementById("container");
  const titleOfEpisode = document.getElementById("EpisodeTitle");
  titleOfEpisode.textContent = "Episode " + detailOfEpisode.id ;
  //aboutEpisode.appendChild(titleOfEpisode);
  //console.log(titleOfEpisode);
  console.log(detailOfEpisode.air_date);
  console.log(detailOfEpisode.episode);
  const dateOfEpisode = document.getElementById("dateNseason");
  dateOfEpisode.textContent=detailOfEpisode.air_date + "  |  " + detailOfEpisode.episode;
  //titleOfEpisode.appendChild(dateOfEpisode);
  //console.log(dateOfEpisode);
  const arrayOfCharacter = detailOfEpisode.characters;
  console.log(arrayOfCharacter);
  var charactersDiv = document.getElementById("Characters");
  charactersDiv.innerHTML = "";
  var row = document.createElement("div");
  row.className ="character_container";
  for(let i=0; i<arrayOfCharacter.length; i++){

      //console.log(arrayOfCharacter[i]);
    const characterDetail = await getDetailOfCharacter(arrayOfCharacter[i]);
    console.log(characterDetail);   
    
     
     /*  const charactersDiv = document.getElementById("Characters");
      const row = document.createElement("div");
      row.className ="character_container";
      console.log(row);
      charactersDiv.appendChild(row);*/
    const singleCharacterDiv = document.createElement("div");
    singleCharacterDiv.className ="charDetail";
      //console.log(singleCharacterDiv);
      
    const characterImage= document.createElement("img");
    characterImage.src = characterDetail.image;
    characterImage.className ="charImage";
      //console.log(characterImage);

    const characterName = document.createElement("h3");
    characterName.textContent = characterDetail.name;
      //console.log(characterName);
    const Aboutcharacter = document.createElement("h4");
    Aboutcharacter.textContent=characterDetail.species + "  |  " + characterDetail.status;

    singleCharacterDiv.appendChild(characterImage);
    singleCharacterDiv.appendChild(characterName);
    singleCharacterDiv.appendChild(Aboutcharacter);

    row.appendChild(singleCharacterDiv);
    if( (i+1)%4 == 0){
      console.log("create new row" + (i));
      charactersDiv.appendChild(row);
      row = document.createElement("div");
      row.className ="character_container";
      }
    }
}

async function loadEpisodes(){
  const numberOfEpisode=document.querySelectorAll("#episodeList li").length;
  console.log("loadEpisodes");
  //getallEpisode(numberOfEpisode);
  
  const episodes = await getallEpisode(numberOfEpisode+1);
  console.log(episodes);
  const list = document.getElementById("episodeList");
  for(let i=0; i<episodes.length; i++){
    const listItem = document.createElement("li");
    const itemlink = document.createElement("a"); // change it later item Itemlink
    itemlink.href="#";// onclick=" getEpisode(1);"
    //Itemlink.addEventListener("click", function(){getEpisodeDetails(i+1);return false;});
    itemlink.addEventListener("click", function(){getEpisodeDetails(episodes[i].id);return false;});
    itemlink.textContent = "Episode " + episodes[i].id;
    //listItem.addEventListener("click", getEpisode(1));
    //console.log(itemlink.href);
    listItem.appendChild(itemlink);
    list.appendChild(listItem); 
  }
}
init();



