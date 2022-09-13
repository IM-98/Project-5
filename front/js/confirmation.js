let orderId = new URL(location.href).searchParams.get("id");

const order = document.getElementById("orderId")

order.innerText = orderId

localStorage.clear()