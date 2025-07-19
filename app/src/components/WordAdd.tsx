import {useState} from "@lynx-js/react";
import {createWord} from "../services/wordService.js";
import {Button} from "./Button.js";


export function WordAdd({ onClose }: { onClose: () => void }) {
    const [vn, setVn] = useState<string>('null');
    const [translation, setTranslation] = useState<string>('null');

    const addWord = async () => {
        if (vn && translation) {
            const newWord = {
                vn: vn,
                translation: translation
            };
            try {
                await createWord(newWord).then(() => {
                    onClose()
                });
            } catch (error) {
                console.error("Erreur lors de l'ajout :", error);
            }
        }
    }

    const vnHandle = (event: any) => {
        setVn(event.detail.value);
    }

    const translationHandle = (event: any) => {
        setTranslation(event.detail.value);
    }

    return (
        <view className='flex flex-col items-center justify-center mx-auto mt-4 gap-4'>
            <input
                // @ts-ignore
                bindinput={vnHandle}
                className='bg-gray-50 border border-gray-300 text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder='Vietnamien'
            />
            <input
                // @ts-ignore
                bindinput={translationHandle}
                className='bg-gray-50 border border-gray-300 text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder='Traduction'
            />
            <Button onPress={addWord} text={'Ajouter'} colorClass={'bg-blue-400'} />
        </view>
    )
}