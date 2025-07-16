// @ts-ignore
export const required =  (a) => {
    return {
        status: a.length,
        message: `:attribute: نباید خالی باشد.`
    }
};
export const email =  (a) => {
    return {
        status: a.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
        message: `فرمت :attribute: صحیح نمی باشد.`
    }
};
export const url =  (a) => {
    return {
        status: a.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
        message: `:attribute: وارد شده صحیح نمی باشد.`
    }
};
export const phone =  (a) => {
    return {
        status: a.match(/^09\d{9}$/),
        message: `فرمت :attribute: باید 09xx xxx xxxx باشد.`
    }
};
export const min =  (a, min) => {
    return {
        status: a.length >= Number(min),
        message: `:attribute: باید حداقل ${min} کاراکتر باشد.`
    }
};

export const max =  (a, max) => {
    return {
        status: a.length <= Number(max),
        message: `:attribute: باید حداکثر ${max} کاراکتر باشد.`
    }
};
export const length =  (a, len) => {
    return {
        status: a.length == Number(len),
        message: `:attribute: باید ${max} کاراکتر باشد.`
    }
};

export const regex =  (a, regex) => {
    return {
        status: a.match(new RegExp(regex)),
        message: `:attribute: صحیح نمی باشد.`
    }
};

// @ts-ignore
export const same =  (a, name, b) => {
    return {
        status: a == b,
        message: `:attribute: با ${name} یکی نیست.`
    }
};