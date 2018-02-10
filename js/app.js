const triggers = document.querySelectorAll('.top_elements > li')
const background = document.querySelector('.dropDownBackground')
const nav = document.querySelector('.top')


console.log(triggers);


handleEnter = function(){

    //trigger-enter controls the display property.
    //we need it to show without any delay since 
    //getBoundingClientRect requires the element to be displayed 
    //in order to get the coorinates
    this.classList.add('trigger-enter')
    setTimeout(() => {
        if(this.classList.contains('trigger-enter')){
            this.classList.add('trigger-enter-active')
        }
    }, 150)
    background.classList.add('open')

    //creating dropDown here since there are 3 instances of it and we need to select the one attached with this.
    const dropDown = this.querySelector('.dropDown')
    const dropDownCoord = dropDown.getBoundingClientRect()
    const navCoords = nav.getBoundingClientRect()
    const coords = {
        height: dropDownCoord.height,
        width: dropDownCoord.width,
        top: dropDownCoord.top - navCoords.top,     
        left: dropDownCoord.left - navCoords.left
        //offsetting the top and left since the coords we obtain are relative to the parent
        //and if there is something above the nav positioning will be off by that length
    }    
    background.style.setProperty('width', `${coords.width}px`)
    background.style.setProperty('height', `${coords.height}px`)
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
}

handleLeave = function(){
   this.classList.remove('trigger-enter', 'trigger-enter-active')
   background.classList.remove('open')
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter',handleEnter))
triggers.forEach(trigger => trigger.addEventListener('mouseleave',handleLeave))

