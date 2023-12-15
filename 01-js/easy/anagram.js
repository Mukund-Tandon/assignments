/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const map1 = new Map();
  str1 = str1.toLowerCase().split(' ').join('');
  str2 = str2.toLowerCase().split(' ').join('');
  for (let i = 0; i < str1.length; i++) {
    if (map1.has(str1[i])) {
      map1.set(str1[i], map1.get(str1[i]) + 1);
    } else {
      map1.set(str1[i], 1);
    }
  }

  for (let i = 0; i < str2.length; i++) {
    if (map1.has(str2[i])) {
      map1.set(str2[i], map1.get(str2[i]) - 1);
      if (map1.get(str2[i]) === 0) {
        map1.delete(str2[i]);
      }
    } else {
      // If the character is not in map1, it's not an anagram
      return false;
    }
  }

  // Check if all characters from str1 and str2 are used
  return map1.size === 0;
}



module.exports = isAnagram;
