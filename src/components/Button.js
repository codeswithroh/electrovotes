import React from 'react'
import '../pages/ViewPoll.css';

export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className='view-poll-button px-3 py-2'>{children}</button>
    )
}
