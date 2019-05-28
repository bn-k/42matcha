import env from "../../env";
import store from '../../redux/store/matcha-store'

export const getAge = (iso) =>  {
    const dateold = new Date(iso);
    const datenew = new Date();
    var ynew = datenew.getFullYear();
    var mnew = datenew.getMonth();
    var dnew = datenew.getDate();
    var yold = dateold.getFullYear();
    var mold = dateold.getMonth();
    var dold = dateold.getDate();
    var diff = ynew - yold;
    if(mold > mnew) diff--;
    else
    {
        if(mold === mnew)
        {
            if(dold > dnew) diff--;
        }
    }
    return diff;
};

export function compareAge(a, b){
    if (a.Properties.birthday < b.Properties.birthday) return 1;
    if (a.Properties.birthday > b.Properties.birthday) return -1;
    return 0;
}

export function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}
export const compareLocalistation =  user => {
    return (a, b) => {
        const d1 = distance(user.latitude, user.longitude, a.Properties.latitude, a.Properties.longitude, "K");
        const d2 = distance(user.latitude, user.longitude, b.Properties.latitude, b.Properties.longitude, "K");
        if (d1 > d2) return 1;
        if (d1 < d2) return -1;
        return 0;
    }
};
export function compareScore(a, b){
    if (a.Properties.birthday < b.Properties.birthday) return 1;
    if (a.Properties.birthday > b.Properties.birthday) return -1;
    return 0;
}
export function compareTags(a, b){
    if (a.Properties.birthday < b.Properties.birthday) return 1;
    if (a.Properties.birthday > b.Properties.birthday) return -1;
    return 0;
}

export const report = (username) => {
    let init = {
        method: 'POST',
        headers:{
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/report/' + username, init)
};

export function timeSince(date) {
    date = new Date(date);

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
