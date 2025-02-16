"use client";
import Link from "next/link";
import CloudIcon from "../../assets/icons/cloud.svg";
import "./upload.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UploadSaleItem = () => {  
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const router=useRouter()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !contact || !description || !file) {
      alert("Please fill in all the fields and upload an image.");
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("contact", contact);
    formData.append("description", description);
    formData.append("image", file); // ✅ Correct file upload

    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_DOMAIN);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/saleitems`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload sale item.")
      else {console.log('pushing router');router.push('/buyandsell')}


      const result = await response.json();
      console.log("Sale item uploaded successfully:", result);
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

        {/* Drag and Drop Box */}
        <div 
          className="uploadbox"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFile = e.dataTransfer.files?.[0];
            if (droppedFile) setFile(droppedFile);
          }}
        >
          <label htmlFor="file" className="h-full flex flex-col justify-center text-center">
            <CloudIcon className="uploadIcon mx-auto" />
            <h1>Upload an image</h1>
            <p>Click to browse, or drag & drop a file here</p>
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) setFile(selectedFile);
            }}
          />
        </div>

        {/* File Preview */}
        {file && (
          <div className="relative border-2 mt-3 p-2">
            <Image width={100} height={100}
              className="rounded-md w-32"
              src={URL.createObjectURL(file)}
              alt="Uploaded preview"
            />
            <button
              onClick={() => setFile(null)}
              className="px-2 uppercase py-1 tracking-widest outline-none bg-red-600 text-white rounded absolute top-0 right-0"
            >
              X
            </button>
          </div>
        )}

        {/* Form Fields */}
        <div className="w-full">
          <input
            placeholder="Title"
            type="text"
            className="border w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="w-full flex justify-between">
            <input
              placeholder="Price"
              type="text"
              className="border w-4/5 p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              placeholder="Contact Number"
              type="text"
              className="border w-4/5 p-2"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <input
            placeholder="Description"
            type="text"
            className="border w-full p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3 ml-auto mt-3">
            <Link href="/buyandsell" className="cancelbtn">
              Cancel
            </Link>
            <button className="uploadbtn" onClick={handleFormSubmit}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSaleItem;
