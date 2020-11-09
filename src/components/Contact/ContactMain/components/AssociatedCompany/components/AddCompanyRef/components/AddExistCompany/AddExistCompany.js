import React from 'react';
import CompanySelector from '../../../../../../../../Selector/CompanySelector';

import './AddExistCompany.scss';

const AddExistCompany = ({
  handleSelectedCompany,
}) => (
  <div>
    <CompanySelector handleSelectedCompany={handleSelectedCompany} />
  </div>
);

export default AddExistCompany;
