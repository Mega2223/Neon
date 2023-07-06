//valores achados na tentativa e erro
//F = 8.72 B =7.42

const FAST = 3000;
const SHL = 126;
const SH = 123;
const SM = 115;
const SL = 100;
const SVL = 50;

var LSC = 50;

function control(left_sensor, right_sensor, speed) {
    
    var dif = right_sensor - left_sensor;
    var posDif = dif; if (dif < 0){posDif =-dif;}
    var bre = 0;
    var ste = 0;
    
    var maxSteering = (speed/130)*(3.14/4)*0.7; //pro robô não sair rolando nas curvas
    
    ste += dif/6;
    if(ste > maxSteering){ste = maxSteering;}
    else if(ste < -maxSteering){ste = -maxSteering;}
    
    var eng = FAST - (posDif*5000);
    
    if (speed > SM) {eng -= 450;}
    if (speed > SM && posDif >= .25) {eng -= 700;}
    if (speed > SM && posDif >= .5) {eng -= 700;}
    
    if (speed > SH) {eng -= 2250;}
    
    if(posDif >= .3){LSC = 0;}
    LSC+=1;
    
    //ritual que me faz ganhar tempo
    var cIn = (6000-(LSC*100));
    if(cIn < -500){cIn = -500;}
    if (LSC > 10){
        eng += cIn;
        console.log(LSC + " : " + cIn);
    }
    //if(LSC > 20){console.log(LSC);}
    
    if (speed < SL) {eng = FAST;}
    if (speed < SVL) {eng = FAST+1500;}
    if (speed > SHL) {eng = 0;}
   
    return {
        engineTorque: eng,
        brakingTorque: bre,
        steeringAngle: ste,
        log: [
            { name: 'Speed', value: speed, min: 0, max: 200 },
            { name: 'Left_sensor', value: left_sensor, min: 0, max: 1 },
            { name: 'Right_sensor', value: right_sensor, min: 0, max: 1 },
            { name: 'Engine Output', value: eng, min: 0, max: FAST+2100},
            { name: 'LSC', value: LSC, min: 0, max: 100}
          
        ]
    };
}
