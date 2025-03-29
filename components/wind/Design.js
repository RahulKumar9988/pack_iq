// "use client";
// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { LuCheck } from "react-icons/lu";
// import { UploadLogo } from "@/components/UploadLogo";
// import {
//   Button,
//   Image,
//   Link,
//   Progress,
//   Select,
//   SelectItem,
// } from "@nextui-org/react";
// import { IoWarningOutline } from "react-icons/io5";

// export default function Design() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [value, setValue] = useState("500");

//   const handleSelectionChange = (e) => {
//     setValue(e.target.value);
//   };

//   const uploadFile = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "/your-upload-endpoint"); // Replace with your upload endpoint

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const progress = Math.round((event.loaded / event.total) * 100);
//           setUploadedFiles((prevFiles) =>
//             prevFiles.map((f) => (f.id === file.id ? { ...f, progress } : f))
//           );
//         }
//       };

//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           resolve(xhr.response);
//         } else {
//           reject(new Error("Upload failed"));
//         }
//       };

//       xhr.onerror = () => {
//         reject(new Error("Upload failed"));
//       };

//       xhr.send(formData);
//     });
//   };

//   const onDrop = (acceptedFiles) => {
//     const newFiles = acceptedFiles.map((file) => ({
//       id: file.name + Date.now(),
//       name: file.name,
//       size: file.size,
//       preview: URL.createObjectURL(file),
//       progress: 0,
//     }));

//     setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

//     newFiles.forEach((file) => {
//       uploadFile(file).catch((error) => {
//         console.error(error);
//       });
//     });
//   };

//   const handleRemove = (fileId) => {
//     setUploadedFiles((prevFiles) =>
//       prevFiles.filter((file) => file.id !== fileId)
//     );
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="flex gap-5">
//       <div className="flex w-4/5 gap-5 flex-col">
//         <div
//           {...getRootProps()}
//           className="w-full flex gap-4 border-2 border-dashed h-fit flex-col items-center rounded-xl bg-background text-foreground"
//         >
//           <input {...getInputProps()} />
//           <div className="p-10 flex flex-col items-center text-center">
//             <UploadLogo />
//             <p className="text-lg">
//               {isDragActive ? (
//                 "Drop the files here ..."
//               ) : (
//                 <>
//                   Drop your files here or{" "}
//                   <span className="text-[#2F4693] font-medium">browse</span>
//                 </>
//               )}
//             </p>
//           </div>
//         </div>

//         {uploadedFiles.length ? (
//           <div className="rounded-xl flex flex-col justify-between border border-[#F0F0F0]">
//             <div className="flex rounded-t-xl px-5 justify-between border-b p-3 border-[#F0F0F0] bg-[#F9F9F9]">
//               <span>Upload</span>
//               <span className="pr-10">Order Quantity</span>
//             </div>
//             {uploadedFiles.map((file) => (
//               <div
//                 key={file.id}
//                 className="p-3 flex items-center justify-between border-b last:border-none"
//               >
//                 <div className="flex items-center flex-grow">
//                   <Image
//                     src={file.preview}
//                     alt={file.name}
//                     className="w-11 h-11 rounded-md overflow-hidden"
//                   />
//                   <div className="ml-3 flex-grow flex justify-between">
//                     <div>
//                       <div className="flex items-center gap-4">
//                         <span className="font-medium">{file.name}</span>
//                         {file.size > 500000 && (
//                           <p className="text-sm text-destructive-foreground flex items-center gap-2 text-[#EB395A]">
//                             <IoWarningOutline color="#EB395A" />
//                             Please upload higher image quality
//                           </p>
//                         )}
//                       </div>

//                       {file.progress === 100 && (
//                         <span className="text-muted-foreground">
//                           {`${(file.size / 1024).toFixed(2)} KB`}
//                         </span>
//                       )}
//                       {file.progress < 100 && (
//                         <div className="w-full">
//                           <Progress
//                             aria-label="Uploading..."
//                             size="sm"
//                             value={file.progress}
//                             color="success"
//                             className="w-full"
//                             classNames={{
//                               base: "max-w-full h-[2px]",
//                             }}
//                           />
//                           <div className="w-full flex justify-between">
//                             <div>
//                               {(
//                                 (file.size * file.progress) /
//                                 100 /
//                                 1024
//                               ).toFixed(2)}{" "}
//                               KB of {(file.size / 1024).toFixed(2)} KB
//                             </div>
//                             <div>{file.progress}%</div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex w-40 flex-wrap md:flex-nowrap gap-4">
//                       <Select
//                         aria-label="Number of orders"
//                         className="max-w-xs h-10"
//                         classNames={{ trigger: "min-h-9 h-9" }}
//                         selectedKeys={[value]}
//                         onChange={handleSelectionChange}
//                       >
//                         {["500", "1000", "1500", "2000"].map((ele) => (
//                           <SelectItem key={ele}>{ele}</SelectItem>
//                         ))}
//                       </Select>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   className="text-destructive hover:text-destructive/80"
//                   onClick={() => handleRemove(file.id)}
//                 >
//                   ✖
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : null}
//       </div>

//       <div className="w-1/5 flex flex-col gap-5">
//         <div className="flex flex-col gap-3 p-4 h-[158px] text-sm border-2 rounded-xl">
//           <div>Your packaging</div>
//           <div className="flex items-center gap-2">
//             <LuCheck />
//             <span> Type :</span>
//             <span className="font-semibold"> Flat bottom pouch</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <LuCheck />
//             <span> Size :</span>
//             <span className="font-semibold">L</span>
//             <span className="">{`(265 x 190 x 110 mm)`}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <LuCheck />
//             <span> Quantity :</span>
//             <span className="font-semibold">2000</span>
//           </div>
//         </div>
//         <div className="flex flex-col gap-3 p-4 bg-[#FDD40A1A] text-sm border-2 rounded-xl">
//           <span>Note</span>
//           <span>
//             When making your purchase, opting for a higher quantity can
//             significantly increase your savings. By buying in bulk, you often
//             get a better deal per unit, allowing you to save more in the long
//             run.
//           </span>
//         </div>
//         <Link href="material" className="w-full">
//           <Button className="text-lg w-full font-bold bg-[#253670] text-white h-14">
//             Confirm
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }



import React from 'react'

function Design() {
  return (
    <div>
      design
    </div>
  )
}

export default Design
