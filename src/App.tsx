import { useCallback, useEffect, useState } from '@lynx-js/react'

import './App.css'


const vn_words = [
  {
    "vn": "xin chào",
    "en": "hello"
  },
  {
    "vn": "cảm ơn",
    "en": "thank you"
  },
  {
    "vn": "tạm biệt",
    "en": "goodbye"
  },
  {
    "vn": "vâng",
    "en": "yes"
  },
  {
    "vn": "không",
    "en": "no"
  },
  {
    "vn": "ăn",
    "en": "eat"
  },
  {
    "vn": "uống",
    "en": "drink"
  },
  {
    "vn": "đẹp",
    "en": "beautiful"
  },
  {
    "vn": "yêu",
    "en": "love"
  },
  {
    "vn": "bạn",
    "en": "friend / you"
  }
]


export function App() {

  const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  const [show, setShow] = useState<boolean>(false)
  const [word, setWord] = useState(() => randomItem(vn_words));


  const translate = () => {
    setShow(!show)
  }

  const nextWord = () => {
    setShow(false)
    setWord(randomItem(vn_words))
  }

  useEffect(() => {
    console.info('word')
  }, [])

  return (
      <view className='w-2/3 mt-8 mx-auto'>
        <text className="text-xl mx-auto">{show ? word.vn : word.en}</text>
        <view bindtap={translate} className='mx-auto text-white bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
          <text>Translate</text>
        </view>
        <view bindtap={nextWord} className='mx-auto text-white bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
          <text>Next</text>
        </view>
      </view>
  )
}
