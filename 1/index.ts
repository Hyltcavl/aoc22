import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { stringify } from 'querystring';

async function run() {
  const input = await asyncReadFile('./input.txt')
  const numbers: number[][] = convertInToNumbers(input);
  const numbersSum: number[] = sumNumbers();
  const sorted = numbersSum.sort((a,b)=>b-a)
  let topThreeSum = 0
  for (let i = 0; i < 3; i++) {
    topThreeSum = topThreeSum + sorted[i];
  }
  console.log(topThreeSum);
  
  

  function sumNumbers() {
    const numbersSum: number[] = [];
    numbers.forEach(element => {
      let n = 0;
      element.forEach(element2 => {
        n = n + element2;
      });
      numbersSum.push(n);

    });
    return numbersSum;
  }
}
function convertInToNumbers(input: string[]) {
  const numbers: number[][] = [];
  input.forEach(seriersOfNumbers => {
    const numberserie: number[] = [];
    seriersOfNumbers.split(/\r?\n/).forEach(stringNumber => {
      numberserie.push(Number(stringNumber));
    });
    numbers.push(numberserie);
  });
  return numbers;
}

// ✅ read file ASYNC
async function asyncReadFile(filename: string): Promise<string[]> {
  try {
    const result = await fsPromises.readFile(
      join(__dirname, filename),
      'utf-8',
    );
    return result.split(/\n\s*\r?\n/);
  } catch (err) {
    console.log(err);
    throw new Error("unable to get data from file")
  }
}

run()