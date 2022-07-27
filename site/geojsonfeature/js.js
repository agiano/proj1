const geoBtn = document.getElementById("geoBtn");
const textBox = document.getElementById("textbox");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input2_1 = document.getElementById("input2.1");
const input2_2 = document.getElementById("input2.2");
const input2_3 = document.getElementById("input2.3");
const input2_4 = document.getElementById("input2.4");
const input3 = document.getElementById("input3");
const input4 = document.getElementById("input4");
const input5 = document.getElementById("input5");
const input6 = document.getElementById("input6");
const input7 = document.getElementById("input7");

let input2val = input2.value;
let input2_1val = input2_1.value;
let input2_2val = input2_2.value;
let input2_3val = input2_3.value;
let input2_4val = input2_4.value;

geoBtn.addEventListener("click", function (e) {
  input2val = input2.value;
  input2_1val = input2_1.value;
  input2_2val = input2_2.value;
  input2_3val = input2_3.value;
  input2_4val = input2_4.value;
  if (input2_1.value !== "") {
    input2val = input2.value + ",";
  }
  if (input2_2.value !== "") {
    input2_1val = input2_1.value + ",";
  }
  if (input2_3.value !== "") {
    input2_2val = input2_2.value + ",";
  }
  if (input2_4.value !== "") {
    input2_3val = input2_3.value + ",";
  }

  const coords =
    input2val + input2_1val + input2_2val + input2_3val + input2_4val;
  console.log(coords);
  const text1 = '{"type":"Feature","geometry":{"type":"';
  const text2 = '","coordinates":[';
  const text3 = ']},"properties":{"geo_id":';
  const text4 = ',"name_id":';
  const text5 = ',"name":"';
  const text6 = '","start_date":"';
  const text7 = '","end_date": "';
  const text8 = '"}}';

  textBox.value =
    text1 +
    input1.value +
    text2 +
    coords +
    text3 +
    input3.value +
    text4 +
    input4.value +
    text5 +
    input5.value +
    text6 +
    input6.value +
    text7 +
    input7.value +
    text8;
});
