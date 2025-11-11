import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";

function App() {
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState(false);
  const [wordCount, setWordCount] = useState({});
  const MAX_LENGTH = 2048;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    console.log(textInput);
    if (value.trim() !== "") {
      setError(false);
    }
  };

  const handleWordCount = () => {
    if (textInput.trim() === "") {
      setError(true);
      setWordCount({});
    }
    const words = textInput.toLowerCase().match(/\b\w+\b/g);
    let freq = {};
    if (words) {
      words.forEach((word) => {
        freq[word] = (freq[word] || 0) + 1;
      });
    }
    setWordCount(freq);
  };
  console.log(wordCount);
  console.log(Object.keys(wordCount).length);
  return (
    <>
      <div className="bg-white-600 flex justify-center  items-center flex-col my-4">
        <h1 className=" text-3xl font-bold  flex justify-center  items-center m-16 ">
          Word Frequency App
        </h1>
        <div>
          <TextField
            className="p-2 w-full"
            required
            label="paste your text content here!"
            maxLength={MAX_LENGTH}
            value={textInput}
            onChange={handleInputChange}
            error={error}
            helperText={error ? "first paste or write your text" : ""}
          />
          <button
            onClick={handleWordCount}
            className="w-full p-2 rounded-lg bg-gray-400 hover:bg-gray-500 mt-4 text-white font-semibold transition duration-300"
          >
            Count those words!
          </button>
        </div>
      </div>
      <div>
        {Object.keys(wordCount).length > 0 && (
          <div className="flex justify-center flex-col items-center  ">
            <h1 className="font-bold mt-4">Word Frequency</h1>
            <ul className="grid grid-cols-1 gap-2 w-1/3 border rounded-lg bg-gray-50 p-4 shadow">
              <li className="grid grid-cols-3 w-full font-semibold border-b mb-2 pb-2 bg-gray-300 p-4 rounded-md">
                <span>Index</span>
                <span>word</span>
                <span className="text-right">count</span>
              </li>
              {Object.entries(wordCount)
                .sort((a, b) => b[1] - a[1])
                .map(([word, count], index) => (
                  <li
                    key={word}
                    className={
                      index % 2 == 0
                        ? "bg-gray-100 grid grid-cols-3 font-semibold border-b  pb-2"
                        : "bg-white grid grid-cols-3 font-semibold border-b  pb-2"
                    }
                  >
                    <span>{index + 1}</span>
                    <span>{word}</span>
                    <span className="text-right">{count}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
