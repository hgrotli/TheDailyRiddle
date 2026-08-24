export function isCorrectGuess(guess: string, answer: string): boolean {
  return guess.trim().toLowerCase() === answer.trim().toLowerCase();
}
