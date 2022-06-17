window.addEventListener('DOMContentLoaded', () => getData());
const url = 'https://62ac0ccf9fa81d00a7a8c500.mockapi.io/fetch'
const form = document.querySelector('form');
form.addEventListener('submit', addData);
const lista = document.querySelector('#divLista');

const getData = async () => {
    try {

        const res = await fetch(url);
        const getdata = await res.json();
        
        getdata.forEach(element => {

            const table = document.createElement('table');
            table.classList.add('table');

            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');

            td1.innerHTML = element.id;
            td2.innerHTML = element.name;
            td3.innerHTML = element.email;
            td4.innerHTML = element.phone;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            table.appendChild(tr);
            lista.appendChild(table);

            const deleteItem = document.createElement('button');
            deleteItem.classList.add('btn');
            deleteItem.classList.add('btn-danger');
            deleteItem.classList.add('btn-sm');
            deleteItem.innerHTML = 'Delete';
            deleteItem.setAttribute('id', element.id);
            deleteItem.addEventListener('click', () => deleteData(element.id));
            tr.appendChild(deleteItem);

            const editItem = document.createElement('button');
            editItem.classList.add('btn');
            editItem.classList.add('btn-warning');
            editItem.classList.add('btn-sm');
            editItem.innerHTML = 'Edit';
            editItem.setAttribute('id', element.id);
            editItem.addEventListener('click', () => editData(element.id));
            tr.appendChild(editItem);
        });
    } catch (error) {
    }
}

async function deleteData(id) {
    try {
        const res = await fetch(url + '/' + id, {
            method: 'DELETE'
        });
        const getdata = await res.json();
        console.log(getdata);
        lista.innerHTML = '';
        getData();
    } catch (error) {
        console.log(error);
    }
}


async function editData(id) {
    try {
        const res = await fetch(url + '/' + id, {
            method: 'PUT'
        });
        const getdata = await res.json();
        console.log(getdata);
        lista.innerHTML = '';
        getData();
    } catch (error) {
        console.log(error);
    }
}

async function addData() {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone')
    }
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await res.json();
        console.log(content);
        lista.innerHTML = '';
        getData();
    } catch (error) {
        console.log(error);
    }
}
