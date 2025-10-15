import React, { useState, useEffect, useCallback } from 'react';
import { analyzeImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/imageUtils';
import Spinner from '../components/Spinner';

const ScanImagePage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("What do you see in this image? Provide a detailed description.");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      setError(null);
      setImageFile(file);
    }
  };
  
  const handleSubmit = useCallback(async () => {
    if (!imageFile || !prompt) {
      setError("Please select an image and enter a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const imageData = await fileToBase64(imageFile);
      const fileType = imageFile.type;
      const response = await analyzeImage(imageData, fileType, prompt);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Image Analysis</h1>
        <p className="text-gray-400 mt-2">Upload an image and ask a question to see the AI in action.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl space-y-6">
          <div className="space-y-2">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300">
              1. Upload Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-indigo-500 px-2 py-1">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Image Preview:</p>
              <img src={imagePreview} alt="Selected preview" className="rounded-lg w-full max-h-60 object-contain" />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">
              2. Ask a Question
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!imageFile || !prompt || isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4">3. AI Analysis Result</h2>
          <div className="bg-gray-900 rounded-md p-4 min-h-[300px] text-gray-300 whitespace-pre-wrap overflow-y-auto">
            {isLoading && <Spinner />}
            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
            {result && <p>{result}</p>}
            {!isLoading && !error && !result && <p className="text-gray-500">The analysis from Mozo Image Scanner will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanImagePage;