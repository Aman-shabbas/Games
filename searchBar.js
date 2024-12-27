const appleProducts = [
  "macBook cleaner",
  "MacBook Air",
  "MacBook Pro",
  "iMac",
  "Mac mini",
  "Mac Studio",
  "Mac Pro",
  "iPhone SE",
  "iPhone 14",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 13",
  "iPad",
  "iPad mini",
  "iPad Air",
  "iPad Pro",
  "Apple Watch",
  "Apple Watch SE",
  "Apple Watch Ultra",
  "AirPods",
  "AirPods Pro",
  "AirPods Max",
  "HomePod",
  "HomePod mini",
  "Apple TV 4K",
  "AirTag",
  "Apple Pencil",
  "Magic Keyboard",
  "MagSafe Charger",
  "Apple Vision Pro"
];  

const sortByLength = function (a, b) {
  return a.length - b.length;
}

const getSorter = function (subString) {
  return function (a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a.indexOf(subString) === b.indexOf(subString)) {
      return sortByLength(a, b);
    }
    return a.indexOf(subString) - b.indexOf(subString);
  }
}

const createSearch = function (array) {
  return function (subString) {
    const isSubstring = string => string.toLowerCase().includes(subString);
    const filterdArray = array.filter(isSubstring);
    return filterdArray.sort(getSorter(subString));
  }
}

const getPaddedString = function (resultArray) {
  const sizeDifference = 18 - resultArray.length; 
  const sizeOfPadding = sizeDifference <= 0 ? 1 : sizeDifference;
  const resultString = resultArray.join("\n");
  const paddedString = resultString + "\n".repeat(sizeOfPadding);
  return paddedString;
}

const searchBar = function () { 
  const search = createSearch(appleProducts);
  console.clear();
  console.log(getPaddedString(appleProducts));

  while (true) {
    const keyword = prompt("Enter the word to search: ");
    console.clear()
    const searchResult = search(keyword.toLowerCase());
    console.log(getPaddedString(searchResult));
  }
}

searchBar()