import "./printpage.css";
import CloudIcon from "../assets/icons/cloud.svg";
import PrintOrdersTable from "../components/PrintOrdersTable";
import FileUpload from "../components/FileUpload";
const PrintPage = () => {
  return (
    <div className="page" id="print">
      <div className="pagecontent">
        <FileUpload onFileUpload={()=>{}}/>
        <div className="ordersbox">
          <PrintOrdersTable />
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
