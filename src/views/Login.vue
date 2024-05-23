<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dobro došli</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f4f4f9;
    }

    .center {
      text-align: center;
    }

    .logo {
      width: 150px;
      margin-bottom: 20px;
    }

    header {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-control {
      width: 300px;
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .forgot-password {
      background-color: transparent;
      border: none;
      color: #007bff;
      cursor: pointer;
      text-decoration: underline;
      margin-bottom: 20px;
    }

    .gray-text {
      color: gray;
      margin-bottom: 10px;
    }

    .black-button {
      background-color: transparent;
      border: 2px solid black;
      color: black;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .black-button:hover {
      background-color: black;
      color: white;
    }

    .gmail-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      background-color: #4285f4;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      font-size: 14px;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
      margin: 5px;
    }

    .gmail-button svg {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }

    .gmail-button:hover {
      background-color: #3367d6;
    }
  </style>
</head>
<body>

<div class="center">
    <img src="Logo/Logo.png" alt="Logo" class="logo">
</div>

<header>
  <h1>Dobro došli</h1>
</header>

<form>
  <div class="center">
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input type="email" class="form-control" id="inputEmail" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="inputPassword">Šifra</label>
      <input type="password" class="form-control" id="inputPassword" placeholder="Šifra">
    </div>
    <button class="forgot-password">Zaboravljena šifra?</button>
  </div>
</form>

<div class="center gray-text">
  Nisi još registriran?
</div>

<div class="center">
  <button class="black-button">Registracija</button>
</div>

<div class="center">
  <button class="gmail-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
    </svg>
    Gmail prijava
  </button>
</div>

</body>
</html>
