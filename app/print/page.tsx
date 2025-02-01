import "./printpage.css";
import CloudIcon from "../assets/icons/cloud.svg";
import PrintOrdersTable from "../components/PrintOrdersTable";
import FileUpload from "../components/FileUpload";
import Link from "next/link";
const PrintPage = async() => {
  const res= await fetch('http://localhost:3000/api/printitems')
  const printItems=await res.json()
  console.log(printItems)
  return (
    <div className="page" id="print">
      <div className="pagecontent relative">
        {/* <FileUpload onFileUpload={()=>{}}/> */}
        <Link href="/print/upload" className="uploadbtn absolute right-5 top-5">
          New Print
        </Link>
        <div className="ordersbox">
          <PrintOrdersTable printItems={printItems} />
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
