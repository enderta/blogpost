import React from 'react'
import { useParams } from 'react-router-dom'

function Read() {
    const { id } = useParams();
    return (
        <div>
            id: {id}
        </div>
    )
}

export default Read