import { useEffect, useState } from '@lynx-js/react'
import {getAllWords, type Word} from "./services/wordService.js";
import {Navigation} from "./components/Navigation.js";
import './App.css'
import {Button} from "./components/Button.js";

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
        <view className='mt-16 mx-auto w-5/6'>
            <view
                bindtap={translate}
                className='flex flex-col items-center justify-center mx-auto h-96 border border-gray-200 shadow-lg rounded-2xl'
            >
                <text className='text-6xl text-center my-auto'>
                    {currentWord ? showVn ? currentWord.vn : currentWord.translation : ''}
                </text>
            </view>
            <view className='grid grid-cols-2 gap-2 items-center justify-center mx-auto mt-4'>
                <Button onPress={nextWord} text={'Je sais'} colorClass={'bg-green-400'}/>
                <Button onPress={nextWord} text={'Je ne sais pas'} colorClass={'bg-red-400'}/>
            </view>
            <Navigation />
        </view>
    )
}
