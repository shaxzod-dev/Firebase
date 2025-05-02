import { useState, useEffect, useRef, JSX } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function App(): JSX.Element {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imagesListRef = ref(storage, "images/");

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const uploadFile = (): void => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 font-sans">
      <div className="flex flex-col items-center space-y-4 mb-6">
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
              setImageUpload(event.target.files[0]);
            }
          }}
        />
        <button
          onClick={handleFileClick}
          className="cursor-pointer px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
        >
          {imageUpload ? imageUpload.name : "Choose Image"}
        </button>
        <button
          onClick={uploadFile}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          Upload Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            className="w-64 h-64 object-cover rounded-xl shadow-md"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
