const express = require('express');
const router = express.Router();

const RepositoryManager = require('./repositoryManager');
const StaticAnalyzer = require('./staticAnalyzer');
const AdaptivePlanner = require('./adaptivePlanner');
const ContextManager = require('./contextManager');
const CodeEditor = require('./codeEditor');
const RepositoryMonitor = require('./repositoryMonitor');
const TaskMonitor = require('./taskMonitor');

const repositoryManager = new RepositoryManager();
const staticAnalyzer = new StaticAnalyzer();
const adaptivePlanner = new AdaptivePlanner();
const contextManager = new ContextManager();
const codeEditor = new CodeEditor();
const repositoryMonitor = new RepositoryMonitor();
const taskMonitor = new TaskMonitor();

// Load a repository
router.post('/loadRepository', async (req, res) => {
  const { name, path } = req.body;
  await repositoryManager.loadRepository(name, path);
  res.send({ message: 'Repository loaded successfully.' });
});

// Analyze a repository
router.post('/analyzeRepository', async (req, res) => {
  const { name } = req.body;
  await staticAnalyzer.analyzeRepository(name);
  res.send({ message: 'Repository analyzed successfully.' });
});

// Create a plan
router.post('/createPlan', async (req, res) => {
  const { name } = req.body;
  await adaptivePlanner.createPlan(name);
  res.send({ message: 'Plan created successfully.' });
});

// Gather spatial context
router.post('/gatherSpatialContext', async (req, res) => {
  const { name, block } = req.body;
  const spatialContext = await contextManager.gatherSpatialContext(name, block);
  res.send({ message: 'Spatial context gathered successfully.', spatialContext });
});

// Edit code
router.post('/editCode', async (req, res) => {
  const { name, block, prompt } = req.body;
  const edits = await codeEditor.editCode(name, block, prompt);
  res.send({ message: 'Code edited successfully.', edits });
});

// Monitor repository
router.post('/monitorRepository', async (req, res) => {
  const { name, edits } = req.body;
  await repositoryMonitor.monitorRepository(name, edits);
  res.send({ message: 'Repository monitored successfully.' });
});

// Monitor task
router.post('/monitorTask', async (req, res) => {
  const { name, edits } = req.body;
  const isValid = await taskMonitor.monitorTask(name, edits);
  res.send({ message: 'Task monitored successfully.', isValid });
});

module.exports = router;
