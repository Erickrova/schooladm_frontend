export interface Auth extends Object {
  _id: string
  name?: string
  rank?: Number
}
export interface User extends Object {
  _id: string
  personalData?: {
    firstName?: string
    lastName?: string
  }
  rank?: Number
}

export interface Careers {
  _id: string
  name?: string
  description?: string
  semesters: Array<Semester>
}

export interface Subject {
  _id: string
  name?: string
  description?: string
  teachers?: Array<Object>
  students?: Array<Object>
  taks?: Array<Object>
}
export interface Task {
  _id: string
  title?: string
  description?: string
  teacher?: Array<Object>
  students?: Array<Object>
  initialDate?: string
  finalDate?: string
  state?: string
  studentsCompletedTasks?: Array<Object>
}
export interface CompletedTask {
  _id?: string
  file?: string
  student?: User
  completedDate?: string
  initialDate?: Array<Object>
  finalDate?: Array<Object>
  qualification?: number
}
export interface Event {
  _id: string
  title?: string
  description?: string
  eventCreator?: Array<object>
  confirmGuests: Array<User>
  guests: Array<User>
  initialDate?: string
  finalDate?: string
}
export interface Semester {
  _id: string
  semester: number
  Career?: Careers
  teachers: Array<User>
  students: Array<User>
  subjects: Array<Subject>
}
export interface TaskSent {
  file: string
  taskId: string
  studentId: string
}
export interface addSubjectsParams {
  career: String
  semester: Number
  subjectList: Array<Subject>
}
export interface addStudentsParams {
  career: String
  semester: Number
  studentList: Array<User>
}

export interface ChildrenProps {
  children: JSX.Element | JSX.Element[]
}
export interface TaskContext {
  sendTask: (props: TaskSent) => Promise<boolean>
  getTask: (id: string) => Promise<Task>
  getTeacherTask: (teacherId: string) => Promise<Array<Task>>
  createTask: (taskData: Object) => Promise<Object>
  deleteTask: (id: string) => Promise<Boolean>
  qualifyTask: (data: Object) => Promise<string>
  hiddingTasks: (
    tasksFilter: Array<Task>,
    specialTaskFilter?: boolean,
  ) => Array<Task>
  tasks: Array<Task>
  setTasks: (t: Array<Task>) => void
  studentTasks: Array<Task>
  setStudentTasks: (t: Array<Task>) => void
  studentQualifiedTasks: Array<any>
  setStudentQualifiedTasks: (t: Array<any>) => void
  studentDeliveredTasks: Array<Task>
  setStudentDeliveredTasks: (t: Array<Task>) => void
  studentPendingTasks: Array<Task>
  setStudentPendingTasks: (t: Array<Task>) => void
  getStudentSentTask: (taskId: string, userId: string) => Promise<CompletedTask>
}
