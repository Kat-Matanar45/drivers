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
const staff = [];
let staffLocal;

class Labourer {
    constructor(surname, name, patronymic, age, tel) {
    this.surname = surname
    this.name = name
    this.patronymic = patronymic
    this.age = age
    this.tel = tel
}

    static generateId() {
        return Date.now() + Math.random().toString(36).substring(2, 9);
    }

}

class Driver extends Labourer {
    constructor(surname, name, patronymic, age, tel, kids, role, shop, auto, skills = []) {
        super(surname, name, patronymic, age, tel)
        this.role = role
        this.shop = shop
        this.auto = auto
        this.kids = kids
        this._skills = skills
        this.id = Labourer.generateId();
    }

    static count = 0;

    static numberAuto() {
        Driver.count++;
        return Driver.count;
    }

    get skills() {
        return this._skills
    }

    set skills(str) {
        this.skills.push(str)
    }
}

class Engineer extends Labourer {
    constructor(surname, name, patronymic, age, tel, kids, role, shop, skills = []) {
        super(surname, name, patronymic, age, tel)
        this.role = role
        this.shop = shop
        this.kids = kids
        this._skills = skills
        this.id = Labourer.generateId();
    }

    static count = 0;

    static numberAuto() {
        Engineer.count++;
        return Engineer.count;
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
    if (selectedValue === 2) {addEngineer()}
    surname.value = '';
    name.value = '';
    patronymic.value = '';
    age.value = '';
    tel.value = '';
    selectOption.value = "0";

    checkboxes.forEach(checkbox => {
        checkbox.checked = false
    });
}

const addDriver = () => {
    const driver1 = new Driver(surname.value, name.value, patronymic.value, age.value, tel.value, kidsNum,'Водитель', 1, Driver.numberAuto());
    driver1.skills = "Вождение в зимних условиях";
    driver1.skills = "Категория C";
    staff.push(driver1);
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

    staffLocal = JSON.stringify(staff);
    localStorage.setItem('staff', JSON.stringify(staff));
}

const addEngineer = () => {
    const engineer1 = new Engineer(surname.value, name.value, patronymic.value, age.value, tel.value, kidsNum,'Инженер', 1);
    engineer1.skills = "Допуск к работе на высоте";
    engineer1.skills = "Допуск к секретным разработкам";
    staff.push(engineer1);
    const addTr = document.createElement('tr');
    addTr.setAttribute('data-id', engineer1.id);
    addTr.innerHTML = `<td>${numberTr}</td>
                <td>${engineer1.role}</td>
                <td>${engineer1.surname}</td>
                <td>${engineer1.name}</td>
                <td>${engineer1.patronymic}</td>
                <td>${engineer1.age}</td>
                <td>${engineer1.tel}</td>
                <td>${engineer1.kids}</td>
                <td>${engineer1.skills.join(", ")}</td>
                <td>Цех № ${engineer1.shop}</td>
                <td>
                    <button class="delete">Удалить</button>
                </td>`
    tableBody.appendChild(addTr);

    staffLocal = JSON.stringify(staff);
    localStorage.setItem('staff', JSON.stringify(staff));
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

        let index;
        if (selectedValue === 1) {index = staff.findIndex(driver => driver.id === id)};
        if (selectedValue === 2) {index = staff.findIndex(engineer => engineer.id === id)};

        if (index !== -1) {
            staff.splice(index, 1);
        }
    }
        staffLocal = JSON.stringify(staff);
        localStorage.setItem('staff', JSON.stringify(staff));
})









