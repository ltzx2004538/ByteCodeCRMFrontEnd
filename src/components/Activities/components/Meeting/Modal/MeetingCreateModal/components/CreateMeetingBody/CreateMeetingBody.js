import React from 'react';
import Editor from '../../../../../../../Style/Editor';
import './CreateMeetingBody.scss';




const MeetingCreateBody = (props)=>{

    return(
        <div className ='createMeeting__body'>
            <Editor placeholder= 'Describe the Meeting'
                    handleEditorChange = {props.handleEditorChange}/>
        </div>
    )
}


export default MeetingCreateBody;