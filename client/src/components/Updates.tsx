import React from 'react';
import ReactPlayer from 'react-player';
import '../styles/updateProjects.css';
import { ProjectUpdate } from '../types/project.type';

function Updates({ updates }: { updates: ProjectUpdate[] | undefined }) {
  return (
    <div className='updateContainer'>
      {updates &&
        updates.map(
          ({ _id, video, image, title, description, date }: ProjectUpdate) => (
            <div
              key={_id}
              className='updateInfo'
            >
              <div className='imageOrvideoDiv'>
                {video ? (
                  <ReactPlayer
                    url={video}
                    className='video'
                  />
                ) : (
                  <div
                    className='imageDivUpdate'
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${image}.jpg)`,
                    }}
                  ></div>
                )}
              </div>
              <div className='updateTitleDescription'>
                <h1>
                  Update{' '}
                  {updates.indexOf({
                    _id,
                    video,
                    image,
                    title,
                    description,
                    date,
                  }) + 1}
                  : {title}
                </h1>
              </div>
              <div className='updateTitleDescription'>
                {description && (
                  <p dangerouslySetInnerHTML={{ __html: description }}></p>
                )}
                <h3>{date}</h3>
              </div>
            </div>
          )
        )}
    </div>
  );
}

export default Updates;
