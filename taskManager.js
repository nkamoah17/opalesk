const RepositoryManager = require('./repositoryManager');
const StaticAnalyzer = require('./staticAnalyzer');
const AdaptivePlanner = require('./adaptivePlanner');
const ContextManager = require('./contextManager');
const CodeEditor = require('./codeEditor');
const TaskMonitor = require('./taskMonitor');

class TaskManager {
  constructor() {
    this.repositoryManager = new RepositoryManager();
    this.staticAnalyzer = new StaticAnalyzer();
    this.adaptivePlanner = new AdaptivePlanner();
    this.contextManager = new ContextManager();
    this.codeEditor = new CodeEditor();
    this.taskMonitor = new TaskMonitor();
    this.tasks = {};
  }

  async createTask(name, taskSpecification) {
    // Parse task specification
    // Create a new task with the parsed specification
    this.tasks[name] = {
      specification: taskSpecification,
      state: 'pending',
    };
  }

  async handleTask(name) {
    const task = this.tasks[name];
    if (task) {
      // Load repository
      await this.repositoryManager.loadRepository(name, task.specification.path);

      // Perform static analysis
      await this.staticAnalyzer.analyzeRepository(name);

      // Create a plan for task execution
      await this.adaptivePlanner.createPlan(name);

      // Execute the task
      while (task.state !== 'completed') {
        // Gather context
        const context = await this.contextManager.gatherContext(name, task.specification.block);

        // Generate code edits
        const edits = await this.codeEditor.generateEdits(context);

        // Apply code edits
        await this.repositoryManager.applyEdits(name, edits);

        // Update task state
        task.state = await this.taskMonitor.checkTaskState(name, task.specification);

        // If task state is 'error', adapt the plan
        if (task.state === 'error') {
          await this.adaptivePlanner.adaptPlan(name, task.specification.file, edits);
        }
      }
    }
  }

  getTask(name) {
    return this.tasks[name];
  }
}

module.exports = TaskManager;
