const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

array = [1, 2, 3, 4, 5];

const answer = sample(array);

console.log(Math.random());
console.log(Math.random() * array.length);
console.log(Math.floor(Math.random() * array.length));
console.log(answer);
console.log(array[0]);
