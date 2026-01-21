import React from 'react';
import { Workflow } from '../types';
import { Link } from 'react-router-dom';
import { Star, Download } from 'lucide-react';

interface WorkflowCardProps {
  workflow: Workflow;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow }) => {
  return (
    <Link to={`/workflow/${workflow.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
        {/* Image Area */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img 
            src={workflow.image} 
            alt={workflow.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
            {workflow.currency} ${workflow.price.toFixed(2)}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-1">
          {/* Node Icons */}
          <div className="flex -space-x-2 mb-3">
            {workflow.nodes.slice(0, 4).map((node, i) => (
              <img 
                key={i} 
                src={node.iconUrl} 
                alt={node.name} 
                className="w-8 h-8 rounded-full border-2 border-white bg-white object-contain"
                title={node.name}
              />
            ))}
            {workflow.nodes.length > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +{workflow.nodes.length - 4}
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {workflow.title}
          </h3>
          
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
            {workflow.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
             <div className="flex items-center space-x-2">
                <img src={workflow.author.avatar} alt={workflow.author.name} className="w-6 h-6 rounded-full" />
                <span className="text-xs text-gray-600 font-medium truncate max-w-[100px]">{workflow.author.name}</span>
             </div>
             
             <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center">
                   <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                   {workflow.rating}
                </div>
                <div className="flex items-center">
                   <Download className="w-3 h-3 mr-1" />
                   {workflow.downloads}
                </div>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkflowCard;
