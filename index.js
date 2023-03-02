
let fetchdata=[];
const loadAllAi=(dataLimit)=>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res=>res.json())
    .then(data=>{

        fetchdata=data.data.tools;
        showAllAi(data.data.tools,dataLimit);
    });
}
const showAllAi=(data,dataLimit)=>{
    // spiner start
    toggleLoader(true)
    // console.log(dataLimit);
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
        // console.log(allAi);
        const {image,features,published_in,name,id}= allAi;
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
        
        <label for="my-modal-3" ><i onclick="aiDetails('${id}')" for="my-modal-3" class="fa-solid fa-arrow-right"></i></label>
        </div>
        </div>
        `
        aiContainer.appendChild(div);
        // spiner end
        toggleLoader(false);
    });

}
const showAllAiTogether=()=>{
    showAllAi(fetchdata);
   
}
//  spinner-------------------------------
const loader = document.getElementById('loader');
 const toggleLoader =isloading=>{
    if(isloading){
loader.classList.remove('hidden')
    }else{
        loader.classList.add('hidden');
    }
 }

//  fetch details API

const aiDetails =id=>{
    const URL =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(URL)
    .then(res=>res.json())
    .then(data=>displaySingleAiDetails(data.data));
}
const displaySingleAiDetails=(singleAi)=>{
    console.log(singleAi);
    const {description,pricing,features,integrations,input_output_examples,image_link} =singleAi;
    const container = document.getElementById("modal-info");
    const div = document.createElement("div");
    div.classList.add("modal");
    div.innerHTML = `
    
    <div class="modal-box relative">
    <label
      for="my-modal-3"
      class="btn btn-sm btn-circle absolute right-2 top-2"
      >✕</label
    >
    <div class="flex">
    <div>
    <p>${description}</p>
    <h2 class="card-title text-2xl">Feature</h2>
    <p></p>
    <p class="mb-5"></p>
    <hr class="mb-3">
    <div class="flex justify-between ">
    <div> 
     <h2 class="card-title text-2xl mb-3"></h2>
    <i class="fa-sharp fa-regular fa-calendar-days text-sm"></i>
    </div>
    </div>
    <div>
    <figure><img src="${image_link[0]}"/></figure>
    </div>
</div>

  </div>
    `;
    container.appendChild(div);
 
   
}


loadAllAi(6);