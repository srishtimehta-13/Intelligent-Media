import { useState } from "react";

function App() {
  const [files, setFiles] = useState([]);
  const [jsonObjects, setJsonObjects] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleJsonUpload = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setJsonObjects((prev) => [...prev, json]);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Intelligent Media + JSON Upload</h1>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Upload Images/Videos:</label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Upload JSON File:</label>
        <input type="file" accept=".json" onChange={handleJsonUpload} className="border p-2 rounded"/>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Uploaded Media</h2>
        <ul className="list-disc pl-5">
          {files.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Uploaded JSON Objects</h2>
        <pre className="bg-white p-4 rounded shadow overflow-auto max-h-64">
          {JSON.stringify(jsonObjects, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;

