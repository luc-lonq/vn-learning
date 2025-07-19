import { useNavigate } from "react-router";

export function Navigation() {
    const nav = useNavigate();

    return (
        <view className='fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200'>
            <view className='grid h-full max-w-lg grid-cols-2 mx-auto font-medium'>
                <view
                    bindtap={() => nav('/')}
                    className='inline-flex flex-col items-center justify-center px-5'
                >
                    <text className='text-sm text-gray-500'>
                        App
                    </text>
                </view>
                <view
                    bindtap={() => nav('/words')}
                    className='inline-flex flex-col items-center justify-center px-5'
                >
                    <text className='text-sm text-gray-500'>
                        Words
                    </text>
                </view>
            </view>
        </view>
    )
}
