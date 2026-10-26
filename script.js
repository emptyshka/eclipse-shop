let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const productId = Number(productCard.dataset.id);

        const product = products.find(item => item.id === productId);

        const selectedColor = productCard.querySelector(".color-button.active")?.dataset.color || "grey";

        const existingProduct = cart.find(
            item => item.id === productId && item.color === selectedColor
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                color: selectedColor,
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

    cartItems.replaceChildren();

    cart.forEach(product => {
        const item = document.createElement("div");
        item.className = "cart-item";

        const name = document.createElement("p");
        name.textContent = product.name;
        item.appendChild(name);

        if (product.color) {
            const color = document.createElement("p");
            color.textContent = `Цвет: ${product.color === "black" ? "чёрный" : "серый"}`;
            item.appendChild(color);
        }

        const price = document.createElement("p");
        price.textContent = `${product.price} ₽ × ${product.quantity}`;
        item.appendChild(price);

        const decreaseButton = createCartButton("decrease", "−", product);
        const increaseButton = createCartButton("increase", "+", product);
        const removeButton = createCartButton("remove", "Удалить", product);
        item.append(decreaseButton, increaseButton, removeButton);

        cartItems.appendChild(item);
    });

    const total = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    document.querySelector("#cart-total").textContent = `Итого: ${total} ₽`;
}

function createCartButton(className, text, product) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.dataset.id = product.id;
    if (product.color) {
        button.dataset.color = product.color;
    }
    return button;
}

cartItems.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button || !cartItems.contains(button)) {
        return;
    }

    const productId = Number(button.dataset.id);
    const product = cart.find(item =>
        item.id === productId && item.color === button.dataset.color
    );
    if (!product) {
        return;
    }

    if (button.classList.contains("increase")) {
        product.quantity += 1;
    }

    if (button.classList.contains("decrease")) {
        product.quantity -= 1;

        if (product.quantity === 0) {
            cart = cart.filter(item => item !== product);
        }
    }

    if (button.classList.contains("remove")) {
        cart = cart.filter(item => item !== product);
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
    if (button.dataset.color === "grey") {
        button.classList.add("active");
    }
});

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const image = productCard.querySelector("img");
        const color = button.dataset.color;
        const buttons = productCard.querySelectorAll(".color-button");
        buttons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const productId = productCard.dataset.id;

        image.src = `eclipse_images/${imageNames[productId][color]}`;
    });
});