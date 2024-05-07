export const TextComponent = () => {
    return (
        <div className="px-5 w-[40%]">
            <p className="text-[60px] text-gray-300">
                <span className="text-[100px]"> Only</span>{' '}
                <span className="text-red-600 text-[180px]">20%</span>{' '}
                <p className="text-[60px]">of waste water is treated</p>
            </p>
            <p className="text-[20px] text-gray-300 font-bold">
                The average family can waste{' '}
                <span className="text-red-600 font-extrabold text-[30px]">
                    180
                </span>{' '}
                gallons per week, or{' '}
                <span className="text-red-600 font-extrabold text-[30px]">
                    9,400
                </span>{' '}
                gallons of water annually, from household leaks.
            </p>
        </div>
    )
}
