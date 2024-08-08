import { I18n } from "i18n-js";


var listOfRequests = {};
var currentViewId = undefined;
var currentState = "request";



const i18n = new I18n({
    "ru":{
        requestButton: "Запрос",
        responseButton: 'Ответ',
        clearHistory: 'Очистить историю',
        table: {
            time: "Время",
            status: "Статус",
            method: "Метод",
            url: "Ссылка"
        }
    }
});

function changeData(itemId){
    if(itemId === -1){
        document.querySelector('#viewerData').value = '';
    } else{
        const viewData = currentState === "request" ? listOfRequests[itemId].request : listOfRequests[itemId].response; 
        
    
        document.querySelector('#viewerData').value = viewData;
    }
}


function appendRequestData(time, status, method, url, requestData, responseData) {
    // Получаем элемент tbody с id historyBody
    const tbody = document.getElementById('historyBody');
    const currentId = crypto.randomUUID();

    // Создаем новый элемент tr
    const tr = document.createElement('tr');
    tr.classList.add('hover:bg-gray-600');
    tr.setAttribute('id', currentId);

    // Создаем ячейки для каждой части данных
    const timeCell = document.createElement('td');
    timeCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-700');
    timeCell.textContent = time;

    const statusCell = document.createElement('td');
    statusCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-700');
    statusCell.textContent = status;

    const methodCell = document.createElement('td');
    methodCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-700');
    methodCell.textContent = method;

    const urlCell = document.createElement('td');
    urlCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-700');

    // Создаем ссылку внутри ячейки URL
    const link = document.createElement('a');
    link.href = url;
    link.classList.add('text-blue-400', 'underline', 'pointer-events-none');
    link.textContent = url;


    // Добавляем ссылку в ячейку URL
    urlCell.appendChild(link);

    // Добавляем все ячейки в строку tr
    tr.appendChild(timeCell);
    tr.appendChild(statusCell);
    tr.appendChild(methodCell);
    tr.appendChild(urlCell);


    listOfRequests[currentId] = {
        request: requestData,
        response: responseData
    };


    console.log(listOfRequests);

    // Добавляем строку tr в tbody
    tbody.appendChild(tr);
    tbody.onclick = (event) => {
        const clickElementId = event.target.parentElement.getAttribute('id')
        currentViewId = clickElementId;


        changeData(clickElementId);
    }
}


i18n.locale = navigator.language;



window.onload = () => {
    const requestButton = document.querySelector('#requestButton');
    const responseButton = document.querySelector('#responseButton');
    const clearHistory = document.querySelector('#clearHistory');
    const openinText = document.querySelector('#openInTxt');


    openinText.onclick = async () => {
        const viewData = currentState === "request" ? listOfRequests[currentViewId].request : listOfRequests[currentViewId].response; 

        await window.openintxt(viewData);
    };

    
    requestButton.onclick = () => {
        responseButton.classList.remove('bg-indigo-700');
        responseButton.classList.add('bg-indigo-900');
        
        
        requestButton.classList.remove('bg-indigo-900');
        requestButton.classList.add('bg-indigo-700');

        currentState = "request";

        changeData(currentViewId);
    }
    
    responseButton.onclick = () => {
        requestButton.classList.remove('bg-indigo-700');
        requestButton.classList.add('bg-indigo-900');
        
        
        responseButton.classList.remove('bg-indigo-900');
        responseButton.classList.add('bg-indigo-700');

        currentState = "response";

        changeData(currentViewId)
    }
    
    
    
    
    requestButton.innerText = i18n.t('requestButton', {defaultValue: "Request"});
    responseButton.innerText = i18n.t('responseButton', {defaultValue: "Response"});

    clearHistory.innerText = i18n.t('clearHistory', {defaultValue: "Clear History"});

    clearHistory.onclick = () => {
        listOfRequests = {};
        changeData(-1);

        const tbody = document.querySelector('#historyBody');


        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }


    document.querySelector('#time').innerText = i18n.t('table.time', {defaultValue: "Time"});
    document.querySelector('#status').innerText = i18n.t('table.status', {defaultValue: "Status"});
    document.querySelector('#method').innerText = i18n.t('table.method', {defaultValue: "Method"});
    document.querySelector('#url').innerText = i18n.t('table.url', {defaultValue: "Url"});
}