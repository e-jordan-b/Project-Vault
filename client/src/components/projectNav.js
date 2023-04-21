import React, { useState } from 'react'

function ProjectNav () {
  const [selectedOption, setSelectedOption] = useState('updates')

  return (
    <div>
      <button onClick={() => setSelectedOption('coments')}>Coments</button>
      <button onClick={() => setSelectedOption('updates')}>Updates</button>
      <div>
      {selectedOption === 'updates'
        ? (
        <h1>Updates</h1>
          )
        : <h1>Coments</h1>

      }
      </div>
    </div>
  )
}

export default ProjectNav
