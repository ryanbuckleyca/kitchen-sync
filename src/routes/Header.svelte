<script>
  import { page } from '$app/stores';
  import { toggleMenu, switchStyle } from '../helpers.js';
</script>
<head>
  <meta charset="utf-8" />
  <title>311 Grocery List</title>
  <!-- App styles -->
  <link type="text/css" rel="stylesheet" href="style.css" />
  <link type="text/css" rel="stylesheet" href="light.css" title="swap" />
  <link type="text/css" rel="stylesheet" href="fireworks.css" />
  <link href="https://fonts.googleapis.com/css2?family=Itim&family=Leckerli+One&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  <script src="https://kit.fontawesome.com/a367e5e4f1.js" crossorigin="anonymous"></script>
</head>

<header id="groceryMenu" class="container row">
  <button id="menuButton" class="button top left" on:click={toggleMenu}>
    <i class="fas fa-hamburger"></i>
  </button>
  <nav id="headerMenu" class="item center">
    <h1><span>Grocery List</span></h1>
    <div id="dropdown" style="display: none">
      <a href="/stock" on:click={toggleMenu} aria-current={$page.url.pathname === '/stock' ? 'page' : undefined}><span>Stock</span></a>
      <a href="/shop" on:click={toggleMenu} aria-current={$page.url.pathname === '/shop' ? 'page' : undefined}><span>Shop</span></a>
      <a href="/households" on:click={toggleMenu} aria-current={$page.url.pathname === '/households' ? 'page' : undefined}><span>Households</span></a>
      <a href="/about" on:click={toggleMenu} aria-current={$page.url.pathname === '/about' ? 'page' : undefined}><span>About</span></a>
      <a href="#style" on:click={switchStyle}><span><i class="fas fa-adjust"></i></span></a>
    </div>
  </nav>
  <button id="scrollButton" class="button top right" on:click={() => window.scroll(0,0)}>
    <i class="fas fa-arrow-up"></i>
  </button>
</header>
