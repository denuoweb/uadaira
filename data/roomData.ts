export const mockRoomData = [
  {
    id: 'room1',
    name: '松 (Matsu)',
    nameEn: 'Pine Room',
    type: 'traditional',
    price: 12000,
    capacity: 2,
    size: 18, // size in square meters
    description: '畳の香りが心地よい伝統的な和室。窓から季節の移ろいを感じることができる、落ち着いた空間です。',
    descriptionEn: 'A traditional tatami room with the calming scent of straw mats. A peaceful space where you can feel the changing seasons through the window.',
    amenities: ['futon', 'private-bath', 'aircon', 'wifi', 'tea-set'],
    images: [
      'https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg',
      'https://images.pexels.com/photos/6492404/pexels-photo-6492404.jpeg'
    ],
    available: true
  },
  {
    id: 'room2',
    name: '竹 (Take)',
    nameEn: 'Bamboo Room',
    type: 'traditional',
    price: 15000,
    capacity: 3,
    size: 24,
    description: '広々とした和室と縁側が特徴の客室。夏は涼しく、冬は暖かい快適な空間で、自然と一体になれる贅沢なひとときを。',
    descriptionEn: 'A spacious tatami room with a veranda. A comfortable space that stays cool in summer and warm in winter, offering luxurious moments of unity with nature.',
    amenities: ['futon', 'private-bath', 'aircon', 'wifi', 'tea-set', 'private-veranda'],
    images: [
      'https://images.pexels.com/photos/6492395/pexels-photo-6492395.jpeg',
      'https://images.pexels.com/photos/6492396/pexels-photo-6492396.jpeg'
    ],
    available: true
  },
  {
    id: 'room3',
    name: '梅 (Ume)',
    nameEn: 'Plum Room',
    type: 'modern',
    price: 14000,
    capacity: 2,
    size: 20,
    description: '和と洋を融合させたモダンな客室。ベッドで快適に眠りながらも、日本の美意識を感じられる洗練された空間です。',
    descriptionEn: 'A modern room that fuses Japanese and Western styles. A sophisticated space where you can sleep comfortably in a bed while experiencing Japanese aesthetics.',
    amenities: ['bed', 'private-bath', 'aircon', 'wifi', 'tv', 'refrigerator'],
    images: [
      'https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg',
      'https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg'
    ],
    available: true
  },
  {
    id: 'room4',
    name: '桜 (Sakura)',
    nameEn: 'Cherry Blossom Room',
    type: 'modern',
    price: 16000,
    capacity: 3,
    size: 26,
    description: '明るく開放的な雰囲気の客室。ゆったりとしたベッドと和のテイストを取り入れたインテリアで、寛ぎのひとときをお過ごしいただけます。',
    descriptionEn: 'A room with a bright and open atmosphere. Enjoy relaxing moments with a spacious bed and interior with Japanese touches.',
    amenities: ['bed', 'private-bath', 'aircon', 'wifi', 'tv', 'refrigerator', 'sofa'],
    images: [
      'https://images.pexels.com/photos/6186830/pexels-photo-6186830.jpeg',
      'https://images.pexels.com/photos/6186829/pexels-photo-6186829.jpeg'
    ],
    available: true
  },
  {
    id: 'room5',
    name: '椿 (Tsubaki)',
    nameEn: 'Camellia Shared Room',
    type: 'shared',
    price: 5500,
    capacity: 1,
    size: 30, // total room size
    description: '清潔で快適な共有スペース。プライバシーに配慮した個別ベッドで、旅の疲れを癒すことができます。共用バスルームとラウンジをご利用いただけます。',
    descriptionEn: 'A clean and comfortable shared space. Rest from your journey in individual beds designed with privacy in mind. Shared bathroom and lounge available.',
    amenities: ['shared-bath', 'aircon', 'wifi', 'shared-lounge', 'lockers'],
    images: [
      'https://images.pexels.com/photos/2747901/pexels-photo-2747901.jpeg',
      'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg'
    ],
    available: true
  }
];