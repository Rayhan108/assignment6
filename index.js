const loadAllAi=()=>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res=>res.json())
    .then(data=>showAllAi(data.data.tools));
}
const showAllAi=data=>{
    // console.log(data);
    const aiContainer = document.getElementById('ai-container');
    data.forEach(allAi =>{
        console.log(allAi);
        const {image,features,published_in,name        }=allAi;
        const div = document.createElement('div');

        div.classList.add('card-body');
        div.innerHTML=`
    <figure><img src="${image}"/></figure>
        <h2 class="card-title text-2xl">Feature</h2>
        <p>1.${features[0]?features[0]:"No Data Found"}</p>
        <p>2.${features[1]?features[1]:"No Data Found"}</p>
        <p class="mb-5">3.${features[2]?features[2]:"No Data Found"}</p>
        <hr class="mb-3">
        <div class="flex justify-between ">
        <div> 
         <h2 class="card-title text-2xl mb-3">${name}</h2>
        <i class="fa-sharp fa-regular fa-calendar-days text-sm">${'  '+published_in}</i>
        </div>
        <div class="mt-5">
        <i class="fa-solid fa-arrow-right"></i>
        </div>
        </div>
      
      
   
        `
        aiContainer.appendChild(div);
    });



}
loadAllAi();