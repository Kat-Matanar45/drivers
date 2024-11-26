'use strict'

const surname = document.querySelector('#surname');
const name = document.querySelector('#name');
const patronymic = document.querySelector('#patronymic');
const age = document.querySelector('#age');
const tel = document.querySelector('#tel');
const selectOption = document.querySelector('#position');
const btnAdd = document.querySelector('.add');
const tableBody = document.querySelector('.table__body');
const checkboxes = document.querySelectorAll('.single-check');
let selectedValue = 0;
let numberTr = 0;
let kidsNum;
const drivers = [];
let driversLocal;

class Labourer {
    constructor(surname, name, patronymic, age, tel) {
    this.surname = surname
    this.name = name
    this.patronymic = patronymic
    this.age = age
    this.tel = tel
}
}

class Driver extends Labourer {
    constructor(surname, name, patronymic, age, tel, kids, role, shop, auto, skills = []) {
        super(surname, name, patronymic, age, tel)
        this.role = role
        this.shop = shop
        this.auto = auto
        this.kids = kids
        this.id = Driver.generateId();
        this._skills = skills
    }

    static count = 0;

    static numberAuto() {
        Driver.count++;
        return Driver.count;
    }

    static generateId() {
        return Date.now() + Math.random().toString(36).substring(2, 9);
    }

    get skills() {
        return this._skills
    }

    set skills(str) {
        this.skills.push(str)
    }
}

const addElement = () => {
    numberTr++;
    if (selectedValue === 1) {addDriver()}
}

const addDriver = () => {
    const driver1 = new Driver(surname.value, name.value, patronymic.value, age.value, tel.value, kidsNum,'Водитель', 1, Driver.numberAuto());
    driver1.skills = "Вождение в зимних условиях";
    driver1.skills = "Категория C";
    drivers.push(driver1);
    const addTr = document.createElement('tr');
    addTr.setAttribute('data-id', driver1.id);
    addTr.innerHTML = `<td>${numberTr}</td>
                <td>${driver1.role}</td>
                <td>${driver1.surname}</td>
                <td>${driver1.name}</td>
                <td>${driver1.patronymic}</td>
                <td>${driver1.age}</td>
                <td>${driver1.tel}</td>
                <td>${driver1.kids}</td>
                <td>${driver1.skills.join(", ")}</td>
                <td>Автомобиль № ${driver1.auto} 
                Склад № ${driver1.shop}</td>
                <td>
                    <button class="delete">Удалить</button>
                </td>`
    tableBody.appendChild(addTr);

    driversLocal = JSON.stringify(drivers);
    localStorage.setItem('drivers', JSON.stringify(drivers));
}

const inputText = (e) => {
    e.target.value = e.target.value.replace(/[^а-яА-Я\s\-]+/, '')
};

surname.addEventListener('input', inputText);
name.addEventListener('input', inputText);
patronymic.addEventListener('input', inputText);
age.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]+/, '')
});
tel.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d\-\+\(\)]+/, '')
})


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkboxes.forEach(other => {
                if (other !== checkbox) {
                    other.checked = false;
                }
            });
            kidsNum = checkbox.value;
        }
    });
});

selectOption.addEventListener('change', (event) => {
    selectedValue = Number(event.target.value);
    console.log(`Выбранное значение: ${selectedValue}`);
    return selectedValue;
});
btnAdd.addEventListener('click', addElement);
tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        const id = row.getAttribute('data-id');
        row.remove();

        const rows = tableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const numberCell = row.querySelector('td:first-child');
            if (numberCell) {
                numberCell.textContent = index + 1;
            }
        });

        numberTr = rows.length;

        const index = drivers.findIndex(driver => driver.id === id);
        if (index !== -1) {
            drivers.splice(index, 1);
        }
    }
        driversLocal = JSON.stringify(drivers);
        localStorage.setItem('drivers', JSON.stringify(drivers));
})









