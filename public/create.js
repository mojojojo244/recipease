const deleteBtn = document.getElementById('deleteBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
// const ok = document.getElementById('ok');
const numIngredients = document.getElementById('numIngredients');
numIngredients.addEventListener('change', () => {
  const count = document.getElementById('numIngredients').value;

  while (ingredientsContainer.hasChildNodes()) {
    ingredientsContainer.removeChild(ingredientsContainer.lastChild);
  }
  for (let i = 0; i < count; i++) {
    const ingredientInput = document.createElement('div');
    ingredientInput.innerHTML = `<div class="ingredient">
    <label for="ingredientName">Ingredient:</label>
    <input type="text" id="ingredientName" name="ingredientName" required />
    
    <label for="ingredientQty">Qty:</label>
    <input type="number" id="ingredientQty" name="ingredientQty"/>

    <label for"qtyType">Measurement</label>
    <select name="qtyType" id="qtyType">
      <option value="cups">cup</option>
      <option value="lb">lb</option>
      <option value="tsp">tsp</option>
      <option value="tbsp">tbsp</option>
      <option value="ounce">Oz</option>
          
    </div>`;

    ingredientsContainer.appendChild(ingredientInput);
  }
});
