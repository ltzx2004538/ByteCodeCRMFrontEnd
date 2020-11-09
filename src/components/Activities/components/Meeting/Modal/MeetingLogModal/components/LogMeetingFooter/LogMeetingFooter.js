import React from 'react';
import Button from '../../../../../../../Style/Button/Modal/Button';
import TaskFollow from '../../../../../../Private/TaskFollow';
import './LogMeetingFooter.scss';



const LogMeetingFooter = (props) => (
    <div className="logMeeting__footer">
        <div className="logMeeting__footer__send">
            <Button size = 'small' 
                    variant = 'contained'
                    btnDisable = {props.btnDisable}
                    onClick = {props.onClick}>
                Log activity
            </Button>
        </div>
        <div className="logMeeting__footer__taskFollow">
            <TaskFollow />
        </div>
    </div>
)


export default LogMeetingFooter;