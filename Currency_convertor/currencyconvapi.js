
let countries = [
    { name: "United States", currency: "USD", code: "US" },
    { name: "European Union", currency: "EUR", code: "EU" },
    { name: "Japan", currency: "JPY", code: "JP" },
    { name: "United Kingdom", currency: "GBP", code: "GB" },
    { name: "Australia", currency: "AUD", code: "AU" },
    { name: "Canada", currency: "CAD", code: "CA" },
    { name: "Switzerland", currency: "CHF", code: "CH" },
    { name: "China", currency: "CNY", code: "CN" },
    { name: "India", currency: "INR", code: "IN" },
    { name: "South Korea", currency: "KRW", code: "KR" },
    { name: "Brazil", currency: "BRL", code: "BR" },
    { name: "Russia", currency: "RUB", code: "RU" },
    { name: "Mexico", currency: "MXN", code: "MX" },
    { name: "South Africa", currency: "ZAR", code: "ZA" },
    { name: "Singapore", currency: "SGD", code: "SG" }
];

let amountInput = document.getElementById('amount');
let fromCurrencySelect = document.getElementById('from-currency');
let toCurrencySelect = document.getElementById('to-currency');
let fromFlagImg = document.getElementById('from-flag');
let toFlagImg = document.getElementById('to-flag');
let convertBtn = document.getElementById('convert-btn');
let resultInput = document.getElementById('result');

function populateDropdowns() {
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];

        let option1 = document.createElement('option');
        option1.value = country.currency;
        option1.textContent = country.currency + ' - ' + country.name;
        fromCurrencySelect.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = country.currency;
        option2.textContent = country.currency + ' - ' + country.name;
        toCurrencySelect.appendChild(option2);
    }
}

function updateFlag(selectElement, flagImg) {
    let selectedCurrency = selectElement.value;

    let country = null;
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].currency === selectedCurrency) {
            country = countries[i];
            break;
        }
    }

    if (country) {
        flagImg.src = 'https://flagsapi.com/' + country.code + '/flat/64.png';
        flagImg.alt = country.name + ' flag';
    }
}

async function getExchangeRate(fromCurrency, toCurrency) {
    console.log("fetching api ....");
    let response = await fetch('https://api.exchangerate-api.com/v4/latest/' + fromCurrency);
    console.log(response);
    let data = await response.json();
    console.log(data);
    return data.rates[toCurrency];
}

async function convertCurrency() {
    let amount = parseFloat(amountInput.value);
    let fromCurrency = fromCurrencySelect.value;
    let toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (!fromCurrency || !toCurrency) {
        alert('Please select both currencies');
        return;
    }

    let exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    if (exchangeRate) {
        let convertedAmount = (amount * exchangeRate).toFixed(8);
        resultInput.value = amount + ' ' + fromCurrency + ' = ' + convertedAmount + toCurrency;
    } else {
        alert('Error fetching exchange rate. Please try again.');
    }
}

fromCurrencySelect.addEventListener('change', function() {
    updateFlag(fromCurrencySelect, fromFlagImg);
});
toCurrencySelect.addEventListener('change', function() {
    updateFlag(toCurrencySelect, toFlagImg);
});
convertBtn.addEventListener('click', convertCurrency);

function init() {
    populateDropdowns();

    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'INR';
    updateFlag(fromCurrencySelect, fromFlagImg);
    updateFlag(toCurrencySelect, toFlagImg);
}

document.addEventListener('DOMContentLoaded', init);
