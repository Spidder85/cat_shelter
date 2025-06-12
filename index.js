// Константы для иконок
const EDIT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
<path fill="currentColor" d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
</svg>`;
const DELETE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
<path fill="currentColor" d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>`;




// Функция для создания строки в таблице
function addRow(table, data) {
    let { name, image, age, id, description } = data;

    let tr = document.createElement("tr");
    tr.id = `cat-${id}`; //id;

    let imageTd = document.createElement("td");
    let img = document.createElement("img");
    img.src = image;
    img.alt = name;
    img.classList.add("cat-image");
    imageTd.appendChild(img);

    let nameTd = document.createElement("td");
    let nameLink = document.createElement("span");
    nameLink.textContent = name;
    nameLink.classList.add("cat-name");
    nameLink.addEventListener("click", () => openModal(data));
    nameTd.appendChild(nameLink);

    let ageTd = document.createElement("td");
    ageTd.textContent = `${age} ${getAgeSuffix(age)}`;

    let descTd = document.createElement("td");
    descTd.textContent = description;

    // Ячейка действий
    let actionsTd = document.createElement("td");
    actionsTd.classList.add("action-buttons");
    
    // Кнопка редактирования
    let editBtn = document.createElement("button");
    editBtn.innerHTML = EDIT_ICON;
    editBtn.classList.add("action-btn", "edit-btn");
    editBtn.title = "Редактировать";
    editBtn.addEventListener("click", () => openEditModal(data));
    
    // Кнопка удаления
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = DELETE_ICON;
    deleteBtn.classList.add("action-btn", "delete-btn");
    deleteBtn.title = "Удалить";
    deleteBtn.addEventListener("click", () => deleteCat(id));
    
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(imageTd);
    tr.appendChild(nameTd);
    tr.appendChild(ageTd);
    tr.appendChild(descTd);
    tr.appendChild(actionsTd);

    table.appendChild(tr);
}

// Modal function
function openModal(catData) {
    const modal = document.getElementById("catModal");
    document.getElementById("modalCatImage").src = catData.image;
    document.getElementById("modalCatImage").alt = catData.name;
    document.getElementById("modalCatName").textContent = catData.name;
    document.getElementById("modalCatAge").textContent = `${catData.age} ${getAgeSuffix(catData.age)}`;
    document.getElementById("modalCatDescription").textContent = catData.description;
    modal.style.display = "block";
}

// Функция открытия модального окна редактирования
function openEditModal(catData) {
    const modal = document.getElementById("editModal");
    document.getElementById("editName").value = catData.name;
    document.getElementById("editAge").value = catData.age;
    document.getElementById("editDesc").value = catData.description;
    document.getElementById("editCatImage").src = catData.image;
    document.getElementById("editCatImage").alt = catData.name;
    
    // Сохраняем ID редактируемой кошки в форме
    document.getElementById("editForm").dataset.id = catData.id;
    
    modal.style.display = "block";
}
// Функция сохранения изменений
function saveCat(e) {
    e.preventDefault();
    
    const form = e.target;
    const id = form.dataset.id;
    const name = document.getElementById("editName").value;
    const age = document.getElementById("editAge").value;
    const description = document.getElementById("editDesc").value;
    
    // Находим строку в таблице
    const row = document.getElementById(`cat-${id}`);
    
    // Обновляем данные в строке
    row.cells[1].textContent = name;
    row.cells[2].textContent = `${age} ${getAgeSuffix(age)}`;
    row.cells[3].textContent = description;
    
    // Закрываем модальное окно
    closeModal();
}

// Функция удаления кошки
function deleteCat(id) {
    if (confirm("Вы уверены, что хотите удалить этого питомца?")) {
        const row = document.getElementById(`cat-${id}`);
        row.remove();
    }
}


 function closeModal() {
     document.querySelectorAll(".modal").forEach((modal) => {
         modal.style.display = "none";
     });
 }

// // Close modal when clicking X or outside
// document.querySelector(".close-modal").addEventListener("click", closeModal);
// window.addEventListener("click", (event) => {
//     if (event.target === document.getElementById("catModal")) {
//         closeModal();
//     }
//     if (event.target === document.getElementById("editModal")) {
//         closeModal();
//     }
// });


// Функция для правильного склонения слова "год"
function getAgeSuffix(age) {
    if (age % 100 >= 11 && age % 100 <= 14) {
        return "лет";
    }
    switch (age % 10) {
        case 1: return "год";
        case 2:
        case 3:
        case 4: return "года";
        default: return "лет";
    }
}

// Получаем таблицу и заполняем её данными
// let table = document.querySelector(".cats-table-body");
// const data = [
//     {
//         id: 1,
//         name: "Фира",
//         favorite: false,
//         rate: 0,
//         age: 3,
//         description: "Фира родилась и выросла на улице дачного поселка, но это никак не сказалось на чудесном характере кошки. Ради человеческого внимания она готова на всё!",
//         image: "imgs/kitty1.png",
//     },
//     {
//         id: 2,
//         name: "Дымок",
//         favorite: false,
//         rate: 0,
//         age: 1,
//         description: "Одно из самых впечатляющих преображений этого года: бывший беспризорник, боец, гроза района Дымок, который совсем недавно был категорически против заточения в помещении и навязанной ему помощи, стал расслабленным, дружелюбным и общительным",
//         image: "imgs/kitty2.png",
//     },
//     {
//         id: 3,
//         name: "Стеша",
//         favorite: false,
//         rate: 0,
//         age: 1,
//         description: "Стеша совсем еще молоденькая, ей 12 месяцев и она очень хочет стать домашней и любимой. Киса очень тянется к человеку, любит забираться на ручки, просит, чтобы её погладили",
//         image: "imgs/kitty3.png",
//     },
// ];

let data;
const login = 'KOZMIN-IYU';
const xhr = new XMLHttpRequest();

xhr.open("GET", `https://cats.petiteweb.dev/api/single/${login}/show`, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        const table = document.querySelector(".cats-table-body");
        data.forEach((item) => addRow(table, item));
    }
};
xhr.send();


// // Заполняем таблицу данными
// data.forEach((item) => addRow(table, item));

// Инициализация (добавляем обработчики для обоих модальных окон)
document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector(".cats-table-body");
    
    // Обработчики для модального окна редактирования
    document.getElementById("editForm").addEventListener("submit", saveCat);
    
    // Обработчики закрытия для обоих модальных окон
    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.addEventListener("click", closeModal);
    });
    
    // Закрытие при клике вне окна для обоих модальных окон
    window.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal")) {
            closeModal();
        }
    });
    
    // Заполняем таблицу данными
    data.forEach((item) => addRow(table, item));
});

function saveItem(db, id, updatedData) {
  fetch(`/api/single/${db}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
  .then(response => {
    if (!response.ok) throw new Error('Ошибка обновления');
    return response.json();
  })
  .then(() => {
    // Закрываем модальное окно
    closeModal();

    // Обновляем таблицу
    return fetch(`/api/single/${db}/show`);
  })
  .then(response => response.json())
  .then(data => {
    updateTable(data);
  })
  .catch(error => {
    console.error(error);
    alert('Не удалось сохранить изменения');
  });
}

function updateTable(data) {
  const tbody = document.querySelector('#petsTable tbody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>
        <button onclick="openEditModal(${item.id})">Редактировать</button>
        <button onclick="deleteItem('pets', ${item.id})">Удалить</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
