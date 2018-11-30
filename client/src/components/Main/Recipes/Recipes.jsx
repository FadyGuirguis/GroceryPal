import React from 'react';
import { Row, Col} from 'reactstrap';
import Recipe from './Recipe/Recipe.jsx';
import RecipeIngredients from './RecipeIngredients/RecipeIngredients.jsx';
import Button from '@material-ui/core/Button';

const recipes = props => {
  
  const recipes = props.recipes.map(recipe => (
    <Recipe
      key={recipe.recipe.url}
      title={recipe.recipe.label}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredientLines}
      url={recipe.recipe.url}/>
  ));

  return (
    <Row style={{marginTop: '1%'}}>
      <Col lg={{
        size: 3,
        offset: 1
      }}
      md={{
        size: 4,
        offset: 1
      }}
      xs={{
        size: 11,
        offset: 1
      }}>
        <Row style={{marginBottom:'2%'}}>
          
            <Button 
              style={{
                marginLeft: '50px'
              }} 
              variant="contained" 
              color="primary"
              disabled={props.disabled}
              onClick={() => props.search()}>
              Search
            </Button>
        
            <Button
              style={{
                marginLeft: '50px'
              }} 
              variant="contained" 
              color="secondary"
              onClick={() => props.clear()}>
              Clear
            </Button>
         
        </Row>
        <div style={{
          maxHeight: '650px',
          overflowY: 'auto',
        }}>
          <RecipeIngredients 
            pantry={props.pantry}
            checked={props.checked}
            handleToggle={value => props.handleToggle(value)}/>
        </div>
      </Col>
      <Col lg={{
        size: 4,
        offset: 1
      }}
      md={{
        size: 6,
        offset: 0
      }}>
        <div style={{
          maxHeight: '900px',
          overflowY: 'auto',
        }}>
          {recipes}
        </div>
      </Col>
    </Row>
  )
}

export default recipes;
