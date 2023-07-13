export interface Auth extends Object {
    _id?:string,
    name?:string,
    rank?:Number

}
export interface User extends Object{
    _id?:string,
    personalData?:{
        firstName?:string,
        lastName?:string,
    },
    rank?:Number
}

export interface Careers {
    _id?:string,
    name?:string,
    description?:string,
    semesters?:Array<Object>
}

export interface Subject {
    _id?:string,
    name?:string,
    description?:string,
    teachers?:Array<Object>,
    students?:Array<Object>,
    taks?:Array<Object>
}
export interface Task {
    _id?:string,
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
    _id?:string,
    title?:string,
    description?:string,
    eventCreator?:Array<Object>,
    students?:Array<Object>,
    initialDate?:string,
    finalDate?:string
}