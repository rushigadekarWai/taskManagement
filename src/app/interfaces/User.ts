export interface User{
  id:string,
  name:string,
  email:string,
  password:string
}

export interface Project {
  id: number;  // Change from number to string
  title: string;
  description: string;
  createdBy: string;
  projectManager: string;
  startDate: string;
  endDate: string;
}

// export interface Task {
//   id: number;
//   projectId: number;
//   title: string;
//   assignedTo: string;
//   status: string;
//   priority: string;
//   estimate: string;
//   timeSpent: string;
//   dueDate: string;
// }


// export interface Project {
//   id: number;
//   title: string;
//   description: string;
//   createdBy: string;
//   projectManager: string;
//   startDate: string;
//   endDate: string;
// }




