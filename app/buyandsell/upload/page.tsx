import Link from "next/link";
import CloudIcon from "../../assets/icons/cloud.svg";
import "./upload.css";
const UploadSaleItem = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="saleUploadDetails">
        <div className="uploadheader">
          <h1>Add Details</h1>
          <h2>Fill in the details of Selling Item</h2>
        </div>
        <div className="uploadbox">
          <CloudIcon className="uploadIcon" />
          <h1>Upload an image</h1>
          <p>Click to browse, or drag & drop a file here</p>
        </div>
        <div className="w-full">
          <input
            placeholder="title"
            type="text"
            className="border border-2 w-full"
          />
          <div className="w-full  flex justify-between">
            <input
              placeholder="Price"
              type="text"
              className="border border-2 w-4/5"
            />
            <input
              placeholder="Contact Number"
              type="text"
              className="border border-2 w-4/5"
            />
          </div>
          <input
            placeholder="Description"
            type="text"
            className="border border-2 w-full h-10"
          />
          <div className="flex justify-end gap-3 ml-auto mt-3">
            <Link href="/buyandsell" className="cancelbtn">
              Cancel
            </Link>
            <button className="uploadbtn">Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSaleItem;
