async function main() {
  await start();
}

let commentsMap = {};

// start initializes our extension by creating
// the appropriate links to the DOM and getting viewed links
// from local storage
async function start() {
  window.links = document.getElementsByClassName("storylink");
  window.comments = document.getElementsByClassName("subtext");
  setListeners();
}

// hashCode creates a unique hash for string s
function hashCode(s) {
  let hash = 0;
  let i, chr;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}


// onGot retrieves an item from local storage
function onGot(item) {
 if ("commentsMap" in item) {
  commentsMap = item["commentsMap"];
 } else {
  commentsMap = {} // if no object was found assign to empty object
 }
 updateDisplay();
}

// onError logs an error if retrieving storage fail
function onError(error) {
  console.log(`HNReduce: Error Loading Storage\n Error: ${error}`);
}

// setItem is a placeholder function in set().then
function setItem() {
  return
}


// updateDisplay updates each comment to the approrpiate display style
// runs once per load
function updateDisplay() {
  for (const comment of comments) {
    if (!commentsMap[hashCode(links[y].href)]) {
      comment.style.display = "none";
    } else {
      comment.style.display = "block";
    }
  }
}


// updateItem will update the item clicked to block display
function updateItem(i) {
  comments[i].style.display = "block";
}

// setListeners adds various onclick function to the links so we can 
// log which links have been opened
function setListeners() {
  let i = 0;
  for (const link of links) {
    link.id = i; // should add other words to make it not collide
    link.onauxclick = () => {logClick(link.href, link.id)}
    link.oncontextmenu = () => {logClick(link.href, link.id)} 
    link.addEventListener("keydown", ({key}) => {
      if (key == "Enter") {logClick(link.href, link.id)};
    });
    link.addEventListener("click", (e) => {
     if (e.ShiftKey) {logClick(link.href, link.id)}
     else if (e.ctrlKey) {logClick(link.href, link.id)}
     else {logClick(link.href, link.id)}
    });
    i++
  }
}






// logClick logs a linked click and calls updateItem
// to change the display for that link
function logClick(s, i) {
  logLink(hashCode(s));
  updateItem(i);
}

// logLink logs the hash of a link in the commentsMap
function logLink(s) {
	try {
	} catch(err) {
		console.log(err);
	}
    commentsMap[s] = 1;
    browser.storage.local.set({"commentsMap":commentsMap}).then(setItem, onError);
};
main();
//start();
// Already being run on got
// updateDisplay();
