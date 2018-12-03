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
    recipes: [],
    pantry: [],
    shoppingList: [],
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
    api.post('/recipes', {
      ingredients: this.state.recipeIngredientsChecked
    })
    .then((response) => {
      
      this.setState({recipes: response.data,
        reicpeSearchDisabled: false
      })
    })
    .catch((error) => {
      this.setState({recipeSearchDisabled: false})
    })
  };

  // shopping list action handlers

  // in all the actions set state.shoppingListDisable to true at the beginning and convert
  // it back to false when you're done

  deleteShoppingListItem(item) {
    this.setState({shoppingListDisabled: true});
    
    let newShoppingList = [...this.state.shoppingList];
    newShoppingList.splice(newShoppingList.indexOf(item), 1);
    
    api.post('/lists', {
      shoppingList: newShoppingList
    })
    .then((response) => {
      this.setState({shoppingList: response.data.shoppingList,
        shoppingListDisabled: false
      })
    })
    .catch((error) => {
      this.setState({shoppingListDisabled: false})
    })
  };

  moveFromShoppingListToPantry(item) {
    this.setState({shoppingListDisabled: true});

    let newShoppingList = [...this.state.shoppingList];
    newShoppingList.splice(newShoppingList.indexOf(item), 1);

    let newPantry = [...this.state.pantry];
    newPantry.push(item);

    api.post('/lists', {
      shoppingList: newShoppingList,
      pantry: newPantry
    })
    .then((response) => {
      this.setState({shoppingList: response.data.shoppingList, 
        pantry: response.data.pantry, 
        shoppingListDisabled: false
      })
    })
    .catch((error) => {
      this.setState({shoppingListDisabled: false})
    })
  };

  addToShoppingList() {
    // item to add is stored in state.shoppingListAdd
    this.setState({shoppingListDisabled: true});

    let newShoppingList = [...this.state.shoppingList];
    newShoppingList.push(this.state.shoppingListAdd);

    api.post('/lists', {
      shoppingList: newShoppingList
    })
    .then((response) => {
      this.setState({shoppingList: response.data.shoppingList,
        shoppingListDisabled: false
      })
    })
    .catch((error) => {
      this.setState({shoppingListDisabled: false})
    })
  };

  // pantry action handlers

  // in all the actions set state.shoppingListDisable to true at the beginning and convert
  // it back to false when you're done

  deletePantryItem(item) {
    this.setState({shoppingListDisabled: true});

    let newPantry = [...this.state.pantry];
    newPantry.splice(newPantry.indexOf(item), 1);

    api.post('/lists', {
      pantry: newPantry
    })
    .then((response) => {
      this.setState({pantry: response.data.pantry,
        shoppingListDisabled: false
      })
    })
    .catch((error) => {
      this.setState({shoppingListDisabled: false})
    })
  };

  moveFromPantryToShoppingList(item) {
    this.setState({shoppingListDisabled: true});

    let newPantry = [...this.state.pantry];
    newPantry.splice(newPantry.indexOf(item), 1);

    let newShoppingList = [...this.state.shoppingList];
    newShoppingList.push(item);

    api.post('/lists', {
      pantry: newPantry,
      shoppingList: newShoppingList
    })
    .then((response) => {
      this.setState({pantry: response.data.pantry,
        shoppingList: response.data.shoppingList,  
        shoppingListDisabled: false
      })
    })
    .catch((error) => {
      this.setState({shoppingListDisabled: false})
    })
  };

  addToPantry() {
    // item to add is stored in state.pantryAdd
    this.setState({shoppingListDisabled: true});

    let newPantry = [...this.state.pantry];
    newPantry.push(this.state.pantryAdd);
    
    api.post('/lists', {
      pantry: newPantry
    })
    .then((response) => {
      this.setState({pantry: response.data.pantry,
        shoppingListDisabled: false
      })
    })
    .catch((error) => {
      this.setState({shoppingListDisabled: false})
    })
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