import { FaDroplet } from 'react-icons/fa6'

export const Loader = () => {
    return (
        <div>
            <div
                className=" flex flex-col justify-center items-center w-full h-screen"
                style={{
                    backgroundImage: 'url(/src/assets/mountain.jpg)',
                    backgroundSize: 'cover',
                }}
            >
                <FaDroplet className="animate-bounce w-24 h-12 text-white" />
                <p className="text-white font-bold">Please Wait</p>
            </div>
        </div>
    )
}
