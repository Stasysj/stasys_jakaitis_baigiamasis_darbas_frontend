import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header() {
  const history = useHistory();
  const { isUserLoggedIn, logout, user_id } = useAuthCtx();
  // const { user_id, user_name } = useAuthCtx();

  function onClickHandler() {
    history.replace('/');
  }

  return (
    <header className={css.header}>
      <div className={css.img}>
        <img className={css.logo} onClick={onClickHandler} src='Q&A.jpg' alt='Logo' />
      </div>

      <nav>
        {isUserLoggedIn && (
          <>
            <NavLink className='navLink' exact to='/'>
              Home
            </NavLink>
            {/* <NavLink className='navLink' to={`/private/${user_id}`}>
              Privte zone
            </NavLink> */}
            <NavLink className='navLink' to={`/private/questions/${user_id}`}>
              My questions
            </NavLink>
            <NavLink className='navLink' to={`/private/answers/${user_id}`}>
              My answers
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
