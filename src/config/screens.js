export const screens = [
  // Screen 1
  {
    id: 'screen-1',
    title: 'Вступление',
    info: 'Пример диалога',
    images: {
      male: './assets/scene1.png',
      female: './assets/scene1.png'
    },
    texts: {
      male: 'Когда меня посадили в тюрьму, шёл дождь. Когда я выхожу — он всё ещё идёт. Словно и не прошли годы.',
      female: 'Я тоже рада тебя видеть, ворчун. Здесь мокро и холодно, давай поболтаем уже в офисе.'
    },
    actions: {}
  },
  // Screen 2
  {
    id: 'screen-2',
    title: 'Introduction',
    info: 'Пример диалога',
    images: {
      male: './assets/scene2.png',
      female: './assets/scene2.png'
    },
    texts: {
      male: 'Офисе? Мне в полиции давно не рады.',
      female: 'Как и мне — я уволилась ещё в прошлом году. Ты писал, что не знаешь, чем займёшься на свободе, и у меня появилась идея. Что думаешь о детективном агентстве?'
    },
    actions: {}
  },
  // Screen 3: игра начинается, первый выбор
  {
    id: 'screen-3',
    title: 'Первый выбор в игре',
    info: 'К детективам обращается юная девушка, которая жалуется на то, что её кто-то сталкерит. В ходе общения мы узнаём, что она замужем. Девушка уточняет, что это дело может разрушить ее жизнь: карьеру, брак или всё сразу. Она не хочет лишних вопросов.',
    images: {
      male: './assets/scene3-1.png',
      female: './assets/scene3-2.png'
    },
    texts: {
      male: 'Клиентка хочет поговорить только с мужичной',
      female: 'Клиентка не хочет разговаривать с женщиной'
    },
    actions: {
      male: [
        { text: 'Согласиться поговорить без коллеги', effect: 0, next: 'screen-4-1' },
        { text: 'Отказаться разговаривать наедине', effect: 0, next: 'screen-4-2' }
      ],
      female: []
    }
  },
  // Screen 4-1: согласие говорить наедине
  {
    id: 'screen-4-1',
    title: 'Согласие говорить наедине',
    info: 'Клиентка попробует “закрепить деловые отношения” традиционным для неё путём и это первый адалт контент, от которого можно отказаться. Это повлияет на развитие отношений напарников-детективов.',
    images: {
      male: './assets/scene3-3.png',
      female: './assets/scene3-3.png'
    },
    texts: {
      male: '',
      female: ''
    },
    actions: {
      male: [
        { text: 'Адалт', effect: -1, next: 'screen-5-1' },
        { text: 'Отказаться', effect: +1, next: 'screen-5-2' }
      ],
      female: []
    },
    disableGenderSelection: true
  },
  // Screen 4-2: отказ говорить наедине
  {
    id: 'screen-4-2',
    title: 'Отказ говорить наедине',
    info: 'Так или иначе клиентка попросит ничего не сообщать её мужу, потому что он не понимает законов шоу-бизнеса, а она его очень любит и не хочет причинять боли.',
    images: {
      male: './assets/scene3-4.png',
      female: './assets/scene3-4.png'
    },
    texts: {
      male: '',
      female: ''
    },
    actions: {
      male: [
        { text: 'Начать заказ', effect: 0, next: 'screen-6' }
      ],
      female: [
        { text: 'Начать заказ', effect: 0, next: 'screen-6' }
      ]
    },
    disableGenderSelection: true
  },
  // Screen 5-1: первый адалт, принятие заказа
  {
    id: 'screen-5-1',
    title: 'Первый адалт, принятие заказа',
    info: 'Первый адалт контент',
    images: {
      male: '',
      female: ''
    },
    texts: {
      male: '',
      female: ''
    },
    actions: {},
    relationshipThreshold: -1,
    disableGenderSelection: true
  },
  // Screen 5-2: отказ от адалта, принятие заказа
  {
    id: 'screen-5-2',
    title: 'Отказ от адалта, принятие заказа',
    info: 'Так или иначе клиентка попросит ничего не сообщать её мужу, потому что он не понимает законов шоу-бизнеса, а она его очень любит и не хочет причинять боли.',
    images: {
      male: './assets/scene3-4.png',
      female: './assets/scene3-4.png'
    },
    texts: {
      male: '',
      female: ''
    },
    actions: {
      male: [
        { text: 'Начать заказ', effect: 0, next: 'screen-6' }
      ],
      female: [
        { text: 'Начать заказ', effect: 0, next: 'screen-6' }
      ]
    },
    relationshipThreshold: 1,
    disableGenderSelection: true
  },
  // Screen 6: слежка
  {
    id: 'screen-6',
    title: 'Слежка и лупа',
    info: 'Начав расследование, мы проследим за девушкой до отеля, где обнаружим, что она встречается с богатым любовником. Мы сможем наблюдать в бинокль, что она занимается сексом с мужчиной и подглядывание второй способ получения адалт контента, как “декорация” первой мини-игры. В бинокль мы в итоге заметим, что на другой стороне заправки за девушкой кто-то следит и снимает на камеру. Мы понимаем, что это сталкер, но он замечает нас и убегает. Мы обыскиваем место и находим улики ведущие в городской архив.',
    images: {
      male: './assets/scene4-1.png',
      female: './assets/scene4-1.png'
    },
    texts: {
      male: 'Нажмите на бинокль в верхнем правом углу',
      female: 'Нажмите на бинокль в верхнем правом углу'
    },
    actions: {},
    customScripts: [
      {
        id: 'magnifier',
        options: {
          image: './assets/scene4-2.png',
          label: 'Open spyglass view',
          closeLabel: 'Close spyglass view'
        }
      }
    ],
    disableGenderSelection: true
  }
];