document.querySelectorAll(".service-card button").forEach(button => {
    button.addEventListener("click", (e) => {
        const card = e.target.closest(".service-card");

        const service = {
            name: card.dataset.name,
            price: card.dataset.price
        };

        localStorage.setItem("selectedService", JSON.stringify(service));

        window.location.href = "checkout.html";
    });
});
