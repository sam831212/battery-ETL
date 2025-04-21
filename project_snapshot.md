# Project Snapshot

## Core Modules

- **that** (dynamic_loader.ts): No description available
- **DynamicLoader** (dynamic_loader.ts):  Dynamic loader class that handles loading modules from config
- **ModuleRegistry** (ModuleRegistry.ts):  Module registry to keep track of all registered module types
- **ModuleRegistry** (moduleRegistry.ts):  Module registry to keep track of all registered modules of a specific type

## UI Components

- **StatsCard** (StatsCard.tsx): React component
- **DataTable** (DataTable.tsx): React component
- **ExperimentForm** (ExperimentForm.tsx): React component
- **CollapsibleSidebar** (CollapsibleSidebar.tsx): React component
- **MainLayout** (MainLayout.tsx): React component
- **Sidebar** (Sidebar.tsx): React component
- **SidebarToggleButton** (SidebarToggleButton.tsx): React component
- **PipelineStages** (PipelineStages.tsx): React component
- **StageStatus** (StageStatus.tsx): React component
- **ModuleManager** (ModuleManager.tsx): React component
- **Badge** (badge.tsx): React component
- **Calendar** (calendar.tsx): React component
- **ChartStyle** (chart.tsx): React component
- **CommandDialog** (command.tsx): React component
- **CommandShortcut** (command.tsx): React component
- **ContextMenuShortcut** (context-menu.tsx): React component
- **DropdownMenuShortcut** (dropdown-menu.tsx): React component
- **MenubarShortcut** (menubar.tsx): React component
- **Skeleton** (skeleton.tsx): React component
- **Toaster** (sonner.tsx): React component
- **Toaster** (toaster.tsx): React component
- **ActionButtons** (ActionButtons.tsx): React component
- **ConfigSelector** (ConfigSelector.tsx): React component
- **DataPreviewSection** (DataPreviewSection.tsx): React component
- **DropZone** (DropZone.tsx): React component
- **FilePreview** (FilePreview.tsx): React component
- **FileUpload** (FileUpload.tsx): React component
- **FileValidation** (FileValidation.tsx): React component
- **ProcessingPipeline** (ProcessingPipeline.tsx): React component
- **ValidationResultDisplay** (ValidationResultDisplay.tsx): React component
- **SimpleChart** (SimpleChart.tsx): React component
- **IngestorModule** (module-decorator.ts):  Decorator for registering ingestor modules @param info - Module metadata @returns Decorator function
- **ExperimentModule** (module-decorator.ts):  Decorator for registering experiment modules @param info - Module metadata @returns Decorator function
- **PersistorModule** (module-decorator.ts):  Decorator for registering persistor modules @param info - Module metadata @returns Decorator function
- **Database** (Database.tsx): React component
- **DataUpload** (DataUpload.tsx): React component
- **Experiment** (Experiment.tsx): React component
- **Dashboard** (Index.tsx): React component
- **NotFound** (NotFound.tsx): React component
- **Pipeline** (Pipeline.tsx): React component
- **Settings** (Settings.tsx): React component
- **Visualization** (Visualization.tsx): React component

## React Hooks

- **useCarousel** (carousel.tsx): React hook
- **useChart** (chart.tsx): React hook
- **useFormField** (form.tsx): React hook
- **useSidebar** (sidebar.tsx): React hook
- **useIsMobile** (use-mobile.tsx): React hook
- **useToast** (use-toast.ts): React hook
- **usePipelineSimulation** (usePipelineSimulation.ts): React hook

## Utility Functions

- **validateFiles** (FileValidation.tsx): No description available
- **transformData** (data_transformer.ts):  Transform input data according to the provided schema mapping
- **parseYamlConfig** (configLoader.ts): No description available
- **value** (preprocessor.ts):  Removes statistical outliers using IQR method
- **pos** (preprocessor.ts):  Calculates quantile value for a sorted array
- **value** (preprocessor.ts):  Suggests outliers in the data and returns their indices and reasons. Uses IQR method for numeric fields.
- **validateData** (data_validator.ts):  Zod schemas for validating battery test data
- **cn** (utils.ts): No description available
- **loadPipelineConfig** (configLoader.ts):  Load pipeline configuration from a YAML string @param configYaml - YAML configuration string @returns Parsed configuration object
- **getAvailableMachineTypes** (configLoader.ts):  Get all available machine types from the registry @returns Array of machine type names and descriptions
- **getAvailableExperimentTypes** (configLoader.ts):  Get all available experiment types from the registry @returns Array of experiment type names and descriptions
- **getAvailablePersistors** (configLoader.ts):  Get all available persistence options from the registry @returns Array of persistor names and descriptions
- **buildPipeline** (configLoader.ts):  Build a complete processing pipeline from configuration @param config - Pipeline configuration object @returns Array of initialized pipeline stage instances

## Key Types and Interfaces

- **StatsCardProps** (StatsCard.tsx): TypeScript interface
- **DataTableColumn** (DataTable.tsx): TypeScript interface
- **DataTableProps** (DataTable.tsx): TypeScript interface
- **ExperimentFormProps** (ExperimentForm.tsx): TypeScript interface
- **MainLayoutProps** (MainLayout.tsx): TypeScript interface
- **SidebarToggleButtonProps** (SidebarToggleButton.tsx): TypeScript interface
- **PipelineStage** (PipelineStages.tsx): TypeScript interface
- **PipelineStagesProps** (PipelineStages.tsx): TypeScript interface
- **StageStatusProps** (StageStatus.tsx): TypeScript interface
- **BadgeProps** (badge.tsx): TypeScript interface
- **ButtonProps** (button.tsx): TypeScript interface
- **CommandDialogProps** (command.tsx): TypeScript interface
- **SheetContentProps** (sheet.tsx): TypeScript interface
- **TextareaProps** (textarea.tsx): TypeScript interface
- **ActionButtonsProps** (ActionButtons.tsx): TypeScript interface
- **SelectorOption** (ConfigSelector.tsx): TypeScript interface
- **ConfigSelectorProps** (ConfigSelector.tsx): TypeScript interface
- **DataPreviewProps** (DataPreviewSection.tsx): TypeScript interface
- **DropZoneProps** (DropZone.tsx): TypeScript interface
- **FilePreviewProps** (FilePreview.tsx): TypeScript interface
- **FileUploadProps** (FileUpload.tsx): TypeScript interface
- **FileValidationProps** (FileValidation.tsx): TypeScript interface
- **ProcessingPipelineProps** (ProcessingPipeline.tsx): TypeScript interface
- **ValidationResultDisplayProps** (ValidationResultDisplay.tsx): TypeScript interface
- **SimpleChartProps** (SimpleChart.tsx): TypeScript interface
- **RateCapabilityResult** (AnalyticsModule.ts): TypeScript interface
- **DegradationTrendResult** (AnalyticsModule.ts): TypeScript interface
- **AnomalyDetectionResult** (AnalyticsModule.ts): TypeScript interface
- **OCVGenerationResult** (AnalyticsModule.ts): TypeScript interface
- **ExperimentMetadata** (BaseExperiment.ts): TypeScript interface
- **ExperimentConfig** (BaseExperiment.ts): TypeScript interface
- **AnalysisResult** (BaseExperiment.ts): TypeScript interface
- **async** (BaseExperiment.ts): TypeScript interface
- **CyclingData** (CyclingExperiment.ts): TypeScript interface
- **return** (ArbinIngestor.ts): TypeScript interface
- **return** (ArbinIngestor.ts): TypeScript interface
- **IngestorMetadata** (BaseIngestor.ts): TypeScript interface
- **IngestorConfig** (BaseIngestor.ts): TypeScript interface
- **DataValidationResult** (BaseIngestor.ts): TypeScript interface
- **ModuleConstructor** (module.ts):  Core interfaces for module system
- **RegisteredModule** (module.ts):  Core interfaces for module system
- **LoadableModule** (module.ts):  Core interfaces for module system
- **for** (base_persistor.ts): TypeScript interface
- **BasePersistor** (base_persistor.ts): TypeScript interface
- **PreprocessingOptions** (preprocessor.ts):  Utility functions for data preprocessing
- **State** (use-toast.ts): TypeScript interface
- **PipelineStage** (usePipelineSimulation.ts): TypeScript interface
- **UsePipelineSimulationResult** (usePipelineSimulation.ts): TypeScript interface
- **FilterCriteria** (filter_criteria.ts): TypeScript interface
- **ModuleInfo** (moduleRegistry.ts):  Module registry for Battery Data Alchemy This module provides functionality to register and manage different types of modules such as data ingestors, experiment types, and data persistors.
- **RegisteredModule** (moduleRegistry.ts):  Module registry for Battery Data Alchemy This module provides functionality to register and manage different types of modules such as data ingestors, experiment types, and data persistors.

