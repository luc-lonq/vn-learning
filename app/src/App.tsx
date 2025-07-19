import { useEffect, useState } from '@lynx-js/react'
import {getAllWords, type Word} from "./services/wordService.js";
import {Navigation} from "./components/Navigation.js";
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
        <view className='mt-20 mx-auto w-5/6'>
            <view
                bindtap={translate}
                className='flex flex-col items-center justify-center mx-auto h-96 border border-gray-200 shadow-lg rounded-2xl'
            >
                <text className='text-6xl text-center my-auto'>
                    {currentWord ? showVn ? currentWord.vn : currentWord.translation : ''}
                </text>
            </view>
            <view className='grid grid-cols-2 gap-2 items-center justify-center mx-auto mt-4'>
                <view
                    bindtap={nextWord}
                    className='flex flex-col items-center justify-center mx-auto w-full h-full text-white bg-green-400 font-medium rounded-lg px-5 py-2.5 me-2 mb-2'
                >
                    <text className='text-xl text-center'>Je sais</text>
                </view>
                <view
                    bindtap={nextWord}
                    className='flex flex-col items-center justify-center mx-auto w-full h-full text-white bg-red-400 font-medium rounded-lg px-5 py-2.5 me-2 mb-2'
                >
                    <text className='text-xl text-center'>Je ne sais pas</text>
                </view>
            </view>
            <Navigation />
        </view>
    )
}
