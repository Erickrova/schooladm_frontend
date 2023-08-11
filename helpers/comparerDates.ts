/**
 * comapare two dates and return the greater or if they equals
 * @param {String} date1 
 * @param {String} date2 
 * @returns {Number} 1 if date1 greater than date2 | 2 if date2 greater than date1 | 0 if they are equals 
 */
export function comparerDates (date1:string,date2:string):number{
        const date1Splited = date1.split("-")
        const date2Splited = date2.split("-")
        if(Number(date1Splited[0]) > Number(date2Splited[0])){
          return 1
        }
        if(Number(date1Splited[0]) < Number(date2Splited[0])){
          return 2
        }
        if(Number(date1Splited[1]) > Number(date2Splited[1])){
          return 1
        }
        if(Number(date1Splited[1]) < Number(date2Splited[1])){
          return 2
        }
        if(Number(date1Splited[2]) > Number(date2Splited[2])){
          return 1
        }
        if(Number(date1Splited[2]) < Number(date2Splited[2])){
          return 2
        }
        return 0
}