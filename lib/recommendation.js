import { getConditionByName } from "./models/condition";
import { getIncompatibilitiesByIngredientId } from "./models/incompatible";

const { getAllProducts } = require("./models/product");
const { getIngredientsByProductId } = require("./models/ingredientProduct");

// Receives a user profile as a javascript object, returns null in case of error
async function recommend(profile) {
  try {
    let recommendation = {};

    let products = await getAllProducts();
    console.log("Retrieved " + products.length + " products.");

    // Join ingredient data to product for easier processing
    // TODO: Rework this to use populate() or left-join via aggregate() mongoose in the model source files
    for (let i = 0; i < products.length; i++) {
      let ingredients = await getIngredientsByProductId(products[i]._id);
      products[i].ingredients = ingredients ? ingredients : [];

      // set up ingredient incompatibilities
      // test this once we have proper ingredient IDs in incompats
      products[i].incompatibilities = [];
      for (let j = 0; j < products[i].ingredients.length; j++) {
        try {
          const incompats = await getIncompatibilitiesByIngredientId(products[i].ingredients[j]);
          if (incompats) {
            products[i].incompatibilities.push(...incompats);
          }
        } catch (err) {
          //console.log("Could not find incompats for ingredient ID: " + products[i].ingredients[j]);
        }
      }
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
      products = products.filter((product) => product.is_vegan);
    }

    if (profile.crueltyFree) {
      products = products.filter((product) => product.is_cruelty_free);
    }

    // if conditions isn't empty, get condition details
    if (profile.conditions && profile.conditions.length > 0) {
      const conditions = [];
      for (let i = 0; i < profile.conditions.length; i++) {
        conditions.push(await getConditionByName(profile.conditions[i]));
      }

      // good ingredient dictionary, has ingredient name as the key and the number of conditions the ingredient helps as the value.
      let goodIngredients = {};

      // build value table here while sorting through conditions to build the lists of good and bad ingredients
      for (let i = 0; i < conditions.length; i++) {
        for (let j = 0; j < conditions[i].good_ingredient_id.length; j++) {
          if (goodIngredients[conditions[i].good_ingredient_id[j]]) {
            goodIngredients[conditions[i].good_ingredient_id[j]] += 1;
          } else {
            goodIngredients[conditions[i].good_ingredient_id[j]] = 1;
          }
        }
      }

      // Bad ingredients can be kept a simple array
      // TODO: Horrifyingly inefficient, look into Sets as an alternative to arrays, could simplify insertion
      const badIngredients = [];
      for (let i = 0; i < conditions.length; i++) {
        for (let j = 0; j < conditions[i].bad_ingredient_id.length; j++) {
          if (!badIngredients.includes(conditions[i].bad_ingredient_id[j])) {
            badIngredients.push(conditions[i].bad_ingredient_id[j]);
          }
        }
      }
      
      if (badIngredients) {
        // Filter out products by bad ingredients
        // NOTE: This is CRAZY inefficient as is, would be worth storing data less efficiently in the database to speed this up.
        // i.e. store an array of which conditions a product is bad for directly with the product
        for (let i = 0; i < badIngredients.length; i++) {
          products = products.filter((product) => {
            return !product.ingredients.includes(badIngredients[i]);
          })
        }
      }
      
      if (goodIngredients) {
        // Add value to products based on the valuetable and their ingredients
        // TOOD: build max heap instead for more efficient extraction? might have to revisit for budget balancing later, look into potential data structures
        for (let i = 0; i < products.length; i++) {
          products[i].value = 0;
          for (let j = 0; j < products[i].ingredients.length; j++) {
            if (goodIngredients[products[i].ingredients[j]]) {
              products[i].value += goodIngredients[products[i].ingredients[j]];
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
        while(!(Object.keys(recommendation).length === productTypes.size)) {
          // Filter out products based on type
          products = products.filter((product) => !(product.type == lastProduct.type));
          
          // NOTE: Works up to here

          // Filter out products based on incompatible ingredients from the previously added ingredient
          // NOTE: again, product.incompatible does not exist, need to figure out how the data fits together in the DB to shape the model
          products = products.filter((product) => {
            for (let j = 0; j < product.ingredients.length; j++) {
              for (let i = 0; i < lastProduct.incompatibilities.length; i++){
                if (lastProduct.incompatibilities[i] == product.ingredients[j]) {
                  return false;
                }
              }
            }
            return true;
          });

          // OOPS no products left that work.
          if (products.length == 0) {
            // TODO: Start from scratch again? Maybe work with a copy of the original product array and
            // get rid of the top product before restarting the process in this loop.
          }

          // Add the next best product of a different type
          recommendation[products[0].type] = products[0];
          lastProduct = products[0];
          // console.log("Recommendations: " + JSON.stringify(recommendation));
        }

        // ayy lookit that we got the recommendation list

        // TODO: budget balancing, change algo to work with copy of products list inside the while loop to allow for retrying

        console.log("finished recommendations");
        return Object.values(recommendation);     // Return only the actual products
      }
    }
    else {
      console.log("NO RECOMMENDATIONS");
      // In case they have no conditions.
      // TODO: Implement sponsored state for products, account for that

      // Randomize product list to ensure different results if the user has no conditions
      products.sort(() => Math.random() - 0.5);

      // Same logic as above with the while loop, taking the top product, and filtering out incompatible products
      recommendation[products[0].type] = products[0];

      let lastProduct = products[0];

      while (!(Object.keys(recommendation).length === productTypes.size)) {
        // Filter out products based on type
        products = products.filter((product) => !(product.type == lastProduct.type));

        // Filter out products based on incompatible ingredients from the previously added ingredient
        // NOTE: again, product.incompatible does not exist, need to figure out how the data fits together in the DB to shape the model
        products = products.filter((product) => {
          for (let j = 0; j < product.ingredients.length; j++) {
            for (let i = 0; i < lastProduct.incompatibilities.length; i++){
              if (lastProduct.incompatibilities[i] == product.ingredients[j]) {
                return false;
              }
            }
          }
          return true;
        });

        // OOPS no products left that work.
        if (products.length == 0) {
          // TODO: Start from scratch again? Maybe work with a copy of the original product array and
          // get rid of the top product before restarting the process in this loop.
        }

        // Add the next best product of a different type
        recommendation[products[0].type] = products[0];
        lastProduct = products[0];
      }

      console.log("finished recommendations");
      return Object.values(recommendation);     // Return only the actual products
    }

  } catch(err) {
    console.error(err.message);
    return null;
  }
  
}

export { recommend }