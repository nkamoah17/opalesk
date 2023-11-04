const treeSitter = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');
const RepositoryManager = require('./repositoryManager');

class StaticAnalyzer {
  constructor() {
    this.parser = new treeSitter();
    this.parser.setLanguage(JavaScript);
    this.repositoryManager = new RepositoryManager();
  }

  async analyzeRepository(name) {
    const repository = this.repositoryManager.getRepository(name);
    if (repository) {
      const dependencyGraph = repository.dependencyGraph;
      const metadata = repository.metadata;
      for (const file in metadata) {
        const code = metadata[file].code;
        const tree = this.parser.parse(code);
        // Perform incremental building of the dependency graph
        // Perform change classification
        // Perform change may-impact analysis
        // Update the dependency graph and metadata
      }
      await this.repositoryManager.updateRepository(name, dependencyGraph, metadata);
    }
  }

  async analyzeChange(name, file, change) {
    const repository = this.repositoryManager.getRepository(name);
    if (repository) {
      const dependencyGraph = repository.dependencyGraph;
      const metadata = repository.metadata;
      const code = metadata[file].code;
      const tree = this.parser.parse(code);
      // Perform incremental building of the dependency graph based on the change
      // Perform change classification
      // Perform change may-impact analysis
      // Update the dependency graph and metadata
      await this.repositoryManager.updateRepository(name, dependencyGraph, metadata);
    }
  }
}

module.exports = StaticAnalyzer;
