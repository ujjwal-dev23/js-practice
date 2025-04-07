document.addEventListener("DOMContentLoaded", () => {
  const ProductListDisplay = document.getElementById("product-list")
  const CartEmptyDisplay = document.getElementById("empty-cart")
  const CartItemsDisplay = document.getElementById("cart-items")
  const totalPriceDisplay = document.getElementById("total-price")
  const checkoutBtn = document.getElementById("checkout-btn")
  const cartTotalDisplay = document.getElementById("cart-total")

  const products = [
    {id: 1, name: "Product 1", price: 20.99},
    {id: 2, name: "Product 2", price: 15.49},
  ]
  const cart = []

  function loadProducts(products) {
    products.forEach((item) => {
      const ItemDisplay = document.createElement("div")
      ItemDisplay.classList.add("product")
      ItemDisplay.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button data-id="${item.id}">Add to Cart</button>
      `
      ProductListDisplay.appendChild(ItemDisplay)
    })
  }

  function renderCart(){
    CartItemsDisplay.innerText = ""

    let totalCost = 0
    
    if (cart.length > 0) {
      cart.forEach((elem) => {
        totalCost += elem.price
        const cartItem = document.createElement("div")
        cartItem.innerHTML = `
        <span>${elem.name} - $${elem.price}</span>
        `
        CartItemsDisplay.appendChild(cartItem)
        cartTotalDisplay.classList.remove("hidden")
        totalPriceDisplay.textContent = `$${totalCost}`
      })
    }
    else {
      CartItemsDisplay.classList.add("hidden")
      cartTotalDisplay.classList.add("hidden")
      CartEmptyDisplay.classList.remove("hidden")
      CartEmptyDisplay.style.display = "block"
    }
  }

  function addToCart(product) {
    cart.push(product)
    renderCart()
  }

  loadProducts(products)

  ProductListDisplay.addEventListener("click", (e) => {
    e.stopPropagation()
    if (e.target.tagName !== "BUTTON") return
    addToCart(products.find(({id}) => id === parseInt(e.target.getAttribute("data-id"))))
  })

  checkoutBtn.addEventListener("click", () => {
    alert("Checkout successfull")
    cart.length = 0
    renderCart()
  })
})
