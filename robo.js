//valores achados na tentativa e erro
//F = 8,51 B = 7,10

const MS = (3.14/4);
const HIGH_S = 180.0;
const LOW_S = 140.0;

function clamp(min,max,num){
    return Math.min(Math.max(num,min),max);
}
var ste_KP = 0.6, ste_KI = .000, ste_KD = 0.9;

var ste_I = 0;
var dif_last = 0;

function control(left_sensor, right_sensor, speed) {
    
    var dif = right_sensor - left_sensor;
    var posDif = dif; if (dif < 0){posDif =-dif;}
    var bre = 0;
    var ste = 0;
    var eng = 0.0;
    
    var weight = dif > 0 ? dif : -dif;
    var target = (LOW_S*weight + HIGH_S*(1-weight));
    eng = (target - speed)/(target);
    
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
