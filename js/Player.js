    //////////////////////////////////////////////////////////////////////////////////
    //      PLAYER  class that contain every transform particule position
    //////////////////////////////////////////////////////////////////////////////////
    var Player = function Player(params){
        var self = this;
        this.particulePosition;
        this.deltaTime=0;
        this.speedCoef = 1;
        this.intervalContener;
        this.rotationValue;
        var rotation =document.getElementById("rotationAuto");
        this.transitionAuto = document.getElementById("transitionAuto");
        var choiceParticulePosition = document.getElementById("selectParticulePos");
        var pX,pY,pZ;

        var intervalValue = 400;
        var optionsList=[];
        var autoIntervalAnimation;
        var currentPoint = {x: 0, y:0};
        var masterPoints = [{x: -50, y: -250}, {x:-250, y:50}, {x:150, y:50}];

        this.init = function(params){
            this.particulePosition = (params.particulesPos!==undefined)?params.particulesPos:choiceParticulePosition.value;

            choiceParticulePosition.setAttribute("onChange","player.CbUpdateSelect(this.value)");
            this.transitionAuto.setAttribute("onChange","player.CbUpdateCheckbox(this.checked,this.id)");
            rotation.setAttribute("onChange","player.CbUpdateCheckbox(this.checked,this.id)");
            this.rotationValue = rotation.checked;
            var domOptionList = choiceParticulePosition.options;
            for (var i=0;i<domOptionList.length;i++){
                optionsList.push(domOptionList[i].text);
            } 
            if(this.transitionAuto.checked){
                this.CbUpdateCheckbox(choiceParticulePosition.value);
            }
        }     


        this.CbUpdateCheckbox = function(value,id){
            if(id!=="rotationAuto"){
                if(value){
                    var nextAnim = optionsList[randomBorn(optionsList.length-1)];
                    while(nextAnim===choiceParticulePosition.value){
                        nextAnim = optionsList[randomBorn(optionsList.length-1)];
                    }
                    
                    autoIntervalAnimation = setInterval((function(){
                        var nextAnim = optionsList[randomBorn(optionsList.length-1)];
                        while(nextAnim===choiceParticulePosition.value){
                            nextAnim = optionsList[randomBorn(optionsList.length-1)];
                        }

                        this.CbUpdateSelect(nextAnim)}).bind(this),6000);
                }
                else{
                    clearInterval(autoIntervalAnimation);
                }
            }
            else{
                this.rotationValue = value;
            }
        }

        this.CbUpdateSelect = function(value){
            this.particulePosition = value;
            this.deltaTime=0;
            this.intervalContener = setInterval(makeLerp.bind(this,this.randomAvarage()),40);
        }
        this.randomAvarage = function(){

            var one=0;
            var zero=0;
            for (var x = 0; x<1000;x++){
            var random = Math.round(Math.random()*1);
                if(random===0){
                    zero+=1;
                }
                else if (random===1) {
                    one+=1;
                }
                else{
                    console.log(random,"OUT OF RANGE");
                }
            }
            zero = (zero*100)/1000;
            one = (one*100)/1000;
            return {avarage1:zero,avarage2:one}
        }
        var randomBorn = function(born){
            return Math.round(Math.random()*born)
        }

        this.vortex = function(p){
            pX = Math.sin(p)*p*1;
            pY = Math.cos(p)*-p*1;
            pZ = 0;
            return Vector3Wrapper(pX, pY, pZ);
        }
        
        this.vortex2 = function(p){
            pX = Math.cos(p*2)*-p;
            pY = p*Math.sin(2*p);
            pZ = 0;
            return Vector3Wrapper(pX, pY, pZ);
        }
        this.triangle = function(p){
            pX = p;
            pY = Math.cos(p)*-p*1;
            pZ = 0;
            return Vector3Wrapper(pX, pY, pZ);
        }

        this.flower = function(p){
            pX = Math.cos(p*2)*-p;
            pY = p;
            pZ = 0;
            return Vector3Wrapper(pX, pY, pZ);
        }
        this.plan = function(p){
            pX = Math.cos(p*2)*-p;
            pY = Math.cos(p*50)*-p;
            pZ = 0;
            return Vector3Wrapper(pX, pY, pZ);
        }
        this.inline = function(p){
            pX = p+10;
            pY = 0;
            pZ = 0;
            return Vector3Wrapper(pX, pY, pZ);
        }
        this.rosace = function(p){
            pX =  (Math.cos(p*5)*800) * Math.cos(p*2);
            pY = Math.sin(p*5)*800;
            pZ =  (Math.cos(p*5)*800) * Math.sin(p*2);
            return Vector3Wrapper(pX, pY, pZ);
        }
        this.eight = function(p){
            pX =  (Math.cos(p*5)*1000) * Math.cos(p*2);
            pY = (Math.sin(p*2)*1000);
            pZ =  (Math.cos(p*5)*1000) * Math.sin(p*2);
            return Vector3Wrapper(pX, pY, pZ);
        }
        this.triforce = function(p){
           var masterPoint = masterPoints[Math.floor(Math.random()*3)];
            currentPoint.x = (masterPoint.x + currentPoint.x)*0.5;
            currentPoint.y = (masterPoint.y + currentPoint.y)*0.5;
            return  Vector3Wrapper(currentPoint.x, currentPoint.y,0);
        }
        this.leaf = function(p){
            pX = 100 * (2 - Math.sin(-7 * p) - 0.5 * Math.cos(7 * p)) * Math.cos(p);
            pY = 100 * (2 - Math.sin(-7 * p) - 0.5 * Math.cos(7 * p)) * Math.sin(p);
            pZ = 0;
            return Vector3Wrapper(pX, pY, pZ);
        }
        var makeLerp = function makeLerp(randomChoice){
            // debugger
            // console.log(this.deltaTime)
            var choice = randomChoice;
            if(this.deltaTime <1){
                if(choice.avarage1>choice.avarage2){                
                    for (var i=0 ; i<particleSystem.geometry.vertices.length;i++)
                    {
                        // console.log(this[this.particulePosition](i),this.deltaTime);
                        particleSystem.geometry.vertices[i].lerp(this[this.particulePosition](i),this.deltaTime);
                    }
                }
                else {
                    for (var i=particleSystem.geometry.vertices.length-1 ; i>0;i--)
                    {
                        // console.log(this[this.particulePosition](i),this.deltaTime);
                        particleSystem.geometry.vertices[i].lerp(this[this.particulePosition](i),this.deltaTime);
                    }

                }
            }          
            else {
                clearInterval(this.intervalContener);
            }
        }

        function Vector3Wrapper(x,y,z){

            return new THREE.Vector3(x,y,z);
        }
        
        this.init(params);
    }