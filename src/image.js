async function getImage(searchTerm) {
  try {
    let imageResponse = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=7JrTrS2adJxOMxnUDlj8i8xvZdT8ndXs&s=${searchTerm}`
    );
    let imageData = await imageResponse.json();
    return imageData;
  } catch (Error) {
    console.log(Error);
  }
}

export { getImage };
