import React from 'react';
import './EmailInput.scss';
import Editor from '../../../../../../../../Style/Editor/Editor';

const EmailInput = ({
  children,
  handleEditorChange
}) => (

  <div className="EmailInput">
    <Editor   placeholder="Describe the Email"
              handleEditorChange = {handleEditorChange}/>
  </div>

);

export default EmailInput;
