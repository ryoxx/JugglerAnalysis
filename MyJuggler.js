
function getMachineName() {
    return "マイジャグラー";
}

//事前確率
function getPriorProb() {
    return [
        1.0 / 6,
        1.0 / 6,
        1.0 / 6,
        1.0 / 6,
        1.0 / 6,
        1.0 / 6
    ];
}

//各設定毎のBIG確率
function getBigProb() {
    return [
        1.0 / 273.1,
        1.0 / 269.7,
        1.0 / 269.7,
        1.0 / 259.0,
        1.0 / 259.0,
        1.0 / 255.0
    ];
}
//各設定毎のREG確率
function getRegProb() {
    return [
        1.0 / 439.8,
        1.0 / 399.6,
        1.0 / 331.0,
        1.0 / 315.1,
        1.0 / 255.0,
        1.0 / 255.0
    ];
}
//各設定毎の機械割
function getReturn() {
    return [
        0.970,
        0.980,
        0.995,
        1.011,
        1.033,
        1.055
    ];
}