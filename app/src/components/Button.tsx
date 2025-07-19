export function Button({ onPress, text, colorClass }: { onPress: () => void; text: string; colorClass: string }) {
    return (
        <view
            bindtap={onPress}
            className={`${colorClass} flex flex-col items-center justify-center mx-auto w-full h-full text-white font-medium rounded-lg px-5 py-2.5 me-2 mb-2`}
        >
            <text className='text-xl text-center'>{text}</text>
        </view>
    )
}