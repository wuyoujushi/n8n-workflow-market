import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Workflow } from '../types';
import { payloadService } from '../services/payloadService';
import ReactMarkdown from 'react-markdown';
import { Check, Shield, Globe, Clock, ArrowLeft, Heart, Share2, AlertCircle } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const WorkflowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [related, setRelated] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (workflowId: string) => {
    setLoading(true);
    const w = await payloadService.getWorkflowById(workflowId);
    const r = await payloadService.getRelatedWorkflows(workflowId);
    setWorkflow(w || null);
    setRelated(r);
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  if (!workflow) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-4"/>
            <h2 className="text-xl font-bold text-gray-900">Workflow not found</h2>
            <Link to="/" className="mt-4 text-primary-600 hover:text-primary-700 font-medium">Back to Home</Link>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb / Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to marketplace
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="relative h-64 sm:h-80 bg-gray-900">
                 <img src={workflow.image} alt={workflow.title} className="w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {workflow.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{workflow.title}</h1>
                    <div className="flex items-center text-gray-200 text-sm space-x-4">
                        <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" /> Updated {new Date(workflow.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" /> English
                        </span>
                    </div>
                 </div>
              </div>
              
              <div className="p-8">
                {/* Apps Included */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Apps Included</h3>
                    <div className="flex flex-wrap gap-4">
                        {workflow.nodes.map((node, i) => (
                            <div key={i} className="flex items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-100">
                                <img src={node.iconUrl} alt={node.name} className="w-6 h-6 mr-3" />
                                <span className="font-medium text-gray-700">{node.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="prose prose-blue max-w-none">
                   <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                   <ReactMarkdown>{workflow.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <div className="flex items-baseline justify-between mb-6">
                    <span className="text-3xl font-bold text-gray-900">${workflow.price.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm">One-time payment</span>
                </div>

                <button 
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30 flex items-center justify-center mb-4"
                >
                    Buy Workflow
                </button>
                
                <div className="flex space-x-3 mb-6">
                    <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center">
                        <Heart className="w-4 h-4 mr-2" /> Save
                    </button>
                    <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </button>
                </div>

                <ul className="space-y-4 text-sm text-gray-600">
                    <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        Instant Download
                    </li>
                    <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        Lifetime Updates
                    </li>
                    <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        JSON export for n8n
                    </li>
                    <li className="flex items-start">
                        <Shield className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        Secure Payment (Stripe/PayPal)
                    </li>
                </ul>

                 <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center">
                        <img src={workflow.author.avatar} alt="" className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 flex items-center">
                                {workflow.author.name}
                                {workflow.author.verified && <Check className="w-3 h-3 text-blue-500 ml-1 fill-current text-white bg-blue-500 rounded-full p-0.5" />}
                            </p>
                            <p className="text-xs text-gray-500">Workflow Creator</p>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        workflow={workflow}
      />
    </div>
  );
};

export default WorkflowDetail;
