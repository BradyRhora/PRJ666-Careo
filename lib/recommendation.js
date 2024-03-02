const { getIngredientsByProductId } = require("./models/ingredientProduct");
const { getAllProducts } = require("./models/product");


// Receives a user profile as a javascript object, returns null in case of error
async function recommend(profile) {
  try {
    let recommendation = {};

    let products = await getAllProducts();
    console.log("Retrieved " + products.length + " products.");

    // Join ingredient data to product for easier processing
    // TODO: Rework this to use populate() or left-join via aggregate() mongoose in the model source files
    for (let i = 0; i < products.length; i++) {
      let ingredients = getIngredientsByProductId(products[i]._id);
      products[i].ingredients = ingredients;
    }

    // Build a Set of product types, Set because each element should be unique and this saves time on unique checks
    // TODO: look into allowing querying of this instead depending on processing vs. querying time
    // TODO: Tailor the types of product needed based on age and conditions
    let productTypes = new Set();
    for (let i = 0; i < products.length; i++) {
      productTypes.add(products[i].type);
    }

    // TODO: potentially add these filters in the query step
    // Filter out products by vegan/cruelty-free
    if (profile.vegan) {
      products = products.filter((product) => product.vegan);
    }

    if (profile.crueltyFree) {
      products = products.filter((product) => product.crueltyFree);
    }

    // if conditions isn't empty, do the algo for conditions
    if (profile.conditions) {
      // TODO: Get conditions, then their bad/good ingredients from the database based on profile conditions
      // const conditions = getConditionsByIds(profile.conditions) sorta deal
      const conditions = [];

      // good ingredient dictionary, has ingredient name as the key and the number of conditions the ingredient helps as the value.
      let goodIngredients = {};

      // build value table here while sorting through conditions to build the lists of good and bad ingredients
      // NOTE: this is all example code, conditions.goodIngredients does not yet exist
      for (let i = 0; i < conditions.length; i++) {
        for (let j = 0; j < conditions[i].goodIngredients.length; j++) {
          if (goodIngredients[conditions[i].goodIngredients[j].name]) {
            goodIngredients[conditions[i].goodIngredients[j].name] += 1;
          } else {
            goodIngredients[conditions[i].goodIngredients[j].name] = 1;
          }
        }
      }

      // Bad ingredients can be kept a simple array
      // TODO: Horrifyingly inefficient, look into Sets as an alternative to arrays, could simplify insertion
      const badIngredients = [];
      for (let i = 0; i < conditions.length; i++) {
        for (let j = 0; j < conditions[i].badIngredients.length; j++) {
          if (!badIngredients.includes(conditions[i].badIngredients[j])) {
            badIngredients.push(conditions[i].badIngredients[j]);
          }
        }
      }
      
      if (badIngredients) {
        // Filter out products by bad ingredients
        // NOTE: This is CRAZY inefficient as is, would be worth storing data less efficiently in the database to speed this up.
        // i.e. store an array of which conditions a product is bad for directly with the product
        products = products.filter((product) => {
          badIngredients.some(v => !product.ingredients.includes(v))
        });
      }
      
      if (goodIngredients) {
        // Add value to products based on the valuetable and their ingredients
        // TOOD: build max heap instead for more efficient extraction? might have to revisit for budget balancing later, look into potential data structures
        for (let i = 0; i < products.length; i++) {
          products[i].value = 0;
          for (let j = 0; j < products[i].ingredients.length; j++) {
            if (goodIngredients[products[i].ingredients[j]].name) {
              products[i].value += goodIngredients[products[i].ingredients[j].name]
            }
          }
        }

        // TODO: Check for sponsored status. Add sponsored as a key to the Product type? 

        // Sort the products by value descending (0-index has the highest value)
        products.sort((a, b) => {
          return b.value - a.value;
        });

        // add the highest rated product first
        recommendation[products[0].type] = products[0];

        // Tracks the last product added
        let lastProduct = products[0];

        // Now for the fun loop where we do the rest of the actual work
        // Exits when the recommendation has every type of product in it
        while(!(recommendation.length == productTypes.length)) {
          // Filter out products based on type
          products = products.filter((product) => product.type != lastProduct.type);

          // Filter out products based on incompatible ingredients from the previously added ingredient
          // NOTE: again, product.incompatible does not exist, need to figure out how the data fits together in the DB to shape the model
          products = products.filter((product) => lastProduct.incompatible.includes(product.ingredients));
          
          // OOPS no products left that work.
          if (products.length == 0) {
            // TODO: Start from scratch again? Maybe work with a copy of the original product array and
            // get rid of the top product before restarting the process in this loop.
          }

          // Add the next best product of a different type
          recommendation[products[0].type] = products[0];
          lastProduct = products[0];
        }

        // ayy lookit that we got the recommendation list

        // TODO: budget balancing, change algo to work with copy of products list inside the while loop to allow for retrying

        return recommendation;
      }
    }
    else {
      // In case they have no conditions.

      // TODO: Implement a functionally random algo based on sponsored products.
    }

  } catch(err) {
    console.error(err.message);
    return null;
  }
  
}