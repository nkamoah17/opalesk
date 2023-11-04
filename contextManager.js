const StaticAnalyzer = require('./staticAnalyzer');

class ContextManager {
  constructor() {
    this.staticAnalyzer = new StaticAnalyzer();
  }

  async gatherSpatialContext(name, block) {
    const repository = this.staticAnalyzer.repositoryManager.getRepository(name);
    if (repository) {
      const dependencyGraph = repository.dependencyGraph;
      const spatialContext = {};
      // Extract spatial context from the dependency graph
      for (const node in dependencyGraph) {
        if (node === block) {
          spatialContext[node] = dependencyGraph[node];
        }
      }
      return spatialContext;
    }
  }

  async gatherTemporalContext(name, block) {
    const repository = this.staticAnalyzer.repositoryManager.getRepository(name);
    if (repository) {
      const metadata = repository.metadata;
      const temporalContext = {};
      // Extract temporal context from the code change history
      for (const file in metadata) {
        if (file === block) {
          temporalContext[file] = metadata[file].history;
        }
      }
      return temporalContext;
    }
  }

  async linearizeContext(spatialContext, temporalContext) {
    // Linearize the spatial and temporal context for effective use in prompts
    const linearContext = {};
    for (const block in spatialContext) {
      linearContext[block] = {
        spatial: spatialContext[block],
        temporal: temporalContext[block]
      };
    }
    return linearContext;
  }
}

module.exports = ContextManager;
