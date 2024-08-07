import { I18n } from "i18n-js";

const listOfRequest = [];

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


function appendRequestData(time, status, method, url) {
    // Получаем элемент tbody с id historyBody
    const tbody = document.getElementById('historyBody');

    // Создаем новый элемент tr
    const tr = document.createElement('tr');
    tr.classList.add('hover:bg-gray-600');

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
    link.classList.add('text-blue-400', 'underline');
    link.textContent = url;

    // Добавляем ссылку в ячейку URL
    urlCell.appendChild(link);

    // Добавляем все ячейки в строку tr
    tr.appendChild(timeCell);
    tr.appendChild(statusCell);
    tr.appendChild(methodCell);
    tr.appendChild(urlCell);

    // Добавляем строку tr в tbody
    tbody.appendChild(tr);
}

// Пример использования функции
appendRequestData('2:00 PM', 'Успешно', 'DELETE', 'https://example.com/path/to/resource');


i18n.locale = navigator.language;

window.onload = () => {
    document.querySelector('#requestButton').innerText = i18n.t('requestButton', {defaultValue: "Request"});

    document.querySelector('#requestButton').onclick = () => {
        document.querySelector('#responseButton').classList.remove('bg-indigo-700');
        document.querySelector('#responseButton').classList.add('bg-indigo-900');


        document.querySelector('#requestButton').classList.remove('bg-indigo-900');
        document.querySelector('#requestButton').classList.add('bg-indigo-700');
    }

    document.querySelector('#responseButton').onclick = () => {
        document.querySelector('#requestButton').classList.remove('bg-indigo-700');
        document.querySelector('#requestButton').classList.add('bg-indigo-900');


        document.querySelector('#responseButton').classList.remove('bg-indigo-900');
        document.querySelector('#responseButton').classList.add('bg-indigo-700');
    }

    document.querySelector('#responseButton').innerText = i18n.t('responseButton', {defaultValue: "Response"});
    document.querySelector('#clearHistory').innerText = i18n.t('clearHistory', {defaultValue: "Clear History"});

    document.querySelector('#clearHistory').onclick = () => {
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