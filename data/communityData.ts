export const mockAnnouncementData = [
  {
    id: 'announcement1',
    title: '電話詐欺に注意',
    titleEn: 'Warning: Phone Scams',
    content: '最近、高森町で電話詐欺が増加しています。知らない番号からの電話には十分注意し、個人情報や銀行情報を教えないでください。不審な電話があった場合は、すぐに警察に連絡してください。',
    contentEn: 'Recently, there has been an increase in phone scams in Takamori. Please be cautious of calls from unknown numbers and never share personal or banking information. If you receive a suspicious call, please contact the police immediately.',
    type: 'warning',
    date: '2025-06-10T10:00:00',
    author: 'ゆきみ'
  },
  {
    id: 'announcement2',
    title: '夏のイベントスケジュール',
    titleEn: 'Summer Event Schedule',
    content: '2025年夏のイベントスケジュールが決定しました。瞑想、料理教室、伝統工芸など、様々なワークショップをご用意しています。詳細はイベントカレンダーをご確認ください。早めの予約をおすすめします。',
    contentEn: 'The event schedule for Summer 2025 has been decided. We have prepared various workshops including meditation, cooking classes, and traditional crafts. Please check the event calendar for details. Early reservations are recommended.',
    type: 'info',
    date: '2025-06-08T15:30:00',
    author: 'ゆきみ'
  },
  {
    id: 'announcement3',
    title: '新しい施設のご案内',
    titleEn: 'New Facility Announcement',
    content: 'うえだいらハウスに新しいリラクゼーションルームがオープンしました。アロマセラピー、マッサージ、瞑想などのサービスをご利用いただけます。詳細は受付にお問い合わせください。',
    contentEn: 'A new relaxation room has opened at Uedaira House. You can enjoy services such as aromatherapy, massage, and meditation. Please contact the reception for details.',
    type: 'info',
    date: '2025-06-05T09:00:00',
    author: 'ゆきみ'
  },
  {
    id: 'announcement4',
    title: '夏季休業のお知らせ',
    titleEn: 'Summer Holiday Notice',
    content: '8月15日から17日まで、施設のメンテナンスのため休業いたします。ご不便をおかけしますが、ご理解のほどよろしくお願いいたします。',
    contentEn: 'We will be closed from August 15 to 17 for facility maintenance. We apologize for any inconvenience and appreciate your understanding.',
    type: 'info',
    date: '2025-06-01T11:45:00',
    author: 'ゆきみ'
  }
];

export const mockShoutboardData = [
  {
    id: 'message1',
    content: '昨日の瞑想ワークショップに参加しました。とても心が落ち着きました。ゆきみさん、ありがとうございました！',
    contentEn: 'I participated in the meditation workshop yesterday. It was very calming. Thank you, Yukimi!',
    user: {
      name: '田中 直子',
      nameEn: 'Naoko Tanaka',
      profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      isGuest: false
    },
    date: '2025-06-10T18:23:00',
    likes: 5,
    replies: 1
  },
  {
    id: 'message2',
    content: '次回のキャンバスワークショップの日程を教えてください。前回参加できなくて残念でした。',
    contentEn: 'Please let me know the schedule for the next Canvas workshop. I was sorry to miss the last one.',
    user: {
      name: '佐藤 健太',
      nameEn: 'Kenta Sato',
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      isGuest: false
    },
    date: '2025-06-09T10:15:00',
    likes: 0,
    replies: 1
  },
  {
    id: 'message3',
    content: '今週末の花火大会、うえだいらハウスのテラスから見る予定です。楽しみですね！',
    contentEn: 'For this weekend\'s fireworks festival, I plan to watch from the terrace of Uedaira House. Looking forward to it!',
    user: {
      name: '山本 美咲',
      nameEn: 'Misaki Yamamoto',
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      isGuest: false
    },
    date: '2025-06-08T21:05:00',
    likes: 8,
    replies: 2
  },
  {
    id: 'message4',
    content: '先週宿泊しました。静かな環境と美味しい料理、とても良かったです。また利用したいです。',
    contentEn: 'I stayed last week. The quiet environment and delicious food were wonderful. I would like to visit again.',
    user: {
      name: '高橋 誠',
      nameEn: 'Makoto Takahashi',
      profileImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      isGuest: true
    },
    date: '2025-06-07T14:30:00',
    likes: 3,
    replies: 1
  },
  {
    id: 'message5',
    content: '近くに良いハイキングコースはありますか？自然を楽しみながら軽く運動したいです。',
    contentEn: 'Are there any good hiking courses nearby? I would like to exercise lightly while enjoying nature.',
    user: {
      name: '伊藤 春香',
      nameEn: 'Haruka Ito',
      profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      isGuest: false
    },
    date: '2025-06-06T09:45:00',
    likes: 2,
    replies: 3
  }
];