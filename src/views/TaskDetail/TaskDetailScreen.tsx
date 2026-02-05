import React from 'react';
import useTaskDetailViewController from './useTaskDetailViewController';
import TaskDetailView from './TaskDetailView';

const TaskDetailScreen: React.FC = () => {
  const props = useTaskDetailViewController();
  return <TaskDetailView {...props} />;
};

export default TaskDetailScreen;
