interface FuncTypes {
    objToQuerySting(obj: { [key: string]: string | number }): string //对象转queryString传参
    downloadUrlFile(url: string): void //通过url创建a标签下载文件
    getBrowser(): string //获取当前浏览器
    getHttpSearch(): { [key: string]: string | number } //获取当前queryString参数
    getUrlParams(type: 'hash' | 'search'): { [key: string]: string | number } //获取当前hash参数
    numToKString(num): string //数值千分化不考虑小数位数
    fmoney(s, n, m: number): string //数值千分化保留小数
}

class Func implements FuncTypes {

    /**
     * 对象转queryString传参
     * @param obj 要转换的对象
     * @returns queryString字符串
     */
    public objToQuerySting(obj: { [key: string]: string | number }): string {
        let str: string = ''
        let keys: string[] = Object.keys(obj)
        keys.forEach((item, index) => {
            str += `${item}=${obj[item]}${index === keys.length - 1 ? '' : '&'}`
        })
        return str
    }

    /**
     * 通过url创建a标签下载文件
     * @param url 下载文件url
     */
    public downloadUrlFile(url: string): void {
        var download_a = document.createElement("a");
        download_a.setAttribute("href", url);
        download_a.setAttribute("target", "_blank");
        download_a.setAttribute("id", "camnpr");
        document.body.appendChild(download_a);
        download_a.click();
        document.body.removeChild(download_a)
    }

    /**
     * 获取当前浏览器
     * @returns 浏览器名称
     */
    public getBrowser(): string {
        let userAgent = navigator.userAgent;
        if (/Edge/.test(userAgent)) {
            return 'Edge';
        } else if (/Trident/.test(userAgent)) {
            return 'IE';
        } else if (/Firefox/.test(userAgent)) {
            return 'Firefox';
        } else if (/Version/.test(userAgent)) {
            return 'Safari';
        } else if (/Chrome/.test(userAgent)) {
            return 'Chrome';
        }
    }

    /**
     * 获取当前queryString参数
     * @returns 当前queryString参数对象
     */
    getHttpSearch(): { [key: string]: string | number } {
        let search: string = location.search, obj = {};
        if (search === '') return obj;
        search = search.replace(/^\?/, '');
        search = search.replace(/&/g, '",').replace(/=/g, ': "');
        obj = eval('({' + search + '"})');
        for (let k in obj) {
            if (/^\d+$/.test(obj[k])) {
                obj[k] = parseFloat(obj[k]);
            }

            if (/%/.test(obj[k])) {
                obj[k] = decodeURI(obj[k]);
            }
        }
        return obj;
    }
    /**
     * 获取当前hash参数
     * @returns 当前hash的参数对象
     */
    getUrlParams(type: 'hash' | 'search'): { [key: string]: string | number } {
        let pageArr: any[] = type === 'hash' ? window.location.hash.split('#')[1]?.split('&') : window.location.search.split('?')[1]?.split('&')
        let sendData: { [key: string]: any } = {}
        pageArr?.forEach((v) => {
            let newInfo = v.split('=')
            sendData[newInfo[0]] = decodeURI(newInfo[1])
        })
        return sendData
    }
    /**
     * 数值千分化不考虑小数位数
     * @param num 
     * @returns 千分化小数不变
     */
    numToKString(num): string {
        if (!num && num !== 0) return "";
        let originNum = num;
        let reg = /\./;
        if (reg.test(num)) {
            num = num.toString();
            var ext = num.split('.')[1];
            num = num.split('.')[0];
        }
        num = num.toString();
        let reverseNum = '', string = '';
        for (let i = num.length - 1, j = 1; i >= 0, j <= num.length; i--, j++) {
            reverseNum += num[i];
            if (j % 3 === 0) {
                reverseNum += ',';
            }
        }
        for (let i = reverseNum.length - 1; i >= 0; i--) {
            string += reverseNum[i];
        }
        if (reg.test(originNum)) {
            string += '.' + ext;
        }
        return string.replace(/^,/, '');
    }
    /**
     * 数值千分化保留小数
     * @param s 要转换的数字
     * @param n 保留小数位数不足补0
     * @param m 解决计算机中小数的问题
     * @returns 按需保留千分化小数
     */
    fmoney(s, n, m = 100): string {
        if (!s && s != 0 && s != '0') {
            return s
        }
        n = n > 0 && n <= 20 ? n : 2;
        // s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(2) + '';
        s = Math.round((parseFloat((s + '').replace(/[^\d\.-]/g, ''))) * m) / m + ''
        if (isNaN(s)) {
            return '';
        }
        var l = s.split('.')[0].split('').reverse(),
            r = s.split('.')[1];
        var t = '';
        for (var i: any = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
        }
        if (!r) {
            r = '0';
        }
        if (r.length < n) {
            for (var i = r.length; i < n; i++) {
                r += '0';
            }
        } else {
            r = r.substr(0, n);
        }
        return t.split('').reverse().join('') + '.' + r;
    }
}

export const myFunc = new Func()