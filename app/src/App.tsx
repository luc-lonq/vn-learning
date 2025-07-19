import { useEffect, useState } from '@lynx-js/react'
import {getAllWords, type Word} from "./services/wordService.js";

import './App.css'

export function App() {

    const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

    const [words, setWords] = useState<Word[]>([]);
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [showVn, setShowVn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getAllWords().then((words) => {
            setWords(words);
            setCurrentWord(randomItem(words));
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const translate = () => {
        setShowVn(!showVn)
    }

    const nextWord = () => {
        setShowVn(false)
        setCurrentWord(randomItem(words))
    }

    if (loading) return <text>Loading...</text>;

    return (
      <view className='w-2/3 mt-8 mx-auto'>
        <text className="text-xl mx-auto">{currentWord ? showVn ? currentWord.vn : currentWord.translation : ''}</text>
        <view bindtap={translate} className='mx-auto text-white bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
          <text>Translate</text>
        </view>
        <view bindtap={nextWord} className='mx-auto text-white bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
          <text>Next</text>
        </view>
      </view>
    )
}
