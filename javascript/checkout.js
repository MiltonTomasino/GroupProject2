function createCart() {
    if (window.localStorage.getItem("cart") == null) {
        //Quantity, Name, Price, Link to Product
        var cartArray = [
            [1, "Egg Rolls", 8.00, "orderonline.html"],
            [1, "Crab Rangoon", 9.00, "orderonline.html"],
            [2, "Spicy Wontons", 8.50, "orderonline.html"],
            [0, "Lettuce Wraps", 7.50, "orderonline.html"],
            [0, "Pork and Shrimp Potstickers", 7.50, "orderonline.html"],
            [0, "Char Siu Bao", 8.00, "orderonline.html"],
            [0, "Har Gao", 9.00, "orderonline.html"],
            [0, "Siu Mai", 8.50, "orderonline.html"],
            [0, "Lo Bak Gou", 7.50, "orderonline.html"],
            [0, "Lo Mai Gai", 7.50, "orderonline.html"],
            [0, "Beef Chow Fun", 14.00, "orderonline.html"],
            [0, "Dan Dan Noodles", 14.50, "orderonline.html"],
            [0, "Beef Soup with Hand Pulled Noodles", 16.50, "orderonline.html"],
            [0, "Spicy Beef Soup with Hand Pulled Noodles", 16.50, "orderonline.html"],
            [0, "Singapore Style Curry Noodles", 16.00, "orderonline.html"],
            [0, "Cantonese Style Wonton Soup With Hand Pulled Noodles", 16.50, "orderonline.html"],
            [0, "Beef With Broccoli", 16.00, "orderonline.html"],
            [0, "Mongolian Beef", 17.00, "orderonline.html"],
            [0, "Beef and Vegetable Stir Fry", 16.00, "orderonline.html"],
            [0, "Kung Pao Beef", 17.00, "orderonline.html"],
            [0, "Egg Custard", 7.00, "orderonline.html"],
            [0, "Red Bean Soup", 7.50, "orderonline.html"],
            [0, "Jian Dui", 5.50, "orderonline.html"],
            [0, "Sweet Taro Soup", 7.50, "orderonline.html"],
            [0, "Mango Sticky Rice", 7.50, "orderonline.html"],
            [0, "Date Ginger Tea", 2.50, "orderonline.html"],
            [0, "Bubble Tea", 5.50, "orderonline.html"],
            [0, "Coke", 3.00, "orderonline.html"],
            [0, "Diet Coke", 3.00, "orderonline.html"],
            [0, "Sprite", 3.00, "orderonline.html"],
            [0, "Plum Juice", 3.50, "orderonline.html"],
            [0, "Soy Milk", 2.50, "orderonline.html"],
            [0, "Tsing Tao Beer", 4.50, "orderonline.html"]
        ];

        window.localStorage.setItem("cart", JSON.stringify(cartArray));
    }
}

function createCheckout() {
    // create cart 
    var cart = JSON.parse(window.localStorage.getItem("cart"));
    var total = 0.00;
    var amountInCart = 0;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] > 0) {
            createCheckoutItem(i);
            total += (cart[i][2] * cart[i][0]);
            amountInCart += cart[i][0];
            // console.log(total)
        }
    }
    // console.log(total)
    // console.log("1")
    document.getElementById("totalPrice").textContent = "$" + total.toFixed(2);
}


function createCheckoutItem(id) {
    // create each item in cart
    var cart = JSON.parse(window.localStorage.getItem("cart"));

    var productTag = document.createElement("p");
    productTag.setAttribute("id", cart[id][1]);

    var a = document.createElement("a");
    var productName = document.createTextNode(cart[id][1]);
    a.appendChild(productName);
    a.href = cart[id][3];
    a.setAttribute("target", "_blank")
    productTag.appendChild(a);
    productTag.appendChild(document.createTextNode("\n"));

    var increaseButton = document.createElement("button");
    increaseButton.setAttribute("class", "quantity");
    var increaseCheckout = "increaseCheckoutItem(" + id + ")";
    increaseButton.setAttribute("onclick", increaseCheckout);
    var plusString = document.createTextNode("+");
    increaseButton.appendChild(plusString);
    productTag.appendChild(increaseButton);
    productTag.appendChild(document.createTextNode("\n"));

    var productQuantity = document.createElement("a");
    productQuantity.setAttribute("id", cart[id][1] + "Quantity");
    var QuantityAmount = document.createTextNode(cart[id][0]);
    productQuantity.appendChild(QuantityAmount);
    productTag.appendChild(productQuantity);
    productTag.appendChild(document.createTextNode("\n"));

    var decreaseButton = document.createElement("button");
    decreaseButton.setAttribute("class", "quantity");
    var decreaseCheckout = "decreaseCheckoutItem(" + id + ")";
    decreaseButton.setAttribute("onclick", decreaseCheckout);
    var minusString = document.createTextNode("-");
    decreaseButton.appendChild(minusString);
    productTag.appendChild(decreaseButton);
    productTag.appendChild(document.createTextNode("\n"));

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    var deleteCheckout = "deleteCheckoutItem(" + id + ")";
    deleteButton.setAttribute("onclick", deleteCheckout);
    var deleteString = document.createTextNode("Delete");
    deleteButton.appendChild(deleteString);
    productTag.appendChild(deleteButton);
    productTag.appendChild(document.createTextNode("\n"));

    var productPrice = document.createElement("span");
    productPrice.setAttribute("id", cart[id][1] + "Price");
    productPrice.setAttribute("class", "price");
    var productPriceTag = document.createTextNode("$" + (cart[id][2] * cart[id][0]).toFixed(2));
    productPrice.appendChild(productPriceTag);
    productTag.appendChild(productPrice);
    productTag.appendChild(document.createTextNode("\n"));

    var divElement = document.getElementById("cartList");
    divElement.appendChild(productTag);
}


function increaseCheckoutItem(id) {
    // add quantity
    var cart = JSON.parse(window.localStorage.getItem("cart"));

    cart[id][0]++;
    document.getElementById(cart[id][1] + "Quantity").textContent = cart[id][0];

    var productCost = document.getElementById(cart[id][1] + "Price").textContent;
    productCost = productCost.substring(1, productCost.length);
    productCost = parseFloat(productCost);
    productCost += cart[id][2];
    document.getElementById(cart[id][1] + "Price").textContent = "$" + productCost.toFixed(2);

    var totalCost = document.getElementById("totalPrice").textContent;
    totalCost = totalCost.substring(1, totalCost.length);
    totalCost = parseFloat(totalCost);
    totalCost += parseFloat(cart[id][2]);
    document.getElementById("totalPrice").textContent = "$" + totalCost.toFixed(2);

    window.localStorage.setItem("cart", JSON.stringify(cart))
}

function decreaseCheckoutItem(id) {
    // remove quantity
    var cart = JSON.parse(window.localStorage.getItem("cart"));

    if (cart[id][0] - 1 == 0) {
        deleteCheckoutItem(id);
    }
    else {
        cart[id][0]--;
        document.getElementById(cart[id][1] + "Quantity").textContent = cart[id][0];

        var productCost = document.getElementById(cart[id][1] + "Price").textContent;
        productCost = productCost.substring(1, productCost.length);
        productCost = parseFloat(productCost);
        productCost -= cart[id][2];
        document.getElementById(cart[id][1] + "Price").textContent = "$" + productCost.toFixed(2);

        var totalCost = document.getElementById("totalPrice").textContent;
        totalCost = totalCost.substring(1, totalCost.length);
        totalCost = parseFloat(totalCost);
        totalCost -= parseFloat(cart[id][2]);
        document.getElementById("totalPrice").textContent = "$" + totalCost.toFixed(2);
    }

    window.localStorage.setItem("cart", JSON.stringify(cart))
}

function deleteCheckoutItem(id) {
    // remove item
    if (confirm("Are you sure you want to remove this item from your cart?")) {
        var cart = JSON.parse(window.localStorage.getItem("cart"));
        document.getElementById(cart[id][1]).textContent = "";

        var wasQuantity = cart[id][0];
        cart[id][0] = 0;

        var totalCost = document.getElementById("totalPrice").textContent;
        totalCost = totalCost.substring(1, totalCost.length);
        totalCost = parseFloat(totalCost).toFixed(2);
        totalCost -= (cart[id][2] * wasQuantity);
        document.getElementById("totalPrice").textContent = "$" + totalCost.toFixed(2);

        window.localStorage.setItem("cart", JSON.stringify(cart))
    }
}
