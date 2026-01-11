document.addEventListener("scroll", function () {
  // Scroll to top icon visibility
  const iconUp = document.querySelector(".icon-up");
  if (window.scrollY > 40) {
    iconUp.style.display = "block";
  } else {
    iconUp.style.display = "none";
  }
});

document.querySelector(".icon-up").addEventListener("click", function (e) {
  // Scroll to top functionality
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

async function searchMovies(query) {
  // Fetch movies from TVmaze API based on search query
  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("NOT OK");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API error:", error);
  }
}

const createMovieElement = (result) => {
  const show = result.show;
  const imgSrc = show.image ? show.image.medium : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
  const imgAlt = show.name;

  const imgElement = document.createElement("img");
  const linkElement = document.createElement("a");

  imgElement.src = imgSrc;
  imgElement.alt = imgAlt;

  linkElement.href = show.url;
  linkElement.target = "_blank";

  linkElement.appendChild(imgElement);
  return linkElement;
};
