import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(password, email)
  }
  return (
    <section className="form">
      <form onSubmit={handleSubmit} className="form__container " name={props.name}>
        <h2 className="form__title">Log in</h2>
        <input required id="login-email"
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <input required id="login-password"
          className="form__input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button className="form__button" type="submit" value="submit">Log in</button>
        <Link to="/signup" className="form__link">Not a member yet? Sign up here!</Link>
      </form>
    </section>
  )
}
export default withRouter(Login)