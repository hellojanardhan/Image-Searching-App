const accessKey="PxlYpfcoO7VhmENT8L_uLvSOwUuB8SUi11Iuzp0DNBI"
//Accessing the  elements
const fromEle=document.querySelector('form');

const inputEle=document.getElementById('search-input');

const searchResults=document.querySelector('.search-results');

const showMore=document.getElementById("show-more-button");
//inputdata before search box
let inputData="";
//default pageNumber
let pageNumber=1;
//we have to response the page,then we have  to use await and async
async function searchImage(){
    //getting the input value from inputEle

    inputData=inputEle.value;
    //creating the dynamic url
    const url=`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputData}&client_id=${accessKey}`;
    //getting all urls data
    const response=await fetch(url);
//all data stored data convert into json file
    const data=await response.json();
    //from that data,we store the results in results variable
    const results=data.results;

    if(pageNumber==1){
        searchResults.innerHTML="";
    }
    results.map((result)=>{
        //this is image-container
       const imageWrapper= document.createElement('div');
       imageWrapper.classList.add("search-result");
       const image=document.createElement('img');

       image.src=result.alt_description

       const imageLink=document.createElement('a');
       imageLink.href=result.link.html;
       imageLink.target="_blank";
       imageLink.textContent=result.alt_description;

       imageWrapper.appendChild(image);

       imageWrapper.append(imageLink);

       imageWrapper.append(imageWrapper);
    });
    pageNumber++;
    if(pageNumber>1){
        showMore.style.display="block";
    }

 }
 //default page 
 fromEle.addEventListener('submit',(event)=>{
    event.preventDefault();
    pageNumber=1;
    searchImage();
 })
 //searching more iimages
 showMore.addEventListener('click',()=>{
    searchImage();
 })