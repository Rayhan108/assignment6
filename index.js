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

//  fetch details API for modal

const aiDetails =id=>{
    const URL =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        displaySingleAiDetails(data.data)
    });
}
// display modal
const displaySingleAiDetails=(singleAi)=>{
    console.log(singleAi);
    const {description,pricing,features,integrations,input_output_examples,image_link,accuracy} =singleAi;

    const modalInfo = document.getElementById('modal');
   const modalDetails=`
   
      <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div  class="flex p-5 m-5 py-5 gap-10 ">
        <div class="bg-red-50 py-5 px-5">
    
            <h1 class="font-bold text-2xl">${description}</h1>
            <div class="flex gap-5  overflow-hidden ">
                 
                <div  class="modal-body  shadow-xl py-10"><p >${pricing?pricing[0].price:"free of cost"}/<br>${pricing?pricing[0].plan:"Basic"}</p></div>
                <div  class="modal-body  shadow-xl py-10"><p >${pricing?pricing[1].price:"free of cost"}/<br>${pricing?pricing[1].plan:"Pro"}</p></div>
                <div class="modal-body  shadow-xl py-10"><p  >${pricing?pricing[2].price :"free of cost"}/<br>${pricing?pricing[2].plan:"Enterprice"}</p></div>
            </div>
            <div class="flex gap-10 ">
                <div>
                
                    <h1 class="text-2xl font-bold mb-5 mt-5">Features</h1>
                    <ul id="features-container"></ul>
                    
                    <li>${features[1]?features[1].feature_name:"no data found"}</li>
                    <li>${features[2]?features[2].feature_name:"no data found"}</li>
                    <li>${features[3]?features[3].feature_name:"no data found"}</li>
                </div>
                <div>
                    <h1 class="text-2xl font-bold mb-5 mt-5">Integrations</h1>
                    <li>${integrations ?integrations[0]:"no data found"}</li>
                    <li>${integrations ?integrations[1]:"no data found"}</li>
                    <li>${integrations ?integrations[2]:"no data found"}</li>
               
                 
                </div>
            </div>
        </div>
        <div>
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img  src="${image_link?image_link[0]:"no image found"}" class="rounded-xl"/>
          <div id="badge" class="badge badge-secondary hidden">${accuracy.score*100}%accuracy</div>
          

        </figure>
        <div class="card-body items-center text-center">
        <h1 class="text-xl font-semibold ">${input_output_examples?input_output_examples[0].input:"Can you give any example?"}</h1>
        <p>${input_output_examples?input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
          
        </div>
      </div>
        </div>
    </div>
     
</div>
    `;
    modalInfo.innerHTML=modalDetails;
// accuracy condition
    const badge=document.getElementById('badge');
    if(accuracy.score=== null){
        badge.classList.add('hidden');
    }else{
        badge.classList.remove('hidden');
    }

    // const featuresContainer = document.getElementById('features-container');
    // const FeatureList =features.forin(featureData=>{
    //     console.log(featureData);
    // })
   
}


loadAllAi(6);


