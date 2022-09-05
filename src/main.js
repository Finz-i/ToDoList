"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

    const colorOne = document.getElementById('color-one');
    const colorTwo = document.getElementById('color-two');
    const colorThree = document.getElementById('color-three');

    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    
    let arr = [];
    let arrLS = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];

    //Clone in arr and clear LocalStorage 1 time(not every submit!)
    for (let key of arrLS) {
        arr.push(key);
        delete arrLS.key;
        key.id = arr.indexOf(key);
    }

    let getDataLS = function (color, text, id) {
        const content = document.createElement('div'); //MAIN WRAPPER
        content.classList.add('task');
        content.dataset.lengthIndex = arr.indexOf(content);
        content.dataset.id = id;

        const colorIndicator = document.createElement('div'); // COLOR INDICATOR
        colorIndicator.classList.add('indicator');
        colorIndicator.style.backgroundColor = color;
        content.appendChild(colorIndicator);

        const content_item = document.createElement('div'); //EDITOR-INPUT WRAPPER
        content_item.classList.add('content');
        content.appendChild(content_item);

        const row = document.createElement('input'); //TASK EDITOR-INPUT
        row.classList.add('task-row');
        row.value = text;
        row.type = 'text';
        row.setAttribute('readonly', 'readonly');
        content_item.appendChild(row);

        const actions = document.createElement('div'); // BUTTTONS
        actions.classList.add('actions');
        content.appendChild(actions);

        const actionsContainer = document.createElement('div');
        actions.appendChild(actionsContainer);
        actionsContainer.classList.add('actionsContainer');

        const edit = document.createElement('button'); //EDIT-BUTTON
        edit.classList.add('edit');
        actionsContainer.appendChild(edit);
        edit.innerHTML = 'edit';

        const del = document.createElement('button'); //DELETE-BUTTON
        del.classList.add('delete');
        actionsContainer.appendChild(del);
        del.innerHTML = 'DEL';

        list_el.appendChild(content);

        input.value = "";

        //Delete button action
        del.addEventListener('click', () => {

            //Define DOM element for removing
            const target = content;

            //Remove object from LocalStorage           
            for (let key of arrLS) {
                if (content.dataset.id == key.id) {
                    arrLS.splice(arrLS.indexOf(key), 1);
                }
            }

            //Remove object added in start from array
            for (let key of arr) {
                if (content.dataset.id == key.id) {
                    arr.splice(arr.indexOf(key), 1);
                }
            }
            //Remove element from DOM
            target.remove();

            //Push new arr to LocalStorage
            localStorage.setItem("data", JSON.stringify(arrLS));

            console.log(arrLS)
        });

        //Edit button action
        edit.addEventListener('click', () => {
            if (edit.innerHTML.toLowerCase() == 'edit') {
                row.removeAttribute('readonly');
                row.focus();
                edit.innerHTML = 'save';
            } else {
                row.setAttribute('readonly', 'readonly');
                edit.innerHTML = 'edit';
                for (let key of arrLS) {
                    if (key.id == content.dataset.id) {
                        key.text = row.value;
                    }
                    console.log(arrLS);
                }
                localStorage.setItem("data", JSON.stringify(arrLS));
            }
        })
    }

    //Apply new elements list
    let applyLsList = function () {
        document.querySelector('.list').innerHTML = "";
        arrLS.forEach((element) => {
            getDataLS(element.color, element.text, element.id);

        })
    }

    applyLsList();

    

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert('Please add a task')
        } else {

            let itemObj = {
                color: '',
                priority: ''
            }      

            for (let key in itemObj) {
                if (colorOne.checked) {
                    itemObj.color = '#a340ff';
                    itemObj.priority = '1';
                } else if (colorTwo.checked) {
                    itemObj.color = '#ff4040';
                    itemObj.priority = '2';
                } else if (colorThree.checked) {
                    itemObj.color = '#7cff40';
                    itemObj.priority = '3';
                }
            }

            itemObj.text = task; // task == value of input

            //Add item to list
            arr.push(itemObj);

            itemObj.id = arr.indexOf(itemObj);//Add id for object and DOM element

            arr.sort(function (a, b) {
                if (a.priority > b.priority) {
                    return 1;
                } else if (a.priority == b.priority) {
                    return 0;
                } else if (a.priority < b.priority) {
                    return -1;
                }
            })

            const createContentAll = function () {

                console.log(arr);
                //Create start DOM staff
                let createStartContent = function (color, text, id) {
                    const content = document.createElement('div'); //MAIN WRAPPER
                    content.classList.add('task');
                    content.dataset.id = id;

                    const colorIndicator = document.createElement('div'); // COLOR INDICATOR
                    colorIndicator.classList.add('indicator');
                    colorIndicator.style.backgroundColor = color;
                    content.appendChild(colorIndicator);

                    const content_item = document.createElement('div'); //EDITOR-INPUT WRAPPER
                    content_item.classList.add('content');
                    content.appendChild(content_item);

                    const row = document.createElement('input'); //TASK EDITOR-INPUT
                    row.classList.add('task-row');
                    row.value = text;
                    row.type = 'text';
                    row.setAttribute('readonly', 'readonly');
                    content_item.appendChild(row);

                    const actions = document.createElement('div'); // BUTTTONS
                    actions.classList.add('actions');
                    content.appendChild(actions);

                    const actionsContainer = document.createElement('div');
                    actions.appendChild(actionsContainer);
                    actionsContainer.classList.add('actionsContainer');

                    const edit = document.createElement('button'); //EDIT-BUTTON
                    edit.classList.add('edit');
                    actionsContainer.appendChild(edit);
                    edit.innerHTML = 'edit';

                    const del = document.createElement('button'); //DELETE-BUTTON
                    del.classList.add('delete');
                    actionsContainer.appendChild(del);
                    del.innerHTML = 'DEL';

                    list_el.appendChild(content);

                    input.value = "";

                    console.log(arr.indexOf(itemObj));

                    //Delete button action
                    del.addEventListener('click', () => {

                        //Define DOM element for removing
                        const target = content;

                        //Remove object from array            
                        for (let key of arr) {
                            if (content.dataset.id == key.id) {
                                arr.splice(arr.indexOf(key), 1);
                            }
                        }

                        //Remove element from DOM
                        target.remove();
                        console.log(arr);
                        localStorage.setItem("data", JSON.stringify(arr));
                    });

                    //Edit button action
                    edit.addEventListener('click', () => {
                        if (edit.innerHTML.toLowerCase() == 'edit') {
                            row.removeAttribute('readonly');
                            row.focus();
                            edit.innerHTML = 'save';
                        } else {
                            row.setAttribute('readonly', 'readonly');
                            edit.innerHTML = 'edit';
                            for (let key of arr) {
                                if (key.id == content.dataset.id) {
                                    key.text = row.value;
                                }
                            }
                            //Push new value to LocalStorage
                            localStorage.setItem("data", JSON.stringify(arr));
                        }
                    })
                }
        
                localStorage.setItem("data", JSON.stringify(arr));

                //Apply new elements list
                let applyNewList = function () {
                    document.querySelector('.list').innerHTML = "";
                    arr.forEach((element) => {
                        createStartContent(element.color, element.text, element.id);
                    })
                }

                applyNewList();
                
            }

            createContentAll();//Create the element of ToDo list:)
        }
    })
})
