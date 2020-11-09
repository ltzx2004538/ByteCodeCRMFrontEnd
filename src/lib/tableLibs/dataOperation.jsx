import React from "react";
import {
  testPhoneNum,
  testEmailAddr,
  testDate,
  testEmptyString,
} from "../../lib/tableLibs/validation";
import JumpButton from "../../components/List/components/TableWrapper/components/EnhancedTable/components/JumpButton";
import getDate from "./getDate";

const LEAD_STATUS = {
  1: "New",
  2: "Open",
  3: "In progress",
  4: "Open deal",
  5: "Unqualified",
  6: "Attempted to contact",
  7: "Connected",
  8: "Bad timing",
};

const LEAD_STATUS_BACK = {
  New: 1,
  Open: 2,
  "In progress": 3,
  "Open deal": 4,
  Unqualified: 5,
  "Attempted to contact": 6,
  Connected: 7,
  "Bad timing": 8,
};

/* ====================================CSV========================================== */
function handleCsv(text, type) {
  // empty table
  if (text.split("\n").length < 2) {
    return [];
  }
  const fields = text.split("\n")[0].split(",");
  const data = text.split("\n").slice(1);
  const result = [];
  if (type === "contact") {
    // wrong table
    if (
      fields.includes("city") ||
      fields.includes("country") ||
      fields.includes("industry") ||
      fields.includes("last logged call date")
    ) {
      return [];
    }
    for (let item of data) {
      item = item.split(",");
      let cur = {};
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].localeCompare("name") === 0) {
          if (!testEmptyString(item[i]) && item[i].split(" ").length > 1) {
            cur.firstName = item[i].split(" ")[0];
            cur.lastName = item[i].split(" ")[item[i].split(" ").length - 1];
          } else {
            break;
          }
        } else if (fields[i].localeCompare("email") === 0) {
          if (testEmailAddr(item[i])) {
            cur.email = item[i];
          } else {
            break;
          }
        } else if (fields[i].localeCompare("phone number") === 0) {
          if (item[i].startsWith("61") && testPhoneNum("+" + item[i])) {
            cur.phoneNo = "+" + item[i];
          } else {
            const phoneNum = "0" + item[i];
            testPhoneNum(phoneNum) && (cur.phoneNo = phoneNum);
          }
        } else if (fields[i].localeCompare("last activity date") === 0 && testDate(item[i])) {
          cur.lastActivityDate = item[i];
        } else if (fields[i].localeCompare("create date") === 0 && testDate(item[i])) {
          cur.createDate = item[i];
        } else if (
          fields[i].localeCompare("lead status") === 0 &&
          Object.values(LEAD_STATUS).includes(item[i])
        ) {
          cur.leadStatus = item[i];
        }
      }
      if (cur.email && cur.firstName && cur.lastName) {
        cur.createDate = getDate();
        result.push(cur);
      }
    }
  } else {
    // wrong table
    if (
      fields.includes("lead status") ||
      fields.includes("create date") ||
      fields.includes("last activity date")
    ) {
      return [];
    }
    for (let item of data) {
      item = item.split(",");
      let cur = {};
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].localeCompare("name") === 0) {
          if (!testEmptyString(item[i])) {
            cur.name = item[i];
          } else {
            break;
          }
        } else if (fields[i].localeCompare("phone number") === 0) {
          if (item[i].startsWith("61") && testPhoneNum("+" + item[i])) {
            cur.phoneNumber = "+" + item[i];
          } else {
            const phoneNum = "0" + item[i];
            testPhoneNum(phoneNum) && (cur.phoneNumber = phoneNum);
          }
        } else if (
          fields[i].localeCompare("last logged call date") === 0 &&
          testDate(item[i])
        ) {
          cur.lastLoggedCallDate = item[i];
        } else if (fields[i].localeCompare("city") === 0) {
          cur.city = item[i];
        } else if (fields[i].localeCompare("country") === 0) {
          cur.country = item[i];
        } else if (fields[i].localeCompare("industry") === 0) {
          cur.industry = item[i];
        }
      }
      if (cur.name) {
        result.push(cur);
      }
    }
  }
  return result;
}

/* ====================================GET========================================== */
function wrapUpData(rowData, type) {
  let data = JSON.parse(JSON.stringify(rowData));
  if (type === "contact") {
    for (let item of data) {
      if (item.name.length > 17) {
        item.name = item.name.slice(0, 17) + "...";
      }
      if (item.associatedCompany && item.associatedCompany.length > 17) {
        item.associatedCompany = item.associatedCompany.slice(0, 17) + "...";
      }
    }
    return data.map((cur) => ({
      name: (
        <JumpButton
          key={cur.contactID}
          id={cur.contactID}
          type="contact"
          name={cur.name}
        />
      ),
      contactID: cur.contactID,
      companyID: cur.companyID,
      email: cur.email,
      phoneNumber: cur.phoneNumber,
      contactOwner: cur.contactOwner,
      associatedCompany: (
        <JumpButton
          key={cur.companyID}
          id={cur.companyID}
          type="company"
          name={cur.associatedCompany}
        />
      ),
      lastActivityDate: cur.lastActivityDate,
      leadStatus: cur.leadStatus,
      createDate: cur.createDate,
    }));
  }
  if (type === "company") {
    for (let item of data) {
      if (item.name.length > 25) {
        item.name = item.name.slice(0, 25) + "...";
      }
    }
    return data.map((cur) => {
      return {
        name: (
          <JumpButton
            key={cur.companyID}
            id={cur.companyID}
            type="company"
            name={cur.name}
          />
        ),
        // associatedContacts: newOwners || undefined,
        companyID: cur.companyID,
        phoneNumber: cur.phoneNumber,
        companyOwner: cur.companyOwner,
        city: cur.city,
        country: cur.country,
        industry: cur.industry,
        lastLoggedCallDate: cur.lastLoggedCallDate,
      };
    });
  }
}

const processData = (data, type) => {
  if (type === "contact") {
    let newOwner;
    if (typeof data.contactOwner === "object") {
      newOwner = data.contactOwner.fullName;
    } else if (!data.contactOwner) {
      newOwner = "Unassigned";
    }
    return {
      name: data.fullName,
      contactID: data.id,
      companyID: data.company ? data.company.id : undefined,
      phoneNumber: data.phoneNo,
      email: data.email,
      contactOwner: newOwner || data.contactOwner,
      // associatedCompany:
      //   typeof data.company === "object" ? data.company.name : data.company,
      lastActivityDate: data.lastActivityDate,
      leadStatus: LEAD_STATUS_BACK[data.leadStatus],
      createDate: data.createDate,
    };
  } else {
    let newOwner;
    // let contacts = [];
    // let contactID = [];
    if (typeof data.companyOwner === "object") {
      newOwner = data.companyOwner.fullName;
    } else if (!data.companyOwner) {
      newOwner = "Unassigned";
    }
    // if (typeof data.associatedContacts === "object") {
    //   contacts = data.associatedContacts.map((cur) => cur.fullName);
    //   contactID = data.associatedContacts.map((cur) => cur.id);
    // } else if (!data.associatedContacts) {
    //   contacts = contactID = undefined;
    // }
    return {
      name: data.name,
      companyID: data.id,
      // contactID: data.associatedContacts ? contactID : undefined,
      phoneNumber: data.phoneNumber,
      companyOwner: newOwner || undefined,
      // associatedContacts: data.associatedContacts ? contacts : undefined,
      lastLoggedCallDate: data.lastLoggedCallDate,
      city: data.city,
      country: data.country,
      industry: data.industry,
    };
  }
};

const getTable = (data, tabID, userAccount, type) => {
  if (tabID === 1) {
    return wrapUpData(data, type);
  }
  if (tabID === 2) {
    const mine = [];
    if (type === "contact") {
      for (const item of data) {
        if (item.contactOwner === userAccount) {
          mine.push(item);
        }
      }
    } else {
      for (const item of data) {
        if (item.companyOwner === userAccount) {
          mine.push(item);
        }
      }
    }
    return wrapUpData(mine, type);
  }
  if (tabID === 3) {
    const unassigned = [];
    if (type === "contact") {
      for (const item of data) {
        if (item.contactOwner === "Unassigned") {
          unassigned.push(item);
        }
      }
    } else {
      for (const item of data) {
        if (item.companyOwner === "Unassigned") {
          unassigned.push(item);
        }
      }
    }
    return wrapUpData(unassigned, type);
  }
};

/* ====================================DELETE========================================== */
function remove(allData, selectedRow) {
  const names = [];
  for (const item of selectedRow) {
    names.push(item.name);
  }
  for (let i = 0; i < allData.length; ) {
    if (names.includes(allData[i].name)) {
      allData.splice(i, 1);
      continue;
    }
    i++;
  }
  return allData;
}

/* =====================================POST============================================== */
function makeNewRow(newData, type) {
  if (type === "contact") {
    newData.createDate = getDate();
    // if (!newData.contactOwner) {
    //   newData.contactOwnerFirstName = "Unassigned";
    //   newData.contactOwnerLastName = undefined;
    //   delete newData.contactOwner;
    // } else {
    //   let tempName = newData.contactOwner.split(" ");
    //   newData.contactOwnerFirstName = tempName[0];
    //   newData.contactOwnerLastName =
    //     tempName.length > 1 ? tempName[1] : undefined;
    //   delete newData.contactOwner;
    // }
    delete newData.contactOwner;
    if (newData.phoneNumber) {
      newData.phoneNo = newData.phoneNumber;
      delete newData.phoneNumber;
    }
    // if (newData.associatedCompany) {
    //   newData.companyName = newData.associatedCompany;
    //   delete newData.associatedCompany;
    // }
    delete newData.associatedCompany;
    if (newData.leadStatus) {
      newData.leadStatus = LEAD_STATUS[newData.leadStatus];
    }
    const tempName = newData.name.split(" ");
    newData.firstName = tempName[0];
    newData.lastName = tempName.length > 1 ? tempName[1] : undefined;
    delete newData.name;
    return newData;
  }
  if (type === "company") {
    return newData;
  }
}

export { getTable, processData, makeNewRow, remove, handleCsv };
