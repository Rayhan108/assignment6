let fetchdata=[];
const loadAllAi=(dataLimit)=>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res=>res.json())
    .then(data=>{

        fetchdata=data.data.tools;
        // showAllAi(data.data.tools.slice(0,6),dataLimit);
        showAllAi(data.data.tools,dataLimit);
    });
}
const showAllAi=(data,dataLimit)=>{
    console.log(dataLimit);
    const aiContainer = document.getElementById('ai-container');
    aiContainer.innerHTML='';
    const showMore = document.getElementById('showMore')
    if(dataLimit &&  data.length > 6){
        
        data=data.slice(0,6);
        showMore.classList.remove('hidden')
    }else{
        showMore.classList.add('hidden');
    }
    data.forEach(allAi =>{
        console.log(allAi);
        const {image,features,published_in,name}= allAi;
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
const showAllAiTogether=()=>{
    showAllAi(fetchdata);
   
}


loadAllAi(6);