export interface Auth extends Object {
    _id:string,
    name?:string,
    rank?:Number

}
export interface User extends Object{
    _id:string,
    personalData?:{
        firstName?:string,
        lastName?:string,
    },
    rank?:Number
}

export interface Careers {
    _id:string,
    name?:string,
    description?:string,
    semesters:Array<Semester>
}

export interface Subject {
    _id:string,
    name?:string,
    description?:string,
    teachers?:Array<Object>,
    students?:Array<Object>,
    taks?:Array<Object>
}
export interface Task {
    _id:string,
    title?:string,
    description?:string,
    teacher?:Array<Object>,
    students?:Array<Object>,
    initialDate?:string,
    finalDate?:string,
    state?:string,
    studentsCompletedTasks?:Array<Object>
}
export interface CompletedTask {
    _id?:string,
    file?:string,
    student?:User,
    completedDate?:string,
    initialDate?:Array<Object>,
    finalDate?:Array<Object>,
    qualification?:number
}
export interface Event {
    _id:string,
    title?:string,
    description?:string,
    eventCreator?:Array<object>,
    confirmGuests:Array<User>,
    guests:Array<User>,
    initialDate?:string,
    finalDate?:string
}
export interface Semester {
    _id:string,
    semester?:number,
    Career?:Careers,
    teachers:Array<User>,
    students:Array<User>,
    subjects:Array<Subject>,
}
export interface TaskSent {
    tsk:string,
    id:string,
    auth:Auth
}