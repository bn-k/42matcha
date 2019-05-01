import gm from '@google/maps'
export const gKey = 'AIzaSyDTc93ie9KhEOJ_iPM_gqb5qfjwDyY8PPk';

const geo = gm.createClient({
    key: gKey,
});


export const fromAddr = (addr) => {
    geo.geocode({
        address: addr
    }, function(err, response) {
        if (!err) {
            console.log("Geocode  =======> ", response.json.results);
            return response.json.results
        } else {
            console.log("Geocode err  =======> ", err);
        }
    });
};
