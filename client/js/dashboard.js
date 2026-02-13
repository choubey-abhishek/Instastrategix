const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "login.html";

document.getElementById("userInfo").innerHTML = `
    <h2>Welcome, ${user.name}</h2>
    <p>Email: ${user.email}</p>
`;

const history = JSON.parse(localStorage.getItem("paymentHistory")) || [];

document.getElementById("paymentHistory").innerHTML =
    history.length === 0
        ? "<p>No payments yet.</p>"
        : history.map(item => `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} | ${item.date}</p>
            </div>
        `).join("");
