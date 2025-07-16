function main () {
    return {
        set(name, value, minute) {
            const d = new Date();
            d.setTime(d.getTime() + (minute*60*1000));
            document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
        },
        all(type = null) {
            let decoded = decodeURIComponent(document.cookie).split(';')
            if (type === 'object') {
                if (!decoded.join('').length) return {}
                let object = {}
                for (let i = 0; i < decoded.length; i++) {
                    let c = decoded[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    c = c.split('=')
                    object[c[0]] = c[1]
                }
                return object
            } else return decoded
        },
        get(name) {
            name += "=";
            let ca = all()
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        check(name) {
            return get(name) != ""
        },
        erase(name) {
            set(name, '', -1)
        }
    }
}