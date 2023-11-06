import React from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Edit() {
    
    const { id } = useParams();

  return (
    <div>
         <Button style={{ margin: "10px", float:"right" }} variant="danger" onClick={() => window.location.href = "/home"}>Back</Button> 
      id: {id}
    </div>
  )
}

export default Edit
