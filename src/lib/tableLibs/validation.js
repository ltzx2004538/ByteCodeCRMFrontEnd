const testPhoneNum = (str) => {
  const reg = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(|-){0,1}[0-9]{2}(|-){0,1}[0-9]{2}(|-){0,1}[0-9]{1}(|-){0,1}[0-9]{3}$/;
  return reg.test(str);
};

const testEmailAddr = (str) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(str).toLowerCase());
};

// for dd/mm/yyyy format
const testDate = (str) => {
  const reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  return reg.test(String(str));
};

const testEmptyString = (str) => str === undefined || str === '';

export {
  testPhoneNum, testEmailAddr, testDate, testEmptyString,
};
