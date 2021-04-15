export interface CateData {
  cat_Level: number;
  cat_Pid: string;
  status: number;
  _id: string;
  cat_Name: string;
}

export interface CateDataTree {
  cat_Level: number;
  cat_Pid: string;
  status: number;
  _id: string;
  cat_Name: string;
  children?:CateData[]
}