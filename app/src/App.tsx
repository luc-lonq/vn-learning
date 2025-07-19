import { useEffect, useState } from '@lynx-js/react'
import {getAllWords, createWord, type Word} from "./services/wordService.js";

import './App.css'

export function App() {

    const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

    const [words, setWords] = useState<Word[]>([]);
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [showVn, setShowVn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);
    const [newWordVn, setNewWordVn] = useState<string>('null');
    const [newWordTranslation, setNewWordTranslation] = useState<string>('null');
    const [wordAdded, setWordAdded] = useState<boolean>(false);

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

    const addWord = () => {
        if (newWordVn && newWordTranslation) {

            const newWord = {
                vn: newWordVn,
                translation: newWordTranslation
            };
            try {
                createWord(newWord).then(r => {
                    console.log("Mot ajouté :", r);
                    setWordAdded(true)
                    getAllWords().then((words) => {
                        setWords(words);
                        setCurrentWord(randomItem(words));
                        setLoading(false);
                    }).catch((err) => {
                        console.error(err);
                        setLoading(false);
                    });
                });
            } catch (error) {
                console.error("Erreur lors de l'ajout :", error);
            }
        }
    }

    const vnHandle = (event: any) => {
        setNewWordVn(event.detail.value);
    }

    const translationHandle = (event: any) => {
        setNewWordTranslation(event.detail.value);
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
            <view className='flex flex-col items-center justify-center mx-auto mt-4 gap-4'>
                <input
                    // @ts-ignore
                    bindinput={vnHandle}
                    className='bg-gray-50 border border-gray-300 text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    placeholder='Vietnamien'
                    value={newWordVn}
                />
                <input
                    // @ts-ignore
                    bindinput={translationHandle}
                    className='bg-gray-50 border border-gray-300 text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    placeholder='Traduction'
                    value={newWordTranslation}
                />
                <view
                    bindtap={addWord}
                    className='flex flex-col items-center justify-center mx-auto w-full h-full text-white bg-blue-400 font-medium rounded-lg px-5 py-2.5 me-2 mb-2'
                >
                    <text className='text-xl text-center'>Ajouter</text>
                </view>
                {
                    wordAdded ? (
                        <text className='text-sm text-center my-auto'>
                            Mot ajouté
                        </text>
                    ) : null
                }
            </view>
        </view>
    )
}
