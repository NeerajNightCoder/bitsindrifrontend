import "./printpage.css";
import CloudIcon from "../assets/icons/cloud.svg";
import PrintOrdersTable from "../components/PrintOrdersTable";
const PrintPage = () => {
  return (
    <div className="page" id="print">
      <div className="pagecontent">
        <div className="uploadbox">
          <CloudIcon className="uploadIcon" />
          <h1>Upload a File</h1>

          <p>Click to browse, or drag & drop a file here</p>
        </div>
        <div className="ordersbox">
          <PrintOrdersTable />
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
