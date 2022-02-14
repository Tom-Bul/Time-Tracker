export interface Task {
  title: string;
  time: number;
  active: boolean;
  startDate: number;
  endDate: number;
}

export interface State {
  tasks: Task[];
}
