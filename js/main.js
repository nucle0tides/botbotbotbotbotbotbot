function status(response) {
    if (response.status == 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json(response) {
    return response.json();
}

function parse_json(json) {
    var {
        data: [{
                    date_created,
                    description,
                    title
                }],
        links: [{
                    href
                }]
    } = json.collection.items.first();
}

function search(query) {
    fetch("https://images-api.nasa.gov/search?q=" + query + "&media_type=image")
        .then(status)
        .then(json)
        .then(parse_json)
        .catch(function(err) {
            console.log("Error: " + err);
        })
}

function save_search(query, search_obj) {
    window.localStorage.setItem(query, search_obj);
}

Array.prototype.first = function() {
    return this[0];
}
