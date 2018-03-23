var curr_result = null;

const space_image = document.getElementById('space_image');

space_image.addEventListener('mouseover', function(e) {
    console.log("aye lmao");
});

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
    return {
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
        .then(function(search_obj) {
            curr_result = search_obj;
            save_search(query, search_obj);
        })
        .catch(function(err) {
            console.log("Error: " + err);
        })
}

function save_search(query, search_obj) {
    window.localStorage.setItem(query, JSON.stringify(search_obj));
}

Array.prototype.first = function() {
    return this[0];
}
