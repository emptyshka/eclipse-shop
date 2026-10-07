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
        name: "Футболка ECLIPSE",
        price: 2990
    },
    {
        id: 4,
        name: "Трусы ECLIPSE",
        price: 1660
    },
    {
        id: 5,
        name: "Носки ECLIPSE",
        price: 1111
    }
];

let cart = [];

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

function renderCart() {
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