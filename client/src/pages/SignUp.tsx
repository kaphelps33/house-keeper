import "./Login.css";

function SignUp() {
  return (
    <main className="login-container">
      <section className="login-wrapper">
        <h2>Sign Up</h2>
        <form action="" className="login-form">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name="password" />
          <button type="submit">Sign Up</button>
        </form>
        <a href="/login">Already have an account? Log in here!</a>
      </section>
    </main>
  );
}
export default SignUp;
