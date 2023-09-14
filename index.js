import Buzon from './buzon.js';

(function() {
  const persons = [
    { name: 'Guillermo', avatar: './img/scientist-man.png' },
    { name: 'Jago', avatar: './img/farmer-man.png' },
    { name: 'Jorge', avatar: './img/worker-man.png' },
    { name: 'Javi', avatar: './img/police-man.png' },
    { name: 'Marcos', avatar: './img/detective-man.png' },
    { name: 'Sergio', avatar: './img/teacher-man.png' },
  ];

  // Iconos de https://icons8.com/icon/set/man/emoji

  const $mainImage = document.querySelector('#main-image');
  const $mainTitle = document.querySelector('#main-title');
  const $mainDate = document.querySelector('#main-date');
  const $buzonList = document.querySelector('#buzon-list');
  const $buzonItemTemplate = document.querySelector('#buzon-item-template');

  const buzon = new Buzon({
    startDate: '2021-04-07',
    persons
  });

  const currentPerson = buzon.getPerson();
  const cycleStartDate = new Date(buzon.getCycleStartDate().getTime() + buzon.dayLength);

  function dateFormat(date) {
    return date.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).replace(/^(.)|\s+(.)/g, function (letter) {
      return letter.toUpperCase()
    }).replaceAll('De', 'de');
  }

  $mainImage.src = currentPerson.avatar;
  $mainTitle.innerText = currentPerson.name;
  $mainDate.innerText = dateFormat(cycleStartDate);

  const currentPersonIndex = persons.indexOf(currentPerson);
  const buzonList = [
      ...persons.slice(currentPersonIndex),
      ...persons.slice(0, currentPersonIndex)
    ]
    .filter((person) => person !== currentPerson)
    .map((person, index) => ({
      ...person,
      startDate: new Date(cycleStartDate.getTime() + (buzon.weekLength * (index + 1)))
    }));
  $buzonList.innerHTML = buzonList.map(getItemTemplate).join('');

  function getItemTemplate(person) {
    return $buzonItemTemplate.innerHTML
      .split('{{name}}').join(person.name)
      .split('{{date}}').join(dateFormat(person.startDate))
      .split('{{image}}').join(person.avatar);
  }

})();
