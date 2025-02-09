import "./printpage.css";
import PrintOrdersTable from "../components/PrintOrdersTable";
import Link from "next/link";
const PrintPage = async() => {
  const res= await fetch('https://bitsindri.vercel.app/api/printitems')
  const printItems=await res.json()
  console.log(printItems)
  return (
    <div className="" id="">
      <div className="">
        {/* <FileUpload onFileUpload={()=>{}}/> */}
         <Link href="/print/upload" className="uploadbtn absolute right-5 top-5">
          New Print
        </Link> 
        <div className="page">
          <PrintOrdersTable printItems={printItems} />
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
