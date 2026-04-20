const currencySelects = document.querySelectorAll('.currency-select');
const fromCurrE1 = document.querySelector('[data-currency-type="from"]');
const toCurrE1 = document.querySelector('[data-currency-type="to"]');
const resultValue = document.querySelector('.result-value');
const convertBtn = document.querySelector('.btn-convert');
const swapBtn = document.querySelector('.swap-btn');
const amountInput = document.getElementById('amountInput');

// Populate currency dropdowns
for(let select of currencySelects) {
    for(let currency in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currency;
        newOption.value = currency;
        select.append(newOption);
    }
    select.addEventListener('change', (event) => {
        flagUpdate(event.target);
    });
}

// Update flag when currency is changed
const flagUpdate = (elem) => {
    let currcode = elem.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = elem.closest('.currency-box').querySelector('.flag-icon');
    img.src = newSrc;
    img.alt = `${currcode} flag`;
}

// Perform currency exchange
const exchangeRate = async() => {
    let fromcurr = fromCurrE1.value;
    let tocurr = toCurrE1.value;
    let amount = parseFloat(amountInput.value) || 0;
    
    if(amount <= 0) {
        resultValue.innerHTML = '-';
        return;
    }
    
    try {
        resultValue.innerHTML = 'Converting...';
        const response = await fetch(`https://open.exchangerate-api.com/v6/latest/${fromcurr}`);
        const data = await response.json();
        const rate = data.rates[tocurr];
        const convertedAmount = (amount * rate).toFixed(2);
        resultValue.innerHTML = `${convertedAmount} ${tocurr}`;
    } catch(error) {
        resultValue.innerHTML = 'Error fetching rate';
        console.error('Error:', error);
    }
};

// Swap currencies
swapBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let temp = fromCurrE1.value;
    fromCurrE1.value = toCurrE1.value;
    toCurrE1.value = temp;
    
    flagUpdate(fromCurrE1);
    flagUpdate(toCurrE1);
    exchangeRate();
});

// Convert on button click
convertBtn.addEventListener('click', (e) => {
    e.preventDefault();
    exchangeRate();
});

// Convert on Enter key
amountInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        exchangeRate();
    }
});
