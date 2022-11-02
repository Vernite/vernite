export enum TaskType {
  NONE = -1,
  TASK = 0,
  USER_STORY = 1,
  ISSUE = 2,
  EPIC = 3,
  SUBTASK = 4,
}

export const TaskTypeHierarchy = {
  [TaskType.NONE]: [TaskType.TASK, TaskType.EPIC, TaskType.USER_STORY, TaskType.ISSUE],
  [TaskType.TASK]: [TaskType.SUBTASK, TaskType.ISSUE],
  [TaskType.EPIC]: [TaskType.USER_STORY, TaskType.ISSUE, TaskType.TASK],
  [TaskType.USER_STORY]: [TaskType.SUBTASK],
  [TaskType.ISSUE]: [TaskType.SUBTASK],
  [TaskType.SUBTASK]: [],
} as { [key in TaskType]: TaskType[] };
