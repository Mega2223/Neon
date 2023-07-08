//valores achados na tentativa e erro
//F = 8,54 B =7,36

const FAST = 3000;
const SHL = 127;
const SH = 123;
const SM = 117;
const SL = 105;
const SVL = 60;

var LSC = 0;

function control(left_sensor, right_sensor, speed) {
    
    var dif = right_sensor - left_sensor;
    var posDif = dif; if (dif < 0){posDif =-dif;}
    var bre = 0;
    var ste = 0;
    
    var maxSteering = ((1/speed)*125)*(3.14/4)*0.25; //pro robô não sair rolando nas curvas
    
    ste += dif/5.75;
    if(ste > maxSteering){ste = maxSteering;}
    else if(ste < -maxSteering){ste = -maxSteering;}
    
    var eng = FAST - (posDif*5000);
    
    if (speed > SM) {eng -= 450;}
    if (speed > SM && posDif >= .25) {eng -= 500;}
    if (speed > SM && posDif >= .5) {eng -= 600;}
    
    if (speed > SH) {eng -= 1750;}
    
    if(posDif >= .3){LSC = 0;}
    LSC+=1;
    
    //ritual que me faz ganhar tempo
    var cIn = (7500-(LSC*165));
    if(cIn < -500){cIn = -500;}
    if (LSC > 10){
        eng += cIn;
        console.log(LSC + " : " + cIn);
    }
    //if(LSC > 20){console.log(LSC);}
    
    if (speed < SL) {eng = FAST;}
    if (speed < SVL) {eng = FAST+1500;}
    if (speed > SHL) {eng=100;}
   
    return {
        engineTorque: eng,
        brakingTorque: bre,
        steeringAngle: ste,
        log: [
            { name: 'Speed', value: speed, min: 0, max: 200 },
            { name: 'Left_sensor', value: left_sensor, min: 0, max: 1 },
            { name: 'Right_sensor', value: right_sensor, min: 0, max: 1 },
            { name: 'Engine Output', value: eng, min: 0, max: FAST+2100},
            { name: 'LSC', value: cIn, min: 0, max: 10000}
          
        ]
    };
}
