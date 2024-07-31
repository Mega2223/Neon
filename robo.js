//valores achados na tentativa e erro
//F = 8,51 B = 7,10

const MS = (3.14/4);

function clamp(min,max,num){
    return Math.min(Math.max(num,min),max);
}
var ste_KP = 0.5, ste_KI = .01, ste_KD = .5;

var ste_I = 0;
var dif_last = 0;

function control(left_sensor, right_sensor, speed) {
    
    var dif = right_sensor - left_sensor;
    var posDif = dif; if (dif < 0){posDif =-dif;}
    var bre = 0;
    var ste = 0;
    var eng = 0.0;
    
    var dec = (155.0 - speed)/155.0;
    eng = dec;
    
    ste = dif * ste_KP + ste_I * ste_KI + (dif - dif_last) * ste_KD;
    
    dif_last = dif;
    ste_I += dif;
    
    return {
        engineTorque: eng*5000,
        brakingTorque: bre,
        steeringAngle: ste * MS,
        log: [
            { name: 'Speed', value: speed, min: 0, max: 200 },
            { name: 'Left_sensor', value: left_sensor, min: 0, max: 1 },
            { name: 'Right_sensor', value: right_sensor, min: 0, max: 1 },
            { name: 'Engine Output', value: eng, min: 0, max: 1},
            { name: 'Steering Output', value: ste, min: -1, max: 1},
            { name: 'Dif', value: dif, min: -1, max: 1}
        ]
    };
}
