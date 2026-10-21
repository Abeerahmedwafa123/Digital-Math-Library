
import type { Topic } from './types';

export interface Question {
    id: number;
    text: string;
    answer: string;
}

export const LEVEL_1_QUESTIONS: Question[] = [
  { id: 1, text: 'Write the number that comes just before 80.', answer: '79' },
  { id: 2, text: 'What is the smallest two-digit number you can form using digits 2 and 5?', answer: '25' },
  { id: 3, text: 'Fill in the blank: 6 + ___ = 10', answer: '4' },
  { id: 4, text: 'You have 3 apples. How many more do you need to make 10 apples?', answer: '7' },
  { id: 5, text: 'Fill in the blank: ___ + 5 = 9', answer: '4' },
  { id: 6, text: 'A farmer has 7 cows and wants 9. How many more cows does he need?', answer: '2' },
  { id: 7, text: 'Double of 8 = ___', answer: '16' },
  { id: 8, text: 'What number plus itself equals 18?', answer: '9' },
  { id: 9, text: 'In 63, the value of 6 is ___ and the value of 3 is ___', answer: '60, 3' },
  { id: 10, text: 'From this list (46, 64, 34, 14), which number has 4 in the tens place?', answer: '46' },
  { id: 11, text: 'Arrange these numbers in ascending order: 42, 16, 23, 11', answer: '11, 16, 23, 42' },
  { id: 12, text: 'Which number will come second if the list 9, 4, 7, 2, 8 is arranged in ascending order?', answer: '4' },
  { id: 13, text: 'Arrange these numbers in descending order: 12, 48, 25, 30', answer: '48, 30, 25, 12' },
  { id: 14, text: 'Which number will come last if the list 81, 64, 72, 55 is arranged in descending order?', answer: '55' },
  { id: 15, text: 'Which sign makes the sentence true? 46 ___ 64 (use <, >, or =)', answer: '<' },
  { id: 16, text: 'Choose the greater number: 79 or 97', answer: '97' },
  { id: 17, text: '25 + 36 = ___', answer: '61' },
  { id: 18, text: '47 + 28 = ___', answer: '75' },
  { id: 19, text: '63 + 19 = ___', answer: '82' },
  { id: 20, text: 'A baker baked 34 cupcakes in the morning and 29 in the afternoon. How many cupcakes did he bake in total?', answer: '63' },
];

export const LEVEL_2_QUESTIONS: Question[] = [
  { id: 21, text: 'Double of 7 = ___', answer: '14' },
  { id: 22, text: 'Fill in the blank to make 10: 6 + ___ = 10', answer: '4' },
  { id: 23, text: '43 + 8 = ___', answer: '51' },
  { id: 24, text: 'If you add 6 to 57, what is the new number?', answer: '63' },
  { id: 25, text: '46 + 37 = ___', answer: '83' },
  { id: 26, text: '58 + 24 = ___', answer: '82' },
  { id: 27, text: '324 + 245 = ___', answer: '569' },
  { id: 28, text: 'A shop sold 216 toys on Monday and 153 on Tuesday. How many toys did they sell in total?', answer: '369' },
  { id: 29, text: '444 + 444 = ___', answer: '888' },
  { id: 30, text: '424 + 404 = ___', answer: '828' },
  { id: 31, text: '58 + 67 = ___', answer: '125' },
  { id: 32, text: '39 + 75 = ___', answer: '114' },
  { id: 33, text: '38 + 9 = ___', answer: '47' },
  { id: 34, text: '234 + 99 = ___', answer: '333' },
  { id: 35, text: '84 – 42 = ___', answer: '42' },
  { id: 36, text: 'A farmer had 90 apples. He sold 45. How many are left?', answer: '45' },
  { id: 37, text: '63 – 28 = ___', answer: '35' },
  { id: 38, text: '92 – 46 = ___', answer: '46' },
  { id: 39, text: '432 – 214 = ___', answer: '218' },
  { id: 40, text: '601 – 358 = ___', answer: '243' },
];

export const LEVEL_3_QUESTIONS: Question[] = [
  { id: 41, text: '3 × 0 = ___', answer: '0' },
  { id: 42, text: 'What is 2 × 3 = ___', answer: '6' },
  { id: 43, text: '4 × 6 = ___', answer: '24' },
  { id: 44, text: '5 × 4 = ___', answer: '20' },
  { id: 45, text: '9 × 7 = ___', answer: '63' },
  { id: 46, text: '8 × 10 = ___', answer: '80' },
  { id: 47, text: '24 × 3 = ___', answer: '72' },
  { id: 48, text: '56 × 4 = ___', answer: '224' },
  { id: 49, text: '234 × 3 = ___', answer: '702' },
  { id: 50, text: '415 × 2 = ___', answer: '830' },
  { id: 51, text: '2314 × 5 = ___', answer: '11570' },
  { id: 52, text: '1423 × 3 = ___', answer: '4269' },
  { id: 53, text: '214 × 12 = ___', answer: '2568' },
  { id: 54, text: '325 × 14 = ___', answer: '4550' },
  { id: 55, text: '23 × 124 = ___', answer: '2852' },
  { id: 56, text: '45 × 103 = ___', answer: '4635' },
  { id: 57, text: '56 × 9 = ___', answer: '504' },
  { id: 58, text: '67 × 99 = ___', answer: '6633' },
  { id: 59, text: '234 × 11 = ___', answer: '2574' },
  { id: 60, text: '312 × 5 = ___', answer: '1560' },
];

export const LEVEL_4_QUESTIONS: Question[] = [
  { id: 61, text: '8 ÷ 2 = ___', answer: '4' },
  { id: 62, text: '15 ÷ 3 = ___', answer: '5' },
  { id: 63, text: '20 ÷ 4 = ___', answer: '5' },
  { id: 64, text: '24 ÷ 6 = ___', answer: '4' },
  { id: 65, text: '18 ÷ 2 = ___', answer: '9' },
  { id: 66, text: '30 ÷ 5 = ___', answer: '6' },
  { id: 67, text: '36 ÷ 6 = ___', answer: '6' },
  { id: 68, text: '45 ÷ 9 = ___', answer: '5' },
  { id: 69, text: '42 ÷ 7 = ___', answer: '6' },
  { id: 70, text: '56 ÷ 8 = ___', answer: '7' },
  { id: 71, text: '63 ÷ 7 = ___', answer: '9' },
  { id: 72, text: '72 ÷ 8 = ___', answer: '9' },
  { id: 73, text: '81 ÷ 9 = ___', answer: '9' },
  { id: 74, text: '100 ÷ 10 = ___', answer: '10' },
  { id: 75, text: '25 ÷ 5 = ___', answer: '5' },
  { id: 76, text: '49 ÷ 7 = ___', answer: '7' },
  { id: 77, text: '12 ÷ 2 = ___', answer: '6' },
  { id: 78, text: '21 ÷ 3 = ___', answer: '7' },
  { id: 79, text: '27 ÷ 3 = ___', answer: '9' },
  { id: 80, text: '32 ÷ 4 = ___', answer: '8' },
];
