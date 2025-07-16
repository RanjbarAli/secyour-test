export const useLimit = (str:string, limit:number = 20, addition:string = ' ...') => {
    return str.length <= limit ? str : str.substring(0, limit) + addition;
}