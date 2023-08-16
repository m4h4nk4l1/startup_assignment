import React, { useState } from 'react';
import ContactForm from './components/ContactForm';

interface FormData {
  name: string;
  email: string;
  message: string;
}

function App() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    // Simulate an asynchronous API call here
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmittedData(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-teal-200 p-6 rounded-2xl shadow-2xl shadow-slate-900">
        <h1 className="text-2xl font-semibold mb-4">Contact Me</h1>
        {submittedData ? (
          <div>
            <p>Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
            <p>Message: {submittedData.message}</p>
          </div>
        ) : (
          <ContactForm onSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;
