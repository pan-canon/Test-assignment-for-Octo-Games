export const screens = [
  // Screen 1
  {
    id: 'screen-1',
    title: 'Start',
    info: 'info 1',
    images: {
      male: '../assets/scene1.png',
      female: '../assets/scene1.png'
    },
    texts: {
      male: 'Detective John arrives at the office.',
      female: 'Detective Jane arrives at the office.'
    },
    actions: {}
  },
  // Screen 2
  {
    id: 'screen-2',
    title: 'Introduction',
    info: 'info 2',
    images: {
      male: '../assets/scene2.png',
      female: '../assets/scene2.png'
    },
    texts: {
      male: 'male 2',
      female: 'female 2'
    },
    actions: {}
  },
  // Screen 3: игра начинается, первый выбор
  {
    id: 'screen-3',
    title: 'Case',
    info: 'info 3',
    images: {
      male: '../assets/scene3-1.png',
      female: '../assets/scene3-2.png'
    },
    texts: {
      male: 'Хочет поговорить только с мужичной',
      female: 'Не хочет разговаривать с женщиной'
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
    title: 'Case',
    info: 'info 3',
    images: {
      male: '../assets/scene3-3.png',
      female: '../assets/scene3-3.png'
    },
    texts: {
      male: 'John examines the crime scene.',
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
    title: 'Case',
    info: 'info 3',
    images: {
      male: '../assets/scene3-4.png',
      female: '../assets/scene3-4.png'
    },
    texts: {
      male: 'John examines the crime scene.',
      female: 'Jane examines the crime scene.'
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
    title: 'Introduction',
    info: 'info 2',
    images: {
      male: '',
      female: ''
    },
    texts: {
      male: 'male 2',
      female: 'female 2'
    },
    actions: {},
    relationshipThreshold: -1,
    disableGenderSelection: true
  },
  // Screen 5-2: отказ от адалта, принятие заказа
  {
    id: 'screen-5-2',
    title: 'Introduction',
    info: 'info 2',
    images: {
      male: '../assets/scene3-4.png',
      female: '../assets/scene3-4.png'
    },
    texts: {
      male: 'male 2',
      female: 'female 2'
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
    title: 'Bad Wrap Up',
    images: {
      male: '../assets/scene4-1.png',
      female: '../assets/scene4-1.png'
    },
    texts: {
      male: 'John feels the partnership is strained.',
      female: 'Jane feels the partnership is strained.'
    },
    actions: {},
    customScripts: [
      {
        id: 'magnifier',
        options: {
          image: '../assets/scene4-2.png',
          label: 'Open spyglass view',
          closeLabel: 'Close spyglass view'
        }
      }
    ],
    disableGenderSelection: true
  }
];