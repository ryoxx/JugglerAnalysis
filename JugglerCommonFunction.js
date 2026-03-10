
function clearTextBox() {
    document.getElementById("total").value = "1";
    document.getElementById("big").value = "0";
    document.getElementById("reg").value = "0";
    document.getElementById("text_area").value = "";
}
function addCnt(name, num) {
    let element = document.getElementById(name);
    let val = parseInt(element.value) + num;
    if (val < 0) val = 0;
    element.value = val;
}
function calcFactorial(num) {
    if (num == 1) {
        return 1;
    } else {
        return num * calcFactorial(num - 1);
    }
}
function calcCombination(n, k) {
    if (n < 0) return -1;
    if (k < 0) return -1;
    if (n - k < 0) return -1;
    //自明な条件の場合
    if (n == k) return 1;
    if (k == 0) return 1;
    return (n - k + 1) / k * calcCombination(n, k - 1);
}
function calcBinomialDistribution(n, k, p) {
    let a = calcCombination(n, k);
    let b = Math.pow(p, k);
    let c = Math.pow((1.0 - p), n - k);
    return calcCombination(n, k) * Math.pow(p, k) * Math.pow((1.0 - p), n - k);
}
function getSttingProb(array_prior, array_big, array_reg, num_total_cnt, num_big_cnt, num_reg_cnt) {

    //個別確率
    let each_prob = Array(6);
    for (let i = 0; i < 6; i++) {
        each_prob[i] = array_prior[i]
            * calcBinomialDistribution(num_total_cnt, num_big_cnt, array_big[i])
            * calcBinomialDistribution(num_total_cnt, num_reg_cnt, array_reg[i]);
    }

    //周辺確率
    let marginal_prob = 0.0;
    for (let i = 0; i < 6; i++) {
        marginal_prob += each_prob[i];
    }

    //設定確率
    let setting_prob = Array(6);
    for (let i = 0; i < 6; i++) {
        setting_prob[i] = each_prob[i] / marginal_prob;
    }
    return setting_prob;
}
function getRetuenEstimation(array_setting_prob, array_return) {
    let ans = 0.0;
    for (let i = 0; i < 6; i++) {
        ans += array_setting_prob[i] * array_return[i];
    }
    return ans;
}
function calcEstimation() {
    //let element_title = document.querySelector("#wrap_machine_name");
    //element_title.insertAdjacentHTML("afterend", getMachineName());
    //element_title.insertAdjacentHTML("beforebegin", "<div>--beforebegin--</div>");
    //element_title.insertAdjacentHTML("afterbegin", "<div>--afterbegin--</div>");
    //element_title.insertAdjacentHTML("beforeend", "<div>--beforeend--</div>");
    //element_title.insertAdjacentHTML("afterend", "<div>--afterend--</div>");

    //テキストボックスのエレメント取得
    let element_total = document.getElementById("total");
    let element_big = document.getElementById("big");
    let element_reg = document.getElementById("reg");
    let element_text_area = document.getElementById("text_area");

    //各種の回数を取得
    let num_total_cnt = parseInt(element_total.value);
    let num_big_cnt = parseInt(element_big.value);
    let num_reg_cnt = parseInt(element_reg.value);

    //エラー処理
    if (num_total_cnt < num_big_cnt) {
        element_text_area.value = "ERROR (総回転数>BIG回数)";
        return;
    }
    if (num_total_cnt < num_reg_cnt) {
        element_text_area.value = "ERROR (総回転数>REG回数)";
        return;
    }

    //各種確率値の取得
    const array_prior = getPriorProb();
    const array_big = getBigProb();
    const array_reg = getRegProb();
    const array_return = getReturn();

    //設定確率の算出
    const array_setting_prob = getSttingProb(array_prior, array_big, array_reg, num_total_cnt, num_big_cnt, num_reg_cnt);

    //出玉率の推定
    const return_est = getRetuenEstimation(array_setting_prob, array_return);

    //解析結果の表示
    element_text_area.value = "";
    element_text_area.value += getMachineName()+"\n";
    for (let i = 0; i < 6; i++) {
        element_text_area.value = element_text_area.value + "設定" + (i + 1) + " : ";
        element_text_area.value = element_text_area.value + (array_setting_prob[i] * 100).toFixed(2) + "%\n";
    }
    element_text_area.value = element_text_area.value + "出玉率 : " + (return_est * 100).toFixed(2) + "%";
}