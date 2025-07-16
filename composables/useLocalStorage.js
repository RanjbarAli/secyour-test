export const useLocalStorage = window && 'localStorage' in window? window.localStorage : {
    removeItem: (a) => {
        console.log('Remove Item called')
    },
    getItem: (a) => {console.log('Get Item called')},
    setItem: (a,b) => {console.log('Set Item called')}
}
