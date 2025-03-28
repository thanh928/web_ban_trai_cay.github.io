
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Sản phẩm đã được thêm vào giỏ!');
    });
});

let products = [
    { name: "Táo Xanh New Zealand", price: 100000, img: "https://ngonfruit.com/wp-content/uploads/2021/10/tao-xanh-new-zealand-4-768x590.jpg" },
    { name: "Nho Xanh Không Hạt", price: 385000, img: "https://product.hstatic.net/200000423303/product/nho_xanh_khong_hat__non-gmo__-_500g_b19ad79e912744ebab047545baac117a_grande.png" }
];
function renderProducts() {
    let html = "";
    products.forEach((product, index) => {
        html += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Giá: ${product.price.toLocaleString()} VNĐ/kg</p>
                <button onclick="removeProduct(${index})">Xóa</button>
            </div>
        `;
    });
    document.querySelector(".product-list").innerHTML = html;
}
function addNewProduct() {
    let name = document.getElementById("product-name").value;
    let price = document.getElementById("product-price").value;
    let img = document.getElementById("product-image").value;

    if (name === "" || price === "" || img === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let newProduct = { name: name, price: parseInt(price), img: img };
    products.push(newProduct);
    renderProducts();

    
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-image").value = "";
}
function removeProduct(index) {
    products.splice(index, 1);
    renderProducts();
}
document.addEventListener("DOMContentLoaded", renderProducts);
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(index) {
    let product = products[index];
    let cartItem = cart.find(item => item.name === product.name);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function renderCart() {
    let cartList = document.querySelector(".cart-list");
    let totalPrice = 0;
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>Giá: ${item.price.toLocaleString()} VNĐ</p>
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Xóa</button>
            </div>
        `;
    });

    document.getElementById("total-price").textContent = totalPrice.toLocaleString();
}
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    alert("Đặt hàng thành công!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(index) {
    let product = products[index]; 
    let cartItem = cart.find(item => item.name === product.name);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.product button').forEach((button, index) => {
        button.addEventListener('click', () => addToCart(index));
    });
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(index) {
    let product = products[index];
    let cartItem = cart.find(item => item.name === product.name);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    renderCart();
}