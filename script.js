const apiKey='b0e0a101';

async function suggestion(){

    try{
        let response=await fetch('./db.json');
    let data=await response.json();
    let db=data.movies;
    console.log(db);

    let suggestions=document.getElementById('suggestions');
    db.forEach(element=>{
        let option=document.createElement('option');
        option.value=element.title;
        suggestions.appendChild(option);
    })

    }catch(error){
        console.log(error);
    }
    
}

suggestion();


let input=document.getElementById('inputSpace');
let searchBtn=document.getElementById('searchBtn');
let container = document.getElementById('container');


let favContainer=document.getElementById('favContainer');
let favourite=document.getElementById('favourite');


let favArr=[];


// Function to get movies by query

async function getDetails(query){

    try{
        let rawData= await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
        let data=await rawData.json();
        let results=data.Search
  
    return results || [];

    }catch(error){
        console.log(error);
}   
}

// Movie Search button event listener

searchBtn.addEventListener('click',()=>{
    let query=input.value;
    
    
    input.value="";
    container.innerHTML="";

    getDetails(query).then(results=>{


        //checking if the resultant array has size 0 which means no details found for the searched movie

        if(results.length<=0){
            container.innerHTML=`
                <div id="errorCont">
                <p>Oops No Results Found!!!</p>             
                <p>Try again with another keyword</p>
                </div>
            `
        }else{
            results.forEach(element => {
               
                let newDiv=document.createElement('div');
                let change='Add to'
                createMovieCards(element,newDiv,change);       
                
                        // Adding eventlistener to each newly created div to show
                        // details of individual movies
                
            
                newDiv.addEventListener('click',(event)=>{

                    if(event.target.tagName=='BUTTON'){
                        if(!favArr.includes(element)){
                            favArr.push(element);
                        alert(`${element.Title} has been added to your favourites`)
                            console.log(favArr);
                        }else{
                            alert(`This movie is already added to favourites!`)
                        }
                        
                    }else{
                        showDetails(element);
                    }   

                })
            });
        }
    })
})



favourite.addEventListener('click',()=>{
    updateFavourites();
})


function updateFavourites(){
    container.innerHTML="";
    if(favArr.length<=0){
        container.innerHTML=`
            <div id="errorCont">
            <p>No favourites Yet!!!</p>
            
       </div>
        `
    }else{
        favArr.forEach(element=>{
            let newDiv=document.createElement('div');
            let change='Remove from'
            createMovieCards(element,newDiv,change);       
    
            newDiv.addEventListener('click',(event)=>{
                if(event.target.tagName=='BUTTON'){
                    let index=favArr.indexOf(element);
                    delete favArr[index];
                    
                    updateFavourites();
                }else{
                    showDetails(element);
                }
            })
        })
    }
    
}


// Function to create small movie cards/tiles

function createMovieCards(element , newDiv,change){
    // let newDiv=document.createElement('div');
                newDiv.classList.add('tile');
                newDiv.innerHTML=`
                        <div class="imgCont">
                    <img src=${element.Poster} alt="poster">
                    </div>
                    <div>
                    <p>${element.Title}</p>
                    </div>
                    <button class="toggleFavBtn">${change} Favourites</button>
                    `;
            container.appendChild(newDiv);
}




// Funtion to show details of the selected movie

function showDetails(element){
    container.innerHTML=`
                        <div id="detailsCont">
                            <div id="heading">
                                <h2>Movie Details :</h2>
                            </div>
                            <div id="moviePoster">
                                <img src=${element.Poster}>
                            </div>
                            <div id="details">
                                <p>
                                    Title : ${element.Title} <br>
                                    Type : ${element.Type} <br>
                                    Year : ${element.Year} <br>
                                    imdbID : ${element.imdbID} <br>
                                </p>
                            </div>
            
                        </div>
                    `
}

