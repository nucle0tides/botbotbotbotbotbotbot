var curr_result = curr_result || {};

const space_image = document.getElementById('space_image');
const space_title = document.getElementById('space_title');
const space_caption = document.getElementById('space_caption');

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

function update(search_obj) { 
    space_image.src = curr_result.links.first().href;
    space_title.innerHTML = `${curr_result.data.first().title}`;
    space_caption.innerHTML = `&#8195;&#8195;&#8195;&#8195;${curr_result.data.first().description}`;
}

function search(query) {
    if window.get
    fetch("https://images-api.nasa.gov/search?q=" + query + "&media_type=image")
        .then(status)
        .then(json)
        .then(parse_json)
        .then(function(search_obj) {
            curr_result = search_obj;
            save_search(query, search_obj);
        })
        .then(update)
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
