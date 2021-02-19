<script lang="ts">
  let password = "yeet";
  let email = "tommy@tester.at";
  async function login() {
    console.log("=============01=============");
    const response = await fetch("http://localhost:8055/auth/login", {
      method: "POST",
      credentials: "omit",
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
        mode: "cookie",
      }),
    });
    console.log(response);
  }
</script>

<form on:submit|preventDefault={() => login()}>
  <input type="text" placeholder="Username" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  <button>Login</button>
</form>
