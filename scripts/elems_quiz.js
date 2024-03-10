const elemsContainer = document.querySelector(".elemsContainer")
const elemsInOrder = document.querySelector(".elemsInOrder")
const getQuizResult = document.querySelector('.getQuizResult')
let chosenElemsCount = 1
const genshinElements = [
    {
        img:'elementIcons/anemo.png',
        name: 'anemo'
    },
    {
        img:'elementIcons/geo.png',
        name: 'geo'
    },
    {
        img:'elementIcons/electro.png',
        name: 'electro'
    },
    {
        img:'elementIcons/dendro.png',
        name: 'dendro'
    },
    {
        img:'elementIcons/hydro.png',
        name: 'hydro'
    },
    {
        img:'elementIcons/pyro.png',
        name: 'pyro'
    },
    {
        img:'elementIcons/cryo.png',
        name: 'cryo'
    },
]
const shuffledElements = [...genshinElements]
function shuffleArray(array) {
    let len = array.length,
        currentIndex;
    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
        let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
        var temp = array[currentIndex];
        array[currentIndex] = array[randIndex];
        array[randIndex] = temp;
    }
}
shuffleArray(shuffledElements)

const randomElement = genshinElements[Math.floor(Math.random() * genshinElements.length)]
elemsInOrder.insertAdjacentElement("afterbegin",retOrderItem(randomElement.name,randomElement.img))

function retOrderItem(name,img,chosen='true'){
    const newElement = document.createElement('div')
    newElement.classList.add('item')
    newElement.classList.add(`${chosen?'chosen':''}`)
    newElement.setAttribute("data-name",name)
    newElement.insertAdjacentHTML('afterbegin',`<img src='${img}'>
    <div style='display: flex;justify-content: center;'>
        <button class='removeFromOrderBtn'><img src='images/cross.png'></button>
    <div>`)
    return newElement
}



elemsContainer.addEventListener("click", elemsContainerHandler)
function elemsContainerHandler(e){
    const clickedElemCell = e.target.closest('.elemCell');
    if(e.target.classList.contains('clickableElemIcon')){    
        if(chosenElemsCount===0){
            addAfterElement(genshinElements.find(e=>e.name === clickedElemCell.querySelector('img').getAttribute('id')))
        }else{
            document.querySelectorAll('#popup').forEach(e=>e.remove())
            clickedElemCell.insertAdjacentHTML('afterbegin',`
            <div id='popup'>
                <button class='before'>insert before</button> 
                <button class='after'>insert after</button>
                <button class='replace'>replace</button>
            </div>
        `)
        }
    }
    const clickedPopup = e.target.closest('#popup');
    if(clickedPopup){
        if(e.target.classList.contains('before')){
            addBeforeElement(genshinElements.find(e=>e.name === clickedElemCell.querySelector('img').getAttribute('id')))
        }else if(e.target.classList.contains('after')){
            addAfterElement(genshinElements.find(e=>e.name === clickedElemCell.querySelector('img').getAttribute('id')))
        }else if(e.target.classList.contains('replace')){
            replace(genshinElements.find(e=>e.name === clickedElemCell.querySelector('img').getAttribute('id')))
        }
    }
}

elemsInOrder.onclick = elemsInOrderHandler
function elemsInOrderHandler(event){
    const clickedElemItem = event.target.closest('.item');
    const clickedRemoveBtn = event.target.closest('.removeFromOrderBtn');
    if(clickedRemoveBtn){    
        clickedElemItem.remove()
        chosenElemsCount--
        if(!chosenElemsCount && document.getElementById ('popup')){//if popup is opened and after remove there is nothing in order - clear it
            document.getElementById ('popup').remove()
        }
    }else if(clickedElemItem){
        clearAllChosenItems()
        clickedElemItem.classList.add('chosen')
    }
}

shuffledElements.forEach(e=>{
    const element = document.createElement('div')
    element.classList.add('elemCell')
    element.innerHTML = `<img class='clickableElemIcon' id='${e.name}' src='${e.img}'>`
    elemsContainer.append(element)
})

function addAfterElement(obj){
    if(isElementAlreadyUsed(obj)===-1){
        const alreadyChosenElement = document.querySelector('.elemsInOrder .item.chosen')
        clearAllChosenItems()
        if(alreadyChosenElement){
            alreadyChosenElement.after(retOrderItem(obj.name,obj.img))
            chosenElemsCount++
        }else if(chosenElemsCount===0){
            elemsInOrder.append(retOrderItem(obj.name,obj.img))
            chosenElemsCount++
        }
        
    }
}
function addBeforeElement(obj){
    if(isElementAlreadyUsed(obj)===-1){
        const alreadyChosenElement = document.querySelector('.elemsInOrder .item.chosen')
        clearAllChosenItems()
        if(alreadyChosenElement){
            alreadyChosenElement.before(retOrderItem(obj.name,obj.img))
            chosenElemsCount++
        }else if(chosenElemsCount===0){
            elemsInOrder.prepend(retOrderItem(obj.name,obj.img))
            chosenElemsCount++
        }
        
    }
}
function replace(obj){
    if(isElementAlreadyUsed(obj)===-1){
        const alreadyChosenElement = document.querySelector('.elemsInOrder .item.chosen')
        clearAllChosenItems()
        if(alreadyChosenElement){
            alreadyChosenElement.replaceWith((retOrderItem(obj.name,obj.img)))
        }
    }
}

document.addEventListener('click',  {
    handleEvent(event) {
        console.log(event.currentTarget)
        if(!event.target.classList.contains('clickableElemIcon')){
            document.querySelectorAll('#popup').forEach(e=>e.remove())
        }
    }
});
getQuizResult.addEventListener('click',function(){
    if(chosenElemsCount!==7){
        alert('You have to pick all 7 elements to get results')
    }else{
        const userAnswer = Array.from(document.querySelectorAll('.elemsInOrder .item'))
        let counter = 0
        userAnswer.forEach((e,idx)=>{
            if (e.dataset.name===genshinElements[idx].name){
                counter++
            }
        })
        alert(`Your score is ${counter}/7`)
        elemsContainer.removeEventListener('click', elemsContainerHandler) 
        location.reload();
}
})


function  clearAllChosenItems(){
    elemsInOrder.querySelectorAll('.item').forEach(event=>{
        event.classList.remove('chosen')
    })
}
function  isElementAlreadyUsed(obj){
    return (Array.from(document.querySelectorAll('.elemsInOrder .item')).findIndex(e=>e.dataset.name===obj.name))
}
