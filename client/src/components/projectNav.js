import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import '../styles/updateProjects.css'
function ProjectNav ({ update }) {
  const [selectedOption, setSelectedOption] = useState('updates')
  console.log(update)
  return (
    <div>
      <button onClick={() => setSelectedOption('coments')}>Coments</button>
      <button onClick={() => setSelectedOption('updates')}>Updates</button>
      <div>
      {selectedOption === 'updates'
        ? (
          <div className='updateContainer'>
            {update && update.map((el) => (
              <div key={el._id} className='updateInfo'>
                <div className='imageOrvideoDiv'>
                  {el.video
                    ? (<ReactPlayer url={el.video} className='video'/>)
                    : (
                      <div className="imageDivUpdate"
                      style={{ backgroundImage: `url(https://res.cloudinary.com/dn1tvs94e/image/upload/v1681997706/${el.image}.jpg)` }}
                      ></div>
                      )}
                </div>
                  <div className='updateTitleDescription'>
                    <h1>Update {update.indexOf(el) + 1}: {el.title}</h1>
                  </div>
                <div className='updateTitleDescription'>
                  <p>{el.description}</p>
                  <h3>{el.date}</h3>
                </div>
              </div>
            ))}
          </div>
          )
        : <h1>Coments</h1>

      }
      </div>
    </div>
  )
}

ProjectNav.propTypes = {
  update: PropTypes.array
}

export default ProjectNav
