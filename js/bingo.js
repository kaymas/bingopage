(function(){
    
    let Bingo = []
    for(var i = 1; i < 90; i++){
        Bingo.push(('0' + i).slice(-2));
    }
    // console.log(Bingo);

    let results = [];
    let isPlaying = false;

    
    let bingoNum = 0;
    let delArrayNum = 0;

    
    let panelLeft = document.getElementsByClassName('panel_left')[0];
    let panelRight = document.getElementsByClassName('panel_right')[0];
    let spinButton = document.getElementsByClassName('spin_button')[0];
    let result = document.getElementById('result');    

    let renderBingo = function(){
        let fragment = document.createDocumentFragment();
        let divWrapper;
        Bingo.forEach((ele, index) => {
            if(index % 15 === 0){
                divWrapper = document.createElement('div')
                divWrapper.className = 'bingo_wrapper';
                fragment.appendChild(divWrapper);
            }
            let numDiv = document.createElement('div');
            numDiv.className = 'bingo';
            numDiv.innerHTML = ele;
            divWrapper.appendChild(numDiv);
        });
        result.appendChild(fragment);
    }
    renderBingo();

    spinButton.addEventListener('click', function(){
        if(isPlaying) return;

        isPlaying = true;
        this.classList.add('inactive');
        setTimeout(endSlot, 2000);
        runSlot(0, panelLeft);
        runSlot(1, panelRight);
        
    });

    let runSlot = function(n, panel){
        if(!isPlaying) return;
        let num = Bingo[Math.floor(Math.random() * Bingo.length)];
        bingoNum = num;

        let numLeft = num.substr(0,1);
        let numRight = num.substr(1,2);

        panelLeft.innerHTML = numLeft;
        panelRight.innerHTML = numRight;
        setTimeout(function() {
            runSlot(n, panel)
        }, 25);
    }

    let endSlot = function(){
        isPlaying = false;
        spinButton.classList.remove('inactive');
        delArrayNum = Bingo.indexOf(bingoNum);
        if(delArrayNum >= 0){
            // Delete from Bingo array
            Bingo.splice(delArrayNum,1);
        }
        let bingoDiv = document.querySelectorAll(".bingo");
        bingoDiv[bingoNum-1].classList.add('matched');        

        
    }

})();