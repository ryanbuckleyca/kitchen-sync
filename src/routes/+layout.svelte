<script>
	import { onMount } from 'svelte';
  import { toggleMenu, switchStyle } from '../helpers'
	import Header from './Header.svelte';
	import './styles.css';

  onMount(() => {
    let OrigScrollPos = window.scrollY

    //close menu when scrolling, if it's open
    window.onscroll = function() {
      // @TODO: use ref
      var dropdown = document.getElementById("dropdown")

      if(dropdown) {
      let vis = dropdown.style.display
      if(OrigScrollPos < window.scrollY && vis === "block")
        toggleMenu()
      }
    }

    // set user default style
    window.addEventListener('onload', () => switchStyle())

    //close menu when clicking outside or on links
    window.addEventListener('mousedown', function(e){
      var dropdown = document.getElementById('dropdown')
      var menuButton = document.getElementById('menuButton')
      var target = /** @type {Node|null} */ (e.target);

      if (dropdown && menuButton && target) {
        let didClickDropdown = dropdown.contains(target)
        let didClickMenuButton = menuButton.contains(target)
        let isMenuDivVisible = dropdown.style.display === "block"
        let didClickOutsideOpenMenu = !didClickDropdown && isMenuDivVisible && !didClickMenuButton

        //if user clicks outside of dropdown and it's open, close it
        if (didClickOutsideOpenMenu){
          toggleMenu();
        }
      } else {
        console.error('missing dropdown or menuButton')
      }
    })

    // handle submitting addItem modal with return
    window.addEventListener('keydown', function(e) {
      const modal = document.getElementById('itemEntryModal')

      if(modal) {
        const modalDisplay = window.getComputedStyle(modal)['display'];
        if (modalDisplay === 'none') return;


        let foodItemToAddField = /** @type {HTMLInputElement|null} */ (document.getElementById("foodItemToAdd"))
        let catField = /** @type {HTMLInputElement|null} */ (document.getElementById("categoryToAddTo"))
        const itemValue = foodItemToAddField?.value
        const catValue = catField?.value

        if (itemValue && itemValue.length < 1 || catValue && catValue.length < 1) return

        // @TODO: enable access to store in helpers
        if (e.key === 'Enter') console.error('enable store in helpers') // store.do('addFoodItem')
      } else {
        console.error('cannot find modal');
      }
    })


  })
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
