import React from 'react'

export default function alert(props: string) {
    return (
        <>
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                <p className="font-bold">{props}</p>
                <p>Some additional text to explain said message.</p>
            </div>

        </>
    )
}
