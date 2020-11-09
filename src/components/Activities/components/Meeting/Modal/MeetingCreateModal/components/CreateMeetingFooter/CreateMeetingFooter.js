import React from 'react';
import Button from '../../../../../../../Style/Button/Modal/Button';
import TaskFollow from '../../../../../../../Modal/components/Private/TaskFollow';



const CreateMeetingFooter = (props) => (
    <div className="createMeeting__footer">
        <div className="createMeeting__footer__send">
            <Button size = 'small' 
                    variant = 'contained'
                    btnDisable = {props.btnDisable}
                    onClick = {props.onClick}>
                Save
            </Button>
        </div>
        <div className="createMeeting__footer__taskFollow">
            <TaskFollow />
        </div>
    </div>
)


export default CreateMeetingFooter;