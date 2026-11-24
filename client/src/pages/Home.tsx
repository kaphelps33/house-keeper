function Home() {
  return (
    <main className="h-full w-full flex items-center flex-col">
      <h2 className="text-3xl font-black">Welcome to House Keeper</h2>
      <p>Made to prevent grocery mishaps.</p>
      <h3>You are currently on the home page</h3>
      <p>
        One must <a href="/login">Login</a> to proceed any further.
      </p>
    </main>
  );
}
export default Home;
