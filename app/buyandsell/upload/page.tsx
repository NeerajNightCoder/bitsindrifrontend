'use client'
import Link from "next/link";
import CloudIcon from "../../assets/icons/cloud.svg";
import "./upload.css";
import { useState } from "react";
const UploadSaleItem = () => {  
  const [file, setFile] = useState<string>();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !contact || !description ) {
      alert("Please fill in all the fields and upload an image.");
      return;
    }

    // Create form data object to send form data and file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("contact", contact);
    formData.append("description", description);
    // formData.append("image", image);

    try {
      // Make the POST request to your API endpoint
      const response = await fetch("http://localhost:3000/api/saleitems", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload sale item.");
      }

      const result = await response.json();
      console.log("Sale item uploaded successfully:", result);
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error("Error uploading sale item:", error);
    }
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div className="saleUploadDetails">
        <div className="uploadheader">
          <h1>Add Details</h1>
          <h2>Fill in the details of Selling Item</h2>
        </div>
        <div className="uploadbox" onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragLeave={() => {
          }}
          onDragEnd={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    const blobUrl = URL.createObjectURL(file);
                    setFile(blobUrl);
                  }
                  console.log(`items file[${i}].name = ${file?.name}`);
                }
              });
            } else {
              [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}>
          <label
            htmlFor="file"
            className="h-full flex flex-col justify-center text-center"
          >
          <CloudIcon className="uploadIcon mx-auto" />
          <h1>Upload an image</h1>
          <p>Click to browse, or drag & drop a file here</p>
          
            Click to upload or drag and drop
          </label><input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              console.log(e.target.files);
              const files = e.target.files;
              if (files && files[0]) {
                const blobUrl = URL.createObjectURL(files[0]);
                setFile(blobUrl);
              }
            }}
          />
          
          
        </div>

        
        
       {file && <div className="relative border-2 ">

        <object
            className="rounded-md w-32"
            data={file}
            type="image/png" //need to be updated based on type of file
            />
          <button
            onClick={() => setFile("")}
            className="px-2  uppercase py-1 tracking-widest outline-none bg-red-600 text-white rounded absolute top-0 right-0"
            >
            X
          </button>
            </div>}
        <div className="w-full">
          <input
            placeholder="Title"
            type="text"
            className="border border-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
          />
          <div className="w-full  flex justify-between">
            <input
              placeholder="Price"
              type="text"
              className="border border-2 w-4/5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              placeholder="Contact Number"
              type="text"
              className="border border-2 w-4/5"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <input
            placeholder="Description"
            type="text"
            className="border border-2 w-full h-10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3 ml-auto mt-3">
            <Link href="/buyandsell" className="cancelbtn">
              Cancel
            </Link>
            <button className="uploadbtn" onClick={handleFormSubmit}>Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSaleItem;
