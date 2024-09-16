let dropdown = document.querySelectorAll('.dropdown select');
const fromCurrE1 = document.querySelector('.from select');
const toCurrE1 = document.querySelector('.To select');
const msg = document.querySelector('.msg');
let btn = document.querySelector('button');
const Amount = document.querySelector('.amount input');

for(let select of dropdown)
{
    for(list in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = list;
        newOption.value = list;
        select.append(newOption);
    }
    select.addEventListener('change', (event)=>{
        flagUpdate(event.target);
    });
};
const flagUpdate = (elem)=>{
    let currcode = elem.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = elem.parentElement.querySelector('img');
    img.src = newSrc;
}

const exchangeRate = async()=>{
    let fromcurr = fromCurrE1.value;
    let tocurr = toCurrE1.value;
    const response =await fetch (`https://open.exchangerate-api.com/v6/latest/${fromcurr}`);
    const data = await response.json();
    const rate = data.rates[tocurr];
    msg.innerHTML = Amount.value * rate+tocurr;
};

btn.addEventListener('click' , ()=>{
    exchangeRate();
})
