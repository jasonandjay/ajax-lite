export let ajax = {
    index: 1,
    get: function(url, param, callback){
        let search = [], _url = '';
        let xml=new XMLHttpRequest();
        for (let key in param){
            search.push(key+'='+param[key]);
        }
        _url = url+((/\?/.test(url))?'&':'?')+search.join('&');
        xml.open('GET', _url+'&_='+(+new Date()), true);
        xml.onreadystatechange=function() {
            if (xml.readyState==4 && xml.status==200) {
                let res = JSON.parse(xml.responseText);
                if (callback && typeof callback == 'function')
                    callback(res);
            }
        };
        xml.send();
    },
    post: function(url, param, callback){
        let search = [];
        let xml=new XMLHttpRequest();
        for (let key in param){
            search.push(key+'='+param[key]);
        }
        let date = (/\?/.test(url))?'&_='+(+new Date()): '?_'+(+new Date());
        xml.open('POST', url+date, true);
        xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xml.onreadystatechange=function() {
            if (xml.readyState==4 && xml.status==200) {
                let res = JSON.parse(xml.responseText);
                if (callback && typeof callback == 'function')
                    callback(res);
            }
        };
        xml.send(search.join('&'));
    },
    jsonp: function(url, param, callback){
        let search = [], _url='';
        for (let key in param){
            search.push(key+'='+param[key]);
        }
        _url = url+((/\?/.test(url))?'&':'?')+search.join('&')+'&_='+(+new Date())+'&callback=jsonp'+this.index;

        var hm = document.createElement("script");
        hm.src = _url;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
        window['jsonp'+this.index] = function(res){
            hm.parentNode.removeChild(hm);
            if (callback && typeof callback == 'function')
                callback(res);
        };
        this.index++;
    }
};