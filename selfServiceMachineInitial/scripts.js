let products = [
  {
    photo: "img/big-mac.png",
    name: "Big Mac",
    price: 5.99,
    active: false,
    quantity: 1,
    totalCost: 5.99,
  },
  {
    photo: "img/mc-chicken.png",
    name: "Mc Chicken",
    price: 4.99,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
  {
    photo: "img/double-cb.png",
    name: "Double Cheese Burger",
    price: 2.99,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
  {
    photo: "img/fries.png",
    name: "Fries",
    price: 2.99,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
  {
    photo: "img/nuggets.png",
    name: "Mc Nuggets",
    price: 3.49,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
  {
    photo: "img/salad.png",
    name: "Salad",
    price: 2.79,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
  {
    photo: "img/cola.png",
    name: "Coke",
    price: 1.99,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
  {
    photo: "img/lipton.png",
    name: "Ice Tea",
    price: 1.99,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
  {
    photo: "img/water.png",
    name: "Water",
    price: 1.49,
    active: false,
    quantity: 0,
    totalCost: 0,
  },
];
var productElements 

var u=0
const move = () => {
  console.log(    productElements= document.querySelectorAll('.product'));
  products.forEach(product => {
    if (product.name === productName) {
      product.totalCost = Math.round((product.totalCost - product.price) * 100) / 100;
      console.log(product.totalCost);
    }
  });
};
setInterval(move, 20000);
function UpdateScreen() {
}
function buttonDel(button) {
  var productElement = button.closest('.product')
  if (productElement) {
    var nameElement = productElement.querySelector('.name');
    if (nameElement) {
      var productName = nameElement.innerText;
      console.log("Moins Product Name: " + productName);

      products.forEach(product => {
        if (product.name === productName) {
          product.totalCost = Math.round((product.totalCost - product.price) * 100) / 100;
          console.log(product.totalCost);
        }
      });
    } else {
      console.log("Pas Name");
    }
  } else {
    console.log("Pas Parent");
  }



}
function buttonAdd(button) {
  var productElement = button.closest('.product');
  
  if (productElement) {
    var nameElement = productElement.querySelector('.name');
    if (nameElement) {
      var productName = nameElement.innerText;
      console.log("Plus Product Name: " + productName);
      products.forEach(product => {
        if (product.name === productName) {
          product.totalCost = Math.round((product.totalCost + product.price) * 100) / 100;
          console.log(product.totalCost);
        }
      });
    } else {
      console.log("Pas Name");
    }
  } else {
    console.log("Pas Parent");
  }
}

