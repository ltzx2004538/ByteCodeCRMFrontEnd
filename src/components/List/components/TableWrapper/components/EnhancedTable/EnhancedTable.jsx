import React, { Component } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Theme from "../../../../../Style/Theme/TableTheme";
import SelectModal from "./components/SelectModal";
import tableIcons from "../../../../../../lib/tableLibs/getIcons";
import getColumns from "../../../../../../lib/tableLibs/getColumns";
import exportCSV from "../../../../../../lib/tableLibs/exportCSV";
import exportPDF from "../../../../../../lib/tableLibs/exportPDF";
import Loading from "../../../../../Loading";
import {
  GetAllContacts,
  removeContact,
  createContact,
  UpdateContact,
} from "../../../../../Api/Contact";
import {
  GetAllCompanies,
  AddCompany,
  UpdateCompany,
  DeleteCompany,
} from "../../../../../Api/Company";
import {
  getTable,
  processData,
  makeNewRow,
  remove,
  handleCsv
} from "../../../../../../lib/tableLibs/dataOperation";

class EnhancedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      columns: getColumns(this.props.type),
      selectedRow: null,
      dataToShow: [],
      allData: [],
    };
  }

  componentDidMount() {
    this.changeLoadingVisible(true);
    if (this.props.type === "contact") {
      this.getAllContacts();
      this.changeLoadingVisible(false);
    } else {
      this.getAllCompanies();
      this.changeLoadingVisible(false);
    }
  }

  componentDidUpdate(prevProps) {
    const { CSVData } = this.props;
    if (CSVData !== prevProps.CSVData) {
      const dataToAdd = handleCsv(CSVData, this.props.type);
      console.log("EnhancedTable -> componentDidUpdate -> dataToAdd", dataToAdd)
      if (dataToAdd.length === 0) {
        alert("You may have imported a wrong file!");
      } else {
        this.changeLoadingVisible(true);
        for (const item of dataToAdd) {
          if (this.props.type === "contact") {
            createContact(item);
          } else if (this.props.type === "company") {
            AddCompany(item);
          }
        }
        setTimeout(() => {
          if (this.props.type === "contact") {
            this.getAllContacts();
            this.changeLoadingVisible(false);
          } else {
            this.getAllCompanies();
            this.changeLoadingVisible(false);
          }
        }, 1000);
      }
    }
  }

  getAllContacts = () => {
    GetAllContacts().then((data) => {
      let allData = [];
      allData = data.map((cur) => processData(cur, this.props.type));
      const showData = getTable(
        allData,
        this.props.tab,
        this.props.userAccount,
        this.props.type
      );
      this.setState({
        allData,
        dataToShow: showData,
      });
    });
  };

  getAllCompanies = () => {
    GetAllCompanies().then((data) => {
      let allData = [];
      allData = data.map((cur) => processData(cur, this.props.type));
      const showData = getTable(
        allData,
        this.props.tab,
        this.props.userAccount,
        this.props.type
      );
      this.setState({
        allData,
        dataToShow: showData,
      });
    });
  };

  removeRow = (evt, selectedRow) => {
    evt.preventDefault();
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let allData = [...this.state.dataToShow];
        const deleteRow = [];
        // remove rows of dataToShow for table display
        allData = remove(allData, selectedRow);
        for (const row of selectedRow) {
          deleteRow.push(this.state.dataToShow[row.tableData.id]);
        }
        // remove data in mongoDB
        deleteRow.map((cur) => {
          if (this.props.type === "contact") {
            removeContact(cur.contactID);
          } else if (this.props.type === "company") {
            DeleteCompany(cur.companyID);
          }
          return true;
        });
        this.setState({
          dataToShow: allData,
        });
        resolve();
      }, 500);
    });
  };

  addRow = (newData) =>
    new Promise((resolve, reject) => {
      this.changeLoadingVisible(true);
      setTimeout(() => {
        newData = makeNewRow(newData, this.props.type);
        if (this.props.type === "contact") {
          createContact(newData);
        } else if (this.props.type === "company") {
          AddCompany(newData);
        }
        setTimeout(() => {
          if (this.props.type === "contact") {
            this.getAllContacts();
            this.changeLoadingVisible(false);
          } else {
            this.getAllCompanies();
            this.changeLoadingVisible(false);
          }
        }, 1000);
        resolve();
      }, 500);
    });

  showModal = (evt, selectedRow) => {
    evt.preventDefault();
    this.setState({ modalVisible: true });
  };

  changeModalVisible = (s) => {
    this.setState({ modalVisible: s });
  };

  changeLoadingVisible = (s) => {
    this.setState({
      showLoading: s,
    });
  };

  getDataToEdit = (data) => {
    this.changeLoadingVisible(true);
    this.state.selectedRow.map((cur) => {
      if (this.props.type === "contact") {
        UpdateContact(this.state.allData[cur].contactID, data);
      } else if (this.props.type === "company") {
        UpdateCompany(this.state.allData[cur].companyID, data);
      }
      return true;
    });
    setTimeout(() => {
      if (this.props.type === "contact") {
        this.getAllContacts();
        this.changeLoadingVisible(false);
      } else {
        this.getAllCompanies();
        this.changeLoadingVisible(false);
      }
    }, 1000);
  };

  getSelectedRowIndex = (Rows) => {
    const index = [];
    for (const item of Rows) {
      index.push(item.tableData.id);
    }
    setTimeout(() => {
      this.setState({
        selectedRow: index,
      });
    }, 100);
  };

  render() {
    return (
      <>
        {this.state.modalVisible && (
          <SelectModal
            changeModalVisible={this.changeModalVisible}
            getDataToEdit={this.getDataToEdit}
            type={this.props.type}
          />
        )}
        <MuiThemeProvider theme={Theme}>
          {this.state.showLoading ? (
            <Loading variant={"full page"} />
          ) : (
            <MaterialTable
              title={null}
              columns={this.state.columns}
              data={this.state.dataToShow}
              icons={tableIcons}
              onRowClick={(evt, selectedRow) => {}}
              onSelectionChange={(Rows) => {
                this.getSelectedRowIndex(Rows);
              }}
              actions={[
                {
                  tooltip: "Remove all selected contact(s)",
                  icon: tableIcons.Delete,
                  onClick: this.removeRow,
                },
                {
                  tooltip: "Edit contact(s)",
                  icon: tableIcons.Edit,
                  onClick: this.showModal,
                },
              ]}
              options={{
                selection: true,
                addRowPosition: "first",
                search: true,
                sorting: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 40],
                exportButton: true,
                exportCsv: (columns, data) =>
                  exportCSV(columns, this.state.allData, this.props.type),
                exportPdf: (columns, data) =>
                  exportPDF(columns, this.state.allData, this.props.type),
              }}
              editable={{
                onRowAdd: this.addRow,
              }}
            />
          )}
        </MuiThemeProvider>
      </>
    );
  }
}

export default EnhancedTable;
