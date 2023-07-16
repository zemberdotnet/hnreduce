const comments = document.querySelectorAll(".subtext");
const links = [];
document
  .querySelectorAll(".titleline")
  .forEach((e) => links.push(e.querySelector("a")));

const linkCommentPairs = links.map((link, i) => {
  link.id = createId(i);
  const fn = () => {
    updateItem({ link, comment: comments[i] });
  };

  link.onauxclick = () => {
    fn();
  };
  link.oncontextmenu = () => {
    fn();
  };
  link.addEventListener("keydown", ({ key }) => {
    if (key == "Enter") {
      fn();
    }
  });
  link.addEventListener("click", (e) => {
    if (e.ShiftKey) {
      fn();
    } else if (e.ctrlKey) {
      fn();
    } else {
      fn();
    }
  });
  return { link, comment: comments[i] };
});

// createId
function createId(i) {
  return `hnreduce-${i}`;
}

function updateItem({ link, comment }) {
  comment.style.display = "block";
}
