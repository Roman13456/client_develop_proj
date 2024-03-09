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
elemsInOrder.insertAdjacentHTML("afterbegin",`
    <div class="item">
    <img class='chosen' id='${randomElement.name}' src='${randomElement.img}'>
    <div style='display: flex;justify-content: center;'>
        <button class='removeFromOrderBtn'><img src='images/cross.png'></button>
    <div>
    </div>
`)



elemsContainer.addEventListener("click", function(e){
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
})

elemsInOrder.addEventListener("click", function(e){
    
    const clickedElemCell = e.target.closest('.item');
    const clickedRemoveBtn = e.target.closest('.removeFromOrderBtn');
    if(clickedRemoveBtn){    
        clickedElemCell.remove()
        chosenElemsCount--
        if(!chosenElemsCount && document.getElementById ('popup')){
            document.getElementById ('popup').remove()
        }
    }else if(clickedElemCell){
        elemsInOrder.querySelectorAll('.item img').forEach(e=>{
            e.classList.remove('chosen')
        })
        clickedElemCell.querySelector('img').classList.add('chosen')
    }
})

shuffledElements.forEach(e=>{
    const element = document.createElement('div')
    element.classList.add('elemCell')
    element.innerHTML = `<img class='clickableElemIcon' id='${e.name}' src='${e.img}'>`
    elemsContainer.append(element)
})















function addAfterElement(obj){
    if(!(Array.from(document.querySelectorAll('.elemsInOrder .item>img')).find(e=>e.getAttribute('id')===obj.name))){
        const alreadyChosenElement = document.querySelector('.elemsInOrder .item .chosen')
        elemsInOrder.querySelectorAll('.item img').forEach(e=>{
            e.classList.remove('chosen')
        })
        const newElement = document.createElement('div')
            newElement.classList.add('item')
            newElement.insertAdjacentHTML('afterbegin',`
                <img id='${obj.name}' class='chosen' src='${obj.img}'>
                <div style='display: flex;justify-content: center;'>
                    <button class='removeFromOrderBtn'><img src='images/cross.png'></button>
                <div>
            `)
        if(alreadyChosenElement){
            alreadyChosenElement.closest('.item').after(newElement)
            chosenElemsCount++
        }else if(chosenElemsCount===0){
            elemsInOrder.append(newElement)
            chosenElemsCount++
        }
        
    }
}
function addBeforeElement(obj){
    if(!(Array.from(document.querySelectorAll('.elemsInOrder .item>img')).find(e=>e.getAttribute('id')===obj.name))){
        const alreadyChosenElement = document.querySelector('.elemsInOrder .item .chosen')
        elemsInOrder.querySelectorAll('.item img').forEach(e=>{
            e.classList.remove('chosen')
        })
        const newElement = document.createElement('div')
            newElement.classList.add('item')
            newElement.insertAdjacentHTML('afterbegin',`
                <img id='${obj.name}' class='chosen' src='${obj.img}'>
                <div style='display: flex;justify-content: center;'>
                    <button class='removeFromOrderBtn'><img src='images/cross.png'></button>
                <div>
            `)
        if(alreadyChosenElement){
            alreadyChosenElement.closest('.item').before(newElement)
            chosenElemsCount++
        }else if(chosenElemsCount===0){
            elemsInOrder.prepend(newElement)
            chosenElemsCount++
        }
        
    }
}
function replace(obj){
    if(!(Array.from(document.querySelectorAll('.elemsInOrder .item>img')).find(e=>e.getAttribute('id')===obj.name))){
        const alreadyChosenElement = document.querySelector('.elemsInOrder .item .chosen')
        if(alreadyChosenElement){
            const newElement = document.createElement('div')
            newElement.classList.add('item')
            newElement.insertAdjacentHTML('afterbegin',`
                <img id='${obj.name}' class='chosen' src='${obj.img}'>
                <div style='display: flex;justify-content: center;'>
                    <button class='removeFromOrderBtn'><img src='images/cross.png'></button>
                <div>
            `)
            alreadyChosenElement.closest('.item').replaceWith(newElement)
        }
    }
}

document.addEventListener('click', function(event) {
    if(!event.target.classList.contains('clickableElemIcon')){
        document.querySelectorAll('#popup').forEach(e=>e.remove())
    }
});
getQuizResult.addEventListener('click',function(){
    if(chosenElemsCount!==7){
        alert('You have to pick all 7 elements to get results')
    }else{
        const userAnswer = Array.from(document.querySelectorAll('.elemsInOrder .item>img'))
        let counter = 0
        userAnswer.forEach((e,idx)=>{
            if (e.getAttribute('id')===genshinElements[idx].name){
                counter++
            }
        })
        alert(`Your score is ${counter}/7`)
        location.reload();
}
})
