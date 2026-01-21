import { Workflow, PaginatedDocs } from '../types';
import { MOCK_WORKFLOWS } from '../mockData';

// Simulating network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const payloadService = {
  async getWorkflows(params: { page?: number, limit?: number, search?: string, tag?: string } = {}): Promise<PaginatedDocs<Workflow>> {
    await delay(500); // Simulate API latency

    let docs = [...MOCK_WORKFLOWS];

    // Filter by search
    if (params.search) {
      const lowerSearch = params.search.toLowerCase();
      docs = docs.filter(w => 
        w.title.toLowerCase().includes(lowerSearch) || 
        w.description.toLowerCase().includes(lowerSearch) ||
        w.tags.some(t => t.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter by tag
    if (params.tag) {
      const lowerTag = params.tag.toLowerCase();
      docs = docs.filter(w => w.tags.some(t => t.toLowerCase() === lowerTag));
    }

    // Pagination logic
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const totalDocs = docs.length;
    const totalPages = Math.ceil(totalDocs / limit);
    
    const paginatedDocs = docs.slice(startIndex, endIndex);

    return {
      docs: paginatedDocs,
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter: startIndex + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    };
  },

  async getWorkflowById(id: string): Promise<Workflow | undefined> {
    await delay(300);
    return MOCK_WORKFLOWS.find(w => w.id === id);
  },

  async getRelatedWorkflows(id: string): Promise<Workflow[]> {
     await delay(300);
     return MOCK_WORKFLOWS.filter(w => w.id !== id).slice(0, 3);
  }
};
