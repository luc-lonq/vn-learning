import {useEffect, useState} from "@lynx-js/react";
import {getAllWords, type Word} from "../services/wordService.js";
import {Navigation} from "../components/Navigation.js";
import {WordAdd} from "../components/WordAdd.js";
import {Button} from "../components/Button.js";


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

    if (loading) return <view/>;

    return (
        <view className='mt-16 mx-auto w-5/6'>
            {
                showAddWord 
                ? <WordAdd onClose={() => handleAddWord()} />
                : <Button onPress={handleAddWord} text={'Ajouter un mot'} colorClass={'bg-blue-400'} />
            }
            <list
                scroll-orientation='vertical'
                list-type='single'
                span-count={1}
                className='w-full h-screen grid gap-4 p-2'
            >
                {
                    words.map((word, i) => {
                        return (
                            <list-item
                                item-key={`list-item-${i}`}
                                key={`list-item-${i}`}
                            >
                                <view className='grid grid-cols-2'>
                                    <view>
                                        <text className='text-2xl'>{word.vn}</text>
                                        <text className='text text-gray-600'>{word.translation}</text>
                                    </view>
                                    <view className='my-auto w-full'>
                                        <view class='flex justify-between mb-1'>
                                            <text className='text-base font-medium text-blue-700'>{word.success}/{word.fail}</text>
                                            <text className='text-sm font-medium text-blue-700'>
                                                {
                                                    word.success == 0 && word.fail == 0
                                                        ? 0
                                                        : Math.round(word.success / (word.success + word.fail) * 100)
                                                }%
                                            </text>
                                        </view>
                                        <view className='w-full bg-gray-200 rounded-full h-2.5'>

                                            <view className='bg-blue-600 h-2.5 rounded-full' style={
                                                `width: ${
                                                    word.success == 0 && word.fail == 0
                                                    ? 0
                                                    : word.success / (word.success + word.fail) * 100
                                                }%`
                                            }
                                            ></view>
                                        </view>
                                    </view>
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