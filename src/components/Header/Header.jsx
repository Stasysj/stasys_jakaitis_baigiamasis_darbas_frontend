import { NavLink, useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header() {
  const history = useHistory();
  const { isUserLoggedIn, logout } = useAuthCtx();

  function onClickHandler() {
    history.replace('/');
  }

  return (
    <header className={css.header}>
      <div className={css.img}>
        <img className={css.logo} onClick={onClickHandler} src='logo1.png' alt='Logo' />
      </div>

      <nav>
        {isUserLoggedIn && (
          <>
            <NavLink className='navLink' exact to='/'>
              Home
            </NavLink>
            <NavLink className='navLink' to='/add'>
              Add
            </NavLink>
            <NavLink onClick={logout} className='navLink' to='/login'>
              Logout
            </NavLink>
          </>
        )}

        {!isUserLoggedIn && (
          <>
            <NavLink className='navLink' to='/login'>
              Login
            </NavLink>
            <NavLink className='navLink' to='/register'>
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
