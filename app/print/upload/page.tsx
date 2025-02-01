'use client'
import Link from "next/link";
import CloudIcon from "../../assets/icons/cloud.svg";
import "./upload.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
const UploadSaleItem = () => {  
  const [file, setFile] = useState<string>();
  const [actualFile,setActualFile]=useState<File|null>(null)
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [instruction, setInstruction] = useState("");
  const [fileTypes,setFileTypes]=useState<{[key:string]:string}>({})
  const router=useRouter()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name  || !contact || !file  ) {
      alert("Please fill in all the fields and upload an image.");
      return;
    }

    // Create form data object to send form data and file
    const formData = new FormData();
    formData.append("ownerId", '65b8d1a0c123456789abcdef');
    formData.append("name", name);
    formData.append("contact", contact);
    formData.append("instruction", instruction);
    if (file)formData.append("id",JSON.stringify(file))
    
    if(actualFile)formData.append("file", actualFile);

    try {
      // Make the POST request to your API endpoint
      const response = await fetch("https://bitsindri.vercel.app/api/printitems", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload print item.");
      }else router.push('/print')

      const result = await response.json();
      console.log("Print item uploaded successfully:", result);
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error("Error uploading print item:", error);
    }
  };
 
  
  return (
    <div className="flex justify-center items-center w-full">
      <div className="saleUploadDetails bg-green-500">
        <div className="uploadheader">
          <h1>Add Details</h1>
          <h2>Fill in the details of Selling Item</h2>
        </div>
        { !file&&<div className="uploadbox" onDragOver={(e) => {
            e.preventDefault();}}
          onDragLeave={() => {}}
          onDragEnd={(e) => {
            e.preventDefault();}}
          onDrop={(e) => {
            e.preventDefault();if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    setActualFile(file)
                    const blobUrl = URL.createObjectURL(file);
                    setFile(blobUrl);
                    setFileTypes({...fileTypes,[JSON.stringify(blobUrl)]:file.type})  
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
                console.log(files[0].type)
                const blobUrl = URL.createObjectURL(files[0]);
                setActualFile(files[0])
                setFile(blobUrl);
                setFileTypes({...fileTypes,[JSON.stringify(blobUrl)]:files[0].type})           }
            }}
          />
          
          
        </div>}

        
        
       {file && <div className="relative border-2 ">

        {fileTypes[JSON.stringify(file)].startsWith('image') ? <object
      className="rounded-md w-96 h-96 object-contain"
      data={file}
      type="image/png" //need to be updated based on type of file
      />:<iframe
        src={file}
        className="rounded-md w-96 h-96 overflow-hidden"
        title="PDF Preview"
      />}
          <button
            onClick={() => {console.log(file.length);setFile("")}}
            className="px-2  uppercase py-1 tracking-widest outline-none bg-red-600 text-white rounded absolute top-0 right-0"
            >
            X
          </button>
            </div>}
        <div className="w-full flex flex-col gap-3">
          <input
            placeholder="Name"
            type="text"
            className="border border-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
         
            
            <input
              placeholder="Contact Number"
              type="text"
              className="border border-2 "
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          <textarea
            placeholder="Instructions for Shopkeeper"
            rows={3}
            className="border border-2 w-full"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
          <div className="flex justify-end gap-3 ml-auto mt-3">
            <Link href="/print" className="cancelbtn">
              Cancel
            </Link>
            <button className="uploadbtn" onClick={handleFormSubmit}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSaleItem;
