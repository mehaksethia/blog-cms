async function signup() {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    alert("Account created!");
    location.href = "login.html";
  } else {
    alert(data.message || "Signup failed");
  }
}

async function login() {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}