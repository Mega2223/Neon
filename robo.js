//valores achados na tentativa e erro

const FAST = 3000;
const SH = 127;
const SM = 115;
const SL = 107;

function control(left_sensor, right_sensor, speed) {
    
    var dif = right_sensor - left_sensor;
    var posDif = dif; if (dif < 0){posDif =-dif;}
    var bre = 0;
    var ste = 0;
    
    var maxSteering = (speed/130)*(3.14/4)*0.625; //pro robô não sair rolando nas curvas
    
    ste += dif/6;
    if(ste > maxSteering){ste = maxSteering;}
    else if(ste < -maxSteering){ste = -maxSteering;}
    
    var eng = FAST - (posDif*5000);
    
    if (speed > SM) {eng -= 450;}
    if (speed > SM && posDif >= .25) {eng -= 750;}
    if (speed > SH) {eng -= 1500;}
    if (speed < SL) {eng = FAST;}
    
    return {
        engineTorque: eng,
        brakingTorque: bre,
        steeringAngle: ste,
        log: [
            { name: 'Speed', value: speed, min: 0, max: 200 },
            { name: 'Left_sensor', value: left_sensor, min: 0, max: 1 },
            { name: 'Right_sensor', value: right_sensor, min: 0, max: 1 },
            { name: 'Engine Output', value: eng, min: 0, max: FAST+100}
          
        ]
    };
}
