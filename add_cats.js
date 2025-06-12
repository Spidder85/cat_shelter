const login = 'KOZMIN-IYU';
const cat = [
    {
    id: 1,
    name: "Фира",
    favorite: false,
    rate: 0,
    age: 3,
    description:
      "Фира родилась и выросла на улице дачного поселка, но это никак не сказалось на чудесном характере кошки. Ради человеческого внимания она готова на все!",
    image: "https://i.postimg.cc/9FMJJyyV/kitty1.png",
  },
  {
    id: 2,
    name: "Дымок",
    favorite: false,
    rate: 0,
    age: 1,
    description:
      "Одно из самых впечатляющих преображений этого года: бывший беспризорник, боец, гроза района Дымок...",
    image: "https://i.postimg.cc/t49PBjK6/kitty2.png",
  },
  {
    id: 3,
    name: "Стеша",
    favorite: false,
    rate: 0,
    age: 1,
    description:
      "Стеша совсем еще молоденькая, ей 12 месяцев и она очень хочет стать домашней и любимой...",
    image: "https://i.postimg.cc/QdS7PzDy/kitty3.png",
  },
];

cats.forEach((cat) => {
    fetch('https://cats.petiteweb.dev/api/single/${login}/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cat),
    })
    .then((res) => {
        if(!res.ok) {
            throw new Error(`Ошибка при добавлении`)
        }
        return res.json();
    })
    .then((data) => console.log('Добавлено:', data))
    .catch((err) => console.error(err));
});