// Dummy Data
const products = [
    { id: 1, name: 'Laptop', price: 999, stock: 10, image: 'https://via.placeholder.com/250x150?text=Laptop' },
    { id: 2, name: 'Mouse', price: 25, stock: 50, image: 'https://via.placeholder.com/250x150?text=Mouse' },
    { id: 3, name: 'Keyboard', price: 75, stock: 30, image: 'https://via.placeholder.com/250x150?text=Keyboard' },
    { id: 4, name: 'Monitor', price: 299, stock: 5, image: 'https://via.placeholder.com/250x150?text=Monitor' },
    { id: 5, name: 'Headphones', price: 149, stock: 20, image: 'https://via.placeholder.com/250x150?text=Headphones' },
    { id: 6, name: 'Printer', price: 199, stock: 8, image: 'https://via.placeholder.com/250x150?text=Printer' }
];

const cart = [
    { id: 1, name: 'Laptop', quantity: 1, price: 999 },
    { id: 2, name: 'Mouse', quantity: 2, price: 25 }
];

const notifications = [
    'Low stock alert: Monitor (5 remaining)',
    'New order received: Order #12345',
    'Product updated: Keyboard price changed'
];

const orders = [
    { id: 'ORD001', status: 'Shipped', date: '2023-10-01' },
    { id: 'ORD002', status: 'Pending', date: '2023-10-02' },
    { id: 'ORD003', status: 'Delivered', date: '2023-09-28' }
];

const users = [
    { id: 1, name: 'Admin User', role: 'Admin' },
    { id: 2, name: 'John Doe', role: 'Manager' },
    { id: 3, name: 'Jane Smith', role: 'Employee' }
];

const adminProducts = products.map(p => ({ id: p.id, name: p.name, stock: p.stock }));

const transactions = [
    { id: 'TXN001', type: 'Sale', amount: 1024, date: '2023-10-01' },
    { id: 'TXN002', type: 'Purchase', amount: -500, date: '2023-10-02' },
    { id: 'TXN003', type: 'Sale', amount: 299, date: '2023-10-03' }
];

const stores = [
    { name: 'Online Store A', products: [{ name: 'Laptop', stock: 20 }, { name: 'Mouse', stock: 30 }] },
    { name: 'Online Store B', products: [{ name: 'Keyboard', stock: 15 }, { name: 'Monitor', stock: 10 }] },
    { name: 'Physical Store C', products: [{ name: 'Headphones', stock: 25 }, { name: 'Printer', stock: 5 }] }
];

const chatMessages = [
    'Welcome to SIS Chat!',
    'How can I help you today?',
    'Inventory updated successfully.'
];

// Sidebar Toggle
const sidebar = document.querySelector('aside');
const sidebarToggle = document.getElementById('sidebar-toggle');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Sidebar Navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
        item.classList.add('active');
        const tab = item.dataset.tab;
        document.getElementById(tab).classList.add('active');
    });
});

// Set initial active panel
document.getElementById('dashboard').classList.add('active');

// Scanner Button
document.getElementById('scanner-btn').addEventListener('click', () => {
    alert('Scanner feature coming soon!');
});

// Sub-tab Switching for Admin
document.querySelectorAll('.sub-tab').forEach(button => {
    button.addEventListener('click', () => {
        const adminPanel = document.getElementById('admin');
        adminPanel.querySelectorAll('.sub-tab').forEach(btn => btn.classList.remove('active'));
        adminPanel.querySelectorAll('.sub-panel').forEach(panel => panel.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.subtab).classList.add('active');
    });
});

// Calculate total products including stores
let totalStock = products.reduce((sum, p) => sum + p.stock, 0);
stores.forEach(store => {
    store.products.forEach(p => totalStock += p.stock);
});

// Update dashboard total products
document.querySelector('.card p').textContent = totalStock;

// Populate Inventory
const inventoryTableBody = document.querySelector('.inventory-table tbody');
products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.stock}</td>
        <td>
            <button class="action-btn" onclick="editProduct(${product.id})">Edit</button>
            <button class="action-btn" onclick="reorderProduct(${product.id})">Reorder</button>
            <button class="action-btn" onclick="deleteProduct(${product.id})">Delete</button>
        </td>
    `;
    inventoryTableBody.appendChild(row);
});

// Populate Cart
const cartItems = document.querySelector('.cart-items');
cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div>
            <h4>${item.name}</h4>
            <p>Quantity: ${item.quantity}</p>
        </div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
    `;
    cartItems.appendChild(cartItem);
});

// Populate Notifications
const notificationList = document.querySelector('.notification-list');
notifications.forEach(note => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = note;
    notificationList.appendChild(notification);
});

// Populate Orders
const orderTableBody = document.querySelector('.order-table tbody');
orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.status}</td>
        <td>${order.date}</td>
        <td><button class="action-btn">View</button></td>
    `;
    orderTableBody.appendChild(row);
});

// Populate Users
const usersTableBody = document.querySelector('#users .admin-table tbody');
users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td><button class="action-btn">Edit</button><button class="action-btn">Delete</button></td>
    `;
    usersTableBody.appendChild(row);
});

// Populate Admin Products
const productsAdminTableBody = document.querySelector('#products-admin .admin-table tbody');
adminProducts.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.stock}</td>
        <td><button class="action-btn">Edit</button><button class="action-btn">Delete</button></td>
    `;
    productsAdminTableBody.appendChild(row);
});

// Populate Transactions
const transactionsTableBody = document.querySelector('#transactions .admin-table tbody');
transactions.forEach(txn => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${txn.id}</td>
        <td>${txn.type}</td>
        <td>$${txn.amount}</td>
        <td>${txn.date}</td>
    `;
    transactionsTableBody.appendChild(row);
});

// Populate Stores
const storesTableBody = document.querySelector('.stores-table tbody');
stores.forEach(store => {
    store.products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${store.name}</td>
            <td>${product.name}</td>
            <td>${product.stock}</td>
        `;
        storesTableBody.appendChild(row);
    });
});

// Populate Chat Messages
const chatMessagesDiv = document.querySelector('.chat-messages');
chatMessages.forEach(msg => {
    const message = document.createElement('div');
    message.className = 'chat-message';
    message.textContent = msg;
    chatMessagesDiv.appendChild(message);
});

// Modal for Checkout
const modal = document.getElementById('modal');
const checkoutBtn = document.querySelector('.checkout-btn');
const closeBtn = document.querySelector('.close');
const confirmBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel-btn');

checkoutBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

confirmBtn.addEventListener('click', () => {
    alert('Checkout confirmed!');
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Edit Product Function
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    const newStock = prompt(`Edit stock for ${product.name}:`, product.stock);
    if (newStock !== null && !isNaN(newStock)) {
        product.stock = parseInt(newStock);
        alert(`Stock updated for ${product.name} to ${product.stock}!`);
        // In a real app, update the table or re-render
    }
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`${product.name} added to cart!`);
    // In a real app, update cart array and re-render
}

// Reorder Product Function
function reorderProduct(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Reorder request sent for ${product.name}!`);
    // In a real app, send reorder to supplier
}

// Delete Product Function
function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        alert(`${product.name} deleted!`);
        // In a real app, remove from inventory
    }
}

// Chat Send Message
document.querySelector('.chat-input button').addEventListener('click', () => {
    const input = document.querySelector('.chat-input input');
    if (input.value.trim()) {
        const message = document.createElement('div');
        message.className = 'chat-message';
        message.textContent = input.value;
        chatMessagesDiv.appendChild(message);
        input.value = '';
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
});

// Settings Save
document.querySelector('.save-btn').addEventListener('click', () => {
    const theme = document.getElementById('theme-select').value;
    const notifications = document.getElementById('notifications-toggle').checked;
    const language = document.getElementById('language-select').value;
    alert(`Settings saved!\nTheme: ${theme}\nNotifications: ${notifications ? 'Enabled' : 'Disabled'}\nLanguage: ${language}`);
    // In a real app, save to backend or localStorage
});