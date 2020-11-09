import React from 'react';
import Editor from '../../../../../../../Style/Editor';
import './LogMeetingBody.scss';




const LogMeetingBody = (props)=>{

    return(
        <div className ='logMeeting__body'>
            <Editor placeholder= 'Describe the Meeting'
                    handleEditorChange = {props.handleEditorChange}/>
        </div>
    )
}


export default LogMeetingBody;