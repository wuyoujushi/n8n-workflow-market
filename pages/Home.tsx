import React, { useEffect, useState } from 'react';
import { Workflow, PaginatedDocs } from '../types';
import { payloadService } from '../services/payloadService';
import { geminiService } from '../services/geminiService';
import WorkflowCard from '../components/WorkflowCard';
import { Filter, ChevronDown, Wand2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {
  const [data, setData] = useState<PaginatedDocs<Workflow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [isAiFiltering, setIsAiFiltering] = useState(false);

  // Derive initial search from URL
  const query = searchParams.get('q') || '';
  const isAi = searchParams.get('ai') === 'true';

  useEffect(() => {
    fetchWorkflows();
  }, [selectedTag, query, isAi]);

  const fetchWorkflows = async () => {
    setLoading(true);
    try {
      if (isAi && query) {
        setIsAiFiltering(true);
        // AI Search Path
        const matchedIds = await geminiService.searchWorkflowsWithAI(query);
        // We need to fetch all to filter by ID for this mock, or fetch specific IDs if API supported it
        // Simulating ID fetch by getting all and filtering in memory for demo
        const all = await payloadService.getWorkflows({ limit: 100 });
        const filteredDocs = all.docs.filter(doc => matchedIds.includes(doc.id));
        
        // Respecting the order of matchedIds if possible, but for now just returning matches
        setData({
            ...all,
            docs: filteredDocs,
            totalDocs: filteredDocs.length
        });
      } else {
        setIsAiFiltering(false);
        // Standard Search Path
        const result = await payloadService.getWorkflows({ 
            search: query, 
            tag: selectedTag 
        });
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch workflows", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['E-commerce', 'Marketing', 'CRM', 'Finance', 'HR', 'Productivity', 'SEO', 'Crypto'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero / Filter Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
               <button 
                 onClick={() => setSelectedTag('')}
                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!selectedTag ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
               >
                 All
               </button>
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setSelectedTag(cat)}
                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedTag === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <div className="flex items-center space-x-4 ml-auto">
               <span className="text-sm text-gray-500">
                  {loading ? '...' : `${data?.totalDocs || 0} workflows`}
               </span>
               <div className="relative inline-block text-left">
                  <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none">
                    <Filter className="w-4 h-4 mr-2" />
                    Sort
                    <ChevronDown className="w-4 h-4 ml-2 -mr-1" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Context Banner */}
      {isAiFiltering && !loading && (
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 border-b border-primary-100">
              <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
                  <Wand2 className="w-5 h-5 text-primary-600 mr-2" />
                  <p className="text-sm text-primary-900">
                      AI found these workflows based on: <span className="font-semibold">"{query}"</span>
                  </p>
              </div>
          </div>
      )}

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse">
                 <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                 <div className="p-5 space-y-4">
                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                   <div className="h-20 bg-gray-200 rounded"></div>
                 </div>
               </div>
             ))}
           </div>
        ) : data?.docs.length === 0 ? (
            <div className="text-center py-20">
                <div className="mx-auto h-24 w-24 text-gray-300">
                   <Filter className="h-full w-full" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No workflows found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
                {isAiFiltering && <button onClick={() => window.location.href = '/'} className="mt-4 text-primary-600 underline">Clear AI Search</button>}
            </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.docs.map(workflow => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
