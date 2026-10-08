const products = [
    {
        id: 1,
        name: "Ветровка ECLIPSE",
        price: 4880
    },
    {
        id: 2,
        name: "Штаны ECLIPSE",
        price: 3570
    },
    {
        id: 3,
        name: "Худи ECLIPSE",
        price: 2990
    },
    {
        id: 4,
        name: "Кепка ECLIPSE",
        price: 1660
    },
    {
        id: 5,
        name: "Носки ECLIPSE",
        price: 1111
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const productId = Number(productCard.dataset.id);

        const product = products.find(item => item.id === productId);

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        renderCart();

        console.log("Корзина:", cart);
    });
});

const cartItems = document.querySelector("#cart-items");

renderCart();

function renderCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    cartItems.innerHTML = "";

    cart.forEach(product => {
        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <p>${product.name}</p>
            <p>${product.price} ₽ × ${product.quantity}</p>

            <button class="decrease" data-id="${product.id}">−</button>
            <button class="increase" data-id="${product.id}">+</button>
            <button class="remove" data-id="${product.id}">Удалить</button>
        `;

        cartItems.appendChild(item);
    });

    const total = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    document.querySelector("#cart-total").textContent = `Итого: ${total} ₽`;
}

cartItems.addEventListener("click", event => {
    const productId = Number(event.target.dataset.id);
    const product = cart.find(item => item.id === productId);

    if (event.target.classList.contains("increase")) {
        product.quantity += 1;
    }

    if (event.target.classList.contains("decrease")) {
        product.quantity -= 1;

        if (product.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }

    if (event.target.classList.contains("remove")) {
        cart = cart.filter(item => item.id !== productId);
    }

    renderCart();
});

const orderForm = document.querySelector("#order-form");
const orderMessage = document.querySelector("#order-message");

orderForm.addEventListener("submit", event => {
    event.preventDefault();

    orderMessage.textContent = "Заказ создан!";

    cart = [];

    localStorage.removeItem("cart");

    renderCart();

    orderForm.reset();
});

const colorButtons = document.querySelectorAll(".color-button");

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const image = productCard.querySelector("img");
        const color = button.dataset.color;

        const imageNames = {
            1: {
                black: "windbreaker_black.PNG",
                grey: "windbreaker_grey.PNG"
            },
            2: {
                black: "pants_black.PNG",
                grey: "pants_grey.PNG"
            },
            3: {
                black: "hoodie_black.PNG",
                grey: "hoodie_grey.PNG"
            },
            4: {
                black: "cap_black.PNG",
                grey: "cap_grey.PNG"
            }
        };

        const productId = productCard.dataset.id;

        image.src = `eclipse_images/${imageNames[productId][color]}`;
    });
});