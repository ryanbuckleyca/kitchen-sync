
import { readCookie, createCookie } from './cookies'

export function switchStyle() {
  /**
   * @param {HTMLLinkElement} linkElToSwap
   * @param {string} value
   */
  function setLinkTag(linkElToSwap, value) {
    linkElToSwap.setAttribute("href", value)
    createCookie("style", value)
  }

  const linkTags = document.getElementsByTagName("link")
  /** @type {HTMLLinkElement|undefined} */
  let linkElToSwap

  for(let link of linkTags) {
    if(link.title === "swap") {
      linkElToSwap = link
    }
  }

  if(!linkElToSwap) {
    console.error('cannot find a <link> tag with title "swap"')
  } else {
    //set user's preferred style, if exists
    const styles = ["light.css", "dark.css", "rave.css"]
    const userStyle = readCookie("style") || 'light.css'
    const userHasPreferredStyle = styles.includes(userStyle)
    if(userHasPreferredStyle) setLinkTag(linkElToSwap, userStyle)

    let switchTo
    if(linkElToSwap.href.includes("light.css")) {
      switchTo = "dark.css"
    } else if(linkElToSwap.href.includes("rave.css")) {
      switchTo = "light.css"
    } else {
      switchTo = "rave.css"
    }
    setLinkTag(linkElToSwap, switchTo)
  }
}

export const toggleMenu = () => {
  // @TODO: use refs
  var dropdown = document.getElementById("dropdown")
  var groceryMenu = document.getElementById("groceryMenu")
  var app = document.getElementById("app")
  var menuButton = document.getElementById("menuButton")

  if(dropdown && groceryMenu && app && menuButton) {
    if (dropdown?.style.display === "block") {
      //menu is open, close it
      app.style.opacity = "100%"
      dropdown.style.display = "none"
      groceryMenu.style.zIndex = '1'
      menuButton.innerHTML = "<i class=\"fas fa-hamburger\"></i>"
    } else {
      //menu is closed, open it
      app.style.opacity = "40%"
      dropdown.style.display = "block"
      groceryMenu.style.zIndex = '4'
      menuButton.innerHTML = "<i class=\"fas fa-times\"></i>"
    }
  }
}

export function toggleModal() {
  document?.querySelector(".modal")?.classList.toggle("show-modal");
}

/**
 * @param {{ id: string; }} category
 * @param {string} elementID
 */
export const collapseCat = (category, elementID) => {
  var elToColl = document.getElementById(elementID + category.id)
  var categoryElement = document.getElementById(category.id)
  var fa = categoryElement?.querySelector('.fa')
  var position = categoryElement?.offsetTop

  if (fa && elToColl && position) {
    fa.className === "fa fa-caret-right" ?
      fa.setAttribute("class", "fa fa-caret-down") :
      fa.setAttribute("class", "fa fa-caret-right")

    elToColl.style.display === "block" ?
      elToColl.style.display = "none" :
      elToColl.style.display = "block"

    window.scrollTo(0, position)
  } else {
    console.error('cannot collapse cat because elements are missing')
  }
}

/**
 *
 * @param {string} itemID
 */
export const handleOnBlurEdit = (itemID) => {
  let element = document.getElementById("statusButton-" + itemID)
  // @TODO: enable store in helpers
  if (element) {
  element.onclick = () => console.log('enable store in helpers') //store.do("toggleStatus", itemID)
  element.contentEditable = "false"
  element.classList.remove("edit")

  let newName = element.innerText
  console.error('enable store in helpers for ', newName)

  // store.do("updateFoodItem", itemID, newName)
  } else {
    console.error('cannot find element statusButton')
  }
}

/**
 *
 * @param {any} event
 * @param {string} id
 */
export const handleOnEnterEdit = (event, id) => {
  if (event.which == 13 || event.keyCode == 13) {
    event.preventDefault()
    handleOnBlurEdit(id)
  }
}

/**
 *
 * @param {string} str
 */
export const titleCase = (str) => {
  return str.trim().toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase())
  }).join(' ')
}

/**
 *
 * @param {{ preventDefault: () => void; }} event
 * @param {string} itemId
 */
export const editItem = (event, itemId) => {
  let element = document.getElementById("statusButton-" + itemId)

  if (element) {

    if (element.contentEditable === "true") {
      element.contentEditable = "false"
      element.classList.remove("modify")
    } else {
      element.onclick = null
      element.contentEditable = "true"
      element.classList.add("modify")
      //should set cursor to end of text
      var selection = window.getSelection()
      var range = document.createRange()
      selection?.removeAllRanges()
      range.selectNodeContents(element)
      range.collapse(false)
      selection?.addRange(range)
      element.focus()

      event.preventDefault()
    }
  } else {
    console.error('cannot find statusButton element')
  }
}

/**
 * @param {string} id
 * @param {any} category
 * @param {string} status
 */
export function removeShopItem( id, category, status ) {
  var item = document.getElementById('groceryRow-' + id)
  var catSpan = document.getElementById('shopListCategory-' + category.id)
  var shopItem = document.getElementById('shopItem-' + id)
  if(shopItem && status === "bought") {
    shopItem.classList.add("good")
    shopItem.style.transform = "rotate(0.5deg) scale(1.07)"
  }
  if(item) {
    item.style.transition = "opacity 1.5s ease"
    item.style.opacity = '0'
    setTimeout( function() {
        item?.parentNode?.removeChild(item)
        if(status === "bought") {
          console.error('add store to helpers');
          // store.do("buyFoodItem", id)
        }
        if(catSpan?.children.length === 0)
          document?.getElementById('app')?.removeChild(category)
    }, 500)
  }
}
