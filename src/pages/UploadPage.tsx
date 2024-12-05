import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleSubmit = async () => {
    if (!preview) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement actual image upload and analysis
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      navigate('/results');
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setError(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Please log in to upload images
          </h2>
          <Button onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Upload Image for Analysis
          </h1>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {!preview ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your image here, or click to select a file
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: JPEG, PNG
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-96 mx-auto rounded-lg"
                />
                <button
                  onClick={handleClear}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleSubmit}
                  isLoading={isLoading}
                >
                  Analyze Image
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Guidelines</h2>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Ensure the image is clear and well-lit</li>
              <li>Center the suspicious area in the frame</li>
              <li>Include some surrounding healthy skin for comparison</li>
              <li>Avoid using filters or editing the image</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}