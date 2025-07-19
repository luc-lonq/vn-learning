import {useEffect, useState} from "@lynx-js/react";
import {getAllWords, type Word} from "../services/wordService.js";
import {Navigation} from "../components/Navigation.js";
import {WordAdd} from "../components/WordAdd.js";


export function Words() {

    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddWord, setShowAddWord] = useState(false);

    useEffect(() => {
        getAllWords().then((words) => {
            setWords(words);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const handleAddWord = () => {
        if(showAddWord) {
            getAllWords().then((words) => {
                setWords(words);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
            setShowAddWord(false);
        }
        else {
            setShowAddWord(true);
        }
    }

    if (loading) return <text>Loading...</text>;

    return (
        <view className='mt-20 mx-auto w-5/6'>
            {
                showAddWord 
                ? <WordAdd onClose={() => handleAddWord()} />
                :    
                <view className='text-white bg-green-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2'>
                    <text bindtap={handleAddWord}>Ajouter un nouveau mot</text>
                </view>
            }
            <list
                scroll-orientation='vertical'
                list-type='single'
                span-count={1}
                className='w-full h-screen grid gap-4 p-2 bg-yellow-200'
            >
                {
                    words.map((word, i) => {
                        return (
                            <list-item
                                item-key={`list-item-${i}`}
                                key={`list-item-${i}`}
                            >
                                <view>
                                    <text className='text-2xl'>{word.vn}</text>
                                    <text className='text text-gray-600'>{word.translation}</text>
                                </view>
                            </list-item>
                        );
                    })
                }
            </list>

            <Navigation/>
        </view>
    )
}