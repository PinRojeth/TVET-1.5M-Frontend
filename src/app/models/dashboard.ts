export interface MainCount {
  staff_count: number;
  user_count: number;
  request_count: number;
  file_count: number;
}

export interface GraphDate {
  request_graph: Graph;
  response_graph: Graph;
}

interface Graph {
  date: Date | string[];
  value: number[];
}

export interface DocSummary {
  image: FileSum;
  pdf: FileSum;
  word: FileSum;
  excel: FileSum;
  video: FileSum;
  other: FileSum;
}

export interface FileSum {
  file_size: number;
  file_count: number;
}
