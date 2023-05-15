// Testing fetch of multiple items
function fetchMenuData(category) {
    return fetch('/api/' + category)
    .then(response => response.json());
}

function populateMenuTable(category, tableID) {
    fetchMenuData(category)
        .then(data => {
            // Get the table body element
            let tbody = document.querySelector('#' + tableID);                  // unique IDs for each menuTable

            // Loop through the data and create a table row for each item
            data.forEach(item => {
                let tr = document.createElement('tr');                          // create new <tr> element in HTML

                // item name
                let nameTd = document.createElement('td');                      // create new <td> element for name
                nameTd.textContent = item.name;                                 // add text content -- name of item
                tr.appendChild(nameTd);                                         // append <td> name element to current row <tr>, closing tag auto populated

                // item image
                let imageTd = document.createElement('td');                     // create new <td> element for image
                let img = document.createElement('img');                        // create new <img> element -- path to image
                img.src = "." + item.picture;                                   // set img src to path
                img.width = 200;                                                // set width
                img.height = 200;                                               // set height
                imageTd.appendChild(img);                                       // append <img src> path element to the <td> image element
                tr.appendChild(imageTd);                                        // append <td> iamge element to current row <tr>, closing tag auto populated

                // item price
                let priceTd = document.createElement('td');                     // create new <td> element for price
                priceTd.textContent = "$" + item.price.toFixed(2);              // add text content -- price formatted w/ two decimal places and $ sign
                tr.appendChild(priceTd);                                        // append <td> price element to current row <tr>, closing tag auto populated

                // item description
                let descriptionTd = document.createElement('td');               // create new <td> element for description
                descriptionTd.textContent = item.description;                   // add text conent -- description of item
                tr.appendChild(descriptionTd);                                  // append <td> description element to current row <tr>, closing tag auto populated

                // add the new row to the table body
                tbody.appendChild(tr);                                          // append <tr> row entry for product to the table body element. closing tag auto populated

            });
        })
    .catch(error => console.error('Error:', error));
}

// Array of Menu Categories
const menuCategories = [
    ['apps', 'appsTable'],
    ['beef', 'beefTable'],
    ['noodles', 'noodlesTable'],
    ['dim_sum', 'dimSumTable'],
    ['desserts', 'dessertsTable'],
    ['drinks', 'drinksTable']
];

// Iterate over menu categories and call the populate function
for (let i = 0; i < menuCategories.length; i++) {
    const [category, tableID] = menuCategories[i];
    populateMenuTable(category, tableID);
}


// Usage
// populateMenuTable('apps', 'appsTable');
// populateMenuTable('drinks', 'drinksTable');
// populateMenuTable('beef', 'beefTable');
// populateMenuTable('noodles', 'noodlesTable');
// populateMenuTable('desserts', 'dessertsTable');
// populateMenuTable('dim_sum', 'dimSumTable');