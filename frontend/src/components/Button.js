import React from 'react'

const Button = ({ onClick, className, icon: IconComponent, disabled = false }) => {
    return (
        <div
            className={`rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl hover:bg-blue-700 transition-transform transform hover:scale-105 ${disabled ? 'pointer-events-none opacity-40' : ''} ${className}`}
            onClick={!disabled ? onClick : undefined}
        >
            {IconComponent && <IconComponent />}
        </div>

    )
}

export default Button