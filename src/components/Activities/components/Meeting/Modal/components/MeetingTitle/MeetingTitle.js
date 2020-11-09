import React from 'react';
import './MeetingTitle.scss';



const MeetingTitle = ({
    onTitleChange,
}) => {
    return (
        <div className="meetingTitle">
            <input className="meetingTitle__input"
                placeholder={"what are you meeting for"}
                onChange={(event) => {
                    onTitleChange(event.target.value);
                }} />
        </div>
    );
}

export default MeetingTitle;
