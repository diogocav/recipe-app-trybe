import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';

function ReceitasFeitas() {
/*   function favoritesRecipe() {
    const storage = getStorage('ReceitasFeitas');
    return storage || [];
  } */

  const [ReceitasFeitass, setReceitasFeitas] = useState('');
  const { setTitle, setShowIcon } = useContext(Context);

  function mealInfo(index, category, area) {
    return (
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${area} - ${category}`}
      </p>
    );
  }

  function drinkInfo(index, alcoholicOrNot) {
    return (
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${alcoholicOrNot}`}
      </p>
    );
  }

  useEffect(() => {
    // mock localstorage
    /*     setStorage([
      {
        id: '53013',
        type: 'comida',
        area: 'American',
        category: 'Beef',
        alcoholicOrNot: '',
        name: 'Big Mac',
        image:
          'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
      }]); */
    // mock localstorage
    setReceitasFeitas([
      {
        id: '53013',
        type: 'meals',
        area: 'American',
        category: 'Beef',
        alcoholicOrNot: '',
        name: 'Big Mac',
        image:
          'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
      }]);
  }, []);

  useEffect(() => {
    setTitle('Done Recipes');
    setShowIcon(false);
  }, [setTitle, setShowIcon]);

  function deletes(id) {
    const filtered = ReceitasFeitass.filter((item) => item.id !== id);
    // setStorage('ReceitasFeitas', filtered);
    setReceitasFeitas(filtered);
  }

  return (
    <div>
      <Header />
      <h1>Receitas Feitas</h1>
      {ReceitasFeitass.length === 0 ? (
        <h3>Sem Receitas Favoritas!</h3>
      ) : (
        ReceitasFeitass.map(
          (
            { category, id, type, image, area, alcoholicOrNot, name },
            index,
          ) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <Link to={ `/${type}/${id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div>
                {type === 'meals'
                  ? mealInfo(index, category, area)
                  : drinkInfo(index, alcoholicOrNot)}
                <Link to={ `/${type}/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                </Link>

                <button
                  name="apagar"
                  type="button"
                  onClick={ () => deletes(id) }
                >
                  Apagar

                </button>

              </div>
            </div>
          ),
        )
      )}
    </div>
  );
}

export default ReceitasFeitas;
