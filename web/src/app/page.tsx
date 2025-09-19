'use client';

import { useState } from 'react';
import RequestForm from '@/components/RequestForm';
import AgentStatus from '@/components/AgentStatus';
import ResponseDisplay from '@/components/ResponseDisplay';

export default function Home() {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleNewResponse = (response: any) => {
    setResponses(prev => [response, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              MoE Agent System
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Mixture of Experts - Cloud Run Edition
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Request Form & Agent Status */}
          <div className="lg:col-span-1 space-y-8">
            <RequestForm 
              onSubmit={handleNewResponse}
              loading={loading}
              setLoading={setLoading}
            />
            <AgentStatus />
          </div>

          {/* Right Column - Responses */}
          <div className="lg:col-span-2">
            <ResponseDisplay responses={responses} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 MoE Agent System - Powered by Google Cloud Run & Vertex AI
          </p>
        </div>
      </footer>
    </div>
  );
    </div>
  );
}
