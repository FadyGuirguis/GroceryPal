import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar/Navbar.jsx';
import Drawer from './Drawer/Drawer.jsx';
import Footer from './Footer/Footer.jsx';
import Aux from '../Aux.jsx';
import { Route, Redirect, Switch } from 'react-router-dom'; 
import Recipes from './Recipes/Recipes';
import Pantry from './Pantry/Pantry.jsx';
import ShoppingList from './ShoppingList/ShoppingList.jsx';
import api from '../../api/api' 

class Main extends Component {

  state = {
    drawerOpen: false,
    recipes: [
      {
        recipe: {
          uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_3099615f5a27b939fe91033b1ae9ffd6",
          label: "Chicken Breasts with Wild Mushrooms",
          image: "https://www.edamam.com/web-img/8da/8dad91b3e30c7d8495b8d9190e501341.jpg",
          source: "Food52",
          url: "https://food52.com/recipes/11118-chicken-breasts-with-wild-mushrooms",
          shareAs: "http://www.edamam.com/recipe/chicken-breasts-with-wild-mushrooms-3099615f5a27b939fe91033b1ae9ffd6/chicken+breast++mushrooms",
          yield: 6,
          dietLabels: [
              "Low-Carb"
          ],
          healthLabels: [
              "Sugar-Conscious",
              "Peanut-Free",
              "Tree-Nut-Free",
              "Alcohol-Free"
          ],
          cautions: [],
          ingredientLines: [
              "3 whole chicken breasts",
              "3 tablespoons extra-virgin olive oil",
              "12 ounces mixed wild mushrooms, sliced (choose chanterelles, cèpes, shiitake, portobello, cremini)",
              "3 large cloves garlic, very finely chopped",
              "3/4 cups chicken stock",
              "3 teaspoons chopped fresh thyme",
              "1/3 cup crème fraîche",
              "Sea salt and freshly ground black pepper to taste"
          ],
        }
      },
      {
        "recipe": {
          "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_da9f0859f63a0e5bfa742c85ee86331e",
          "label": "Garnet Sweet-Potato Mille-Feuille With White-Truffle Royale and Shaved Truffles From Alba",
          "image": "https://www.edamam.com/web-img/a23/a233a485e2fceb1f35adce0a8944b904.jpg",
          "source": "NY Magazine",
          "url": "http://nymag.com/restaurants/articles/recipes/sweetpotatomillefeuille.htm",
          "shareAs": "http://www.edamam.com/recipe/garnet-sweet-potato-mille-feuille-with-white-truffle-royale-and-shaved-truffles-from-alba-da9f0859f63a0e5bfa742c85ee86331e/white+truffle",
          "yield": 14,
          "dietLabels": [
              "Low-Carb"
          ],
          "healthLabels": [
              "Sugar-Conscious",
              "Vegetarian",
              "Peanut-Free",
              "Tree-Nut-Free",
              "Alcohol-Free"
          ],
          "cautions": [],
          "ingredientLines": [
              "5 large garnet sweet potatoes, peeled",
              "1 ½ teaspoon fine sea salt",
              "2 sticks butter, clarified",
              "1 cup milk",
              "1 cup heavy cream",
              "4 eggs",
              "3 to 4 tablespoons white-truffle oil, to taste",
              "1 ½ teaspoons kosher salt",
              "White truffle, shaved (optional)"
          ],
        }
      }
    ],
    pantry: [
      'chicken breasts',
      'chicken thighs',
      'asparagus',
      'potatoes',
      'ice cream',
      'chocolate sauce',
      'flour',
      'milk',
      'mushrooms',
      'cheddar',
      'eggs',
      'almonds'
    ],
    shoppingList: [
      'chicken breasts',
      'chicken thighs',
      'asparagus',
      'potatoes',
      'ice cream',
      'chocolate sauce',
      'flour',
      'milk',
      'mushrooms',
      'cheddar',
      'eggs',
      'almonds',
      'chicken breasts',
      'chicken thighs',
      'asparagus',
      'potatoes',
      'ice cream',
      'chocolate sauce',
      'flour',
      'milk',
      'mushrooms',
      'cheddar',
      'eggs',
      'almonds',
      'chicken breasts',
      'chicken thighs',
      'asparagus',
      'potatoes',
      'ice cream',
      'chocolate sauce',
      'flour',
      'milk',
      'mushrooms',
      'cheddar',
      'eggs',
      'almonds',
    ],
    recipeIngredientsChecked: [],
    reicpeSearchDisabled: false,
    shoppingListAdd: '',
    shoppingListDisabled: false,
    pantryAdd: '',
    pantryDisabled: false,
  }

  componentDidMount() {
    // this is to disallow redirecting to a another page without
    // passing through authentication
    if (this.props.user === null) {
      return this.props.history.replace('/login');
    }

    this.setState({
      shoppingList: this.props.user.shoppingList,
      pantry: this.props.user.pantry
    })

  }

  componentWillUnmount() {
    this.props.setUser(null);
  }

  handleRecipeIngredientToggle = value => {
    const { recipeIngredientsChecked } = this.state;
    const currentIndex = recipeIngredientsChecked.indexOf(value);
    const newChecked = [...recipeIngredientsChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      recipeIngredientsChecked: newChecked,
    });
  };

  clearRecipeIngredients() {
    this.setState({
      recipeIngredientsChecked: []
    });
  };

  shoppingListAddChangeHandler(item) {
    this.setState({
      shoppingListAdd: item
    });
  };

  pantryAddChangeHandler(item) {
    this.setState({
      pantryAdd: item
    });
  };

  // recipes actions handler

  recipeSearchHandler() {
    this.setState({
      reicpeSearchDisabled: true
    });
    // you should use state.recipeIngredientsChecked for the search
    // set state.recipes to the returned recipes and state.reicpeSearchDisabled to false
  };

  // shopping list action handlers

  // in all the actions set state.shoppingListDisable to true at the beginning and convert
  // it back to false when you're done

  deleteShoppingListItem(item) {

  };

  moveFromShoppingListToPantry(item) {
    
  };

  addToShoppingList() {
    // item to add is stored in state.shoppingListAdd
  };

  // pantry action handlers

  // in all the actions set state.shoppingListDisable to true at the beginning and convert
  // it back to false when you're done

  deletePantryItem(item) {

  };

  moveFromPantryToShoppingList(item) {
  
  };

  addToPantry() {
    // item to add is stored in state.shoppingListAdd
  };

  render () {
    return <Aux>
        <Navbar 
          navigate={path => this.props.history.push(path)}
          logout={() => {
            this.props.history.push('/login');
          }}
          openDrawer={() => this.setState(
              { drawerOpen: true }
            )} />
        <Drawer 
          isOpen={this.state.drawerOpen} 
          closeDrawer={() => this.setState(
              { drawerOpen: false }
            )}
          navigate={path => this.props.history.push(path)} />
        <div style={{ minHeight: "100%" }}>
          <Switch>
            <Route path="/recipes" exact render={() => 
              <Recipes 
                recipes={this.state.recipes}
                pantry={this.state.pantry}
                checked={this.state.recipeIngredientsChecked}
                handleToggle={value => this.handleRecipeIngredientToggle(value)}
                clear={() => this.clearRecipeIngredients()}
                search={() => this.recipeSearchHandler()}
                disabled={this.state.reicpeSearchDisabled}
                />} 
              />
            <Route path="/pantry" exact render={() => 
              <Pantry 
              list={this.state.pantry}
              delete={item => this.deletePantryItem(item)}
              move={item => this.moveFromPantryToShoppingList(item)}
              add={() => this.addToPantry()}
              searchString={this.state.pantryAdd}
              change={item => this.pantryAddChangeHandler(item)}
              disabled={this.state.pantryDisabled}/>}
              />
            <Route path="/shoppinglist" exact render={() => 
              <ShoppingList 
                list={this.state.shoppingList}
                delete={item => this.deleteShoppingListItem(item)}
                move={item => this.moveFromShoppingListToPantry(item)}
                add={() => this.addToShoppingList()}
                searchString={this.state.shoppingListAdd}
                change={item => this.shoppingListAddChangeHandler(item)}
                disabled={this.state.shoppingListDisabled}/>}
              />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
        <Footer />
      </Aux>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({
      type: 'SET_USER',
      user
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);