//valores achados na tentativa e erro
//F = 8,51 B = 7,10

const MS = (3.14/4);

function clamp(min,max,num){
    return Math.min(Math.max(num,min),max);
}

function control(left_sensor, right_sensor, speed) {
    
    var dif = right_sensor - left_sensor;
    var posDif = dif; if (dif < 0){posDif =-dif;}
    var bre = 0;
    var ste = 0;
    var eng = 0.0;
    
    var dec = (160.0 - speed)/160.0;
    //console.log(dec);
    eng = dec;
    ste = (dif/2);
    
   
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
