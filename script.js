// Daftar produk minimarket
const products = [
    { id: 1, name: 'MINYAK', price: 17000, img: 'img/Minyak123.jpg' },
    { id: 2, name: 'GULA', price: 10000, img: 'img/GulaPasir.jpg' },
    { id: 3, name: 'AK47', price: 200000, img: 'img/AK-47.webp' },
    { id: 5, name: 'MAMALEMON', price: 5000, img: 'img/Mama Lemon.jpg' },
    { id: 6, name: 'PELURU', price: 500000, img: 'img/Peluru AK47.jpg' }
];

// Keranjang belanja
let cart = [];

// Format harga menjadi format Rupiah
function formatRupiah(number) {
    return number.toLocaleString('id-ID');
}

// Menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Harga: Rp ${formatRupiah(product.price)}</p>
            <button type="button" data-product-id="${product.id}">
                Tambah ke Keranjang
            </button>
        `;

        productDiv.querySelector('button').addEventListener('click', () => {
            addToCart(product.id);
        });

        productsContainer.appendChild(productDiv);
    });
}

// Menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Memperbarui isi keranjang dan total harga
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${
                formatRupiah(item.price * item.quantity)
            }`;

        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = formatRupiah(totalPrice);
}

// Proses checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const paymentInput = prompt(
        `Total belanja Anda Rp ${formatRupiah(total)}.\n` +
        'Masukkan jumlah pembayaran:'
    );

    // Jika pengguna menekan Cancel
    if (paymentInput === null) {
        return;
    }

    const payment = Number(paymentInput);

    if (!Number.isFinite(payment) || payment <= 0) {
        alert('Masukkan jumlah pembayaran yang valid.');
        return;
    }

    if (payment >= total) {
        const change = payment - total;

        alert(
            `Pembayaran berhasil!\n` +
            `Total: Rp ${formatRupiah(total)}\n` +
            `Kembalian: Rp ${formatRupiah(change)}`
        );

        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

// Event listener tombol checkout
document.getElementById('checkout-btn').addEventListener(
    'click',
    checkout
);

// Tampilkan produk saat halaman dimuat
displayProducts();
updateCart();