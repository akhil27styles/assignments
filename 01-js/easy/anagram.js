/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
function sort(s){
  return s.split('').sort().join('');
}
function isAnagram(str1, str2) {

return sort(str1.toLowerCase())===sort(str2.toLowerCase());
}

module.exports = isAnagram;
