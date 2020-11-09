import React from 'react';
import DatePicker from '../../../../../Style/Picker/DatePicker';
import TimePicker from '../../../../../Style/Picker/TimePicker';
import DurationDropDown from "../DurationDropDown/DurationDropDown";
import { transferTimeHHMM } from "../../../../../services/timeManager";
import ContactSelector from '../../../../../Selector/ContactSelector';
import './CreateMeetingMain.scss';
/**/

const contactSelectHint = "Logged Meetings must have at Least one association";
const CreateMeetingCardMain = ({
    currentTime,
    currentDate,
    meetingDuration,
    onDateChange,
    onTimeChange,
    onDurationChange,
    handleAddContact,
    handleDeleteContact,
    contact,
    userId,
    contactList,
}) => (
        <div className="meetingCardBody">
            <div className='meetingCardBody__container'>
                <div className="cardLabel">
                    Contacted
                </div>
            <ContactSelector contactList = {contactList}
                            contact = {contact}
                            userId = {userId}
                            contactSelectHint = {contactSelectHint}
                            variant = "activity"
                            handleAddContact = {handleAddContact}
                            handleDeleteContact = {handleDeleteContact}/>
            </div>
            <div className='meetingCardBody__container'>
                <div className="cardLabel">
                    Date
                </div>
                <div className='meetingCardBody__container__picker'>
                    <DatePicker defaultDate={currentDate}
                        onDateChange={onDateChange}/>
                </div>
            </div>
            <div className='meetingCardBody__container'>
                <div className="cardLabel">
                    Time
                </div>
                <div className='meetingCardBody__container__picker'>
                    <TimePicker defaultTime={transferTimeHHMM(currentTime)}
                        onTimeChange={onTimeChange} />
                </div>
            </div>
            <div className='meetingCardBody__container'>
            <div className="cardLabel">
              Duration
             </div>
            <DurationDropDown defaultValue={meetingDuration}
                          onDurationChange = {onDurationChange}/>
          </div>
        </div>
    )

export default CreateMeetingCardMain;