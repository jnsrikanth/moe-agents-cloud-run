'use client';

import { useState } from 'react';

interface RequestFormProps {
  onSubmit: (response: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function RequestForm({ onSubmit, loading, setLoading }: RequestFormProps) {
  const [requestType, setRequestType] = useState('general');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: requestType,
          content: content,
          metadata: {
            timestamp: new Date().toISOString(),
            source: 'web-ui',
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      onSubmit(data);
      setContent('');
    } catch (error) {
      console.error('Error submitting request:', error);
      onSubmit({
        error: true,
        message: error instanceof Error ? error.message : 'Failed to submit request',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Submit Request
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Request Type
          </label>
          <select
            id="type"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="general">General</option>
            <option value="credit">Credit Evaluation</option>
            <option value="fraud">Fraud Detection</option>
            <option value="esg">ESG Analysis</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Request Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Enter your request here..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
