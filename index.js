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
        const {image}=allAi;
        const div = document.createElement('div');
        div.classList.add('card-body');
        div.innerHTML=`
    <figure><img src="${image}"/></figure>
        <h2 class="card-title"></h2>
        <p></p>
      
   
        `
        aiContainer.appendChild(div);
    });



}
loadAllAi();