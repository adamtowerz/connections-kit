import { z } from 'zod'
import { arraysContainSameStrings } from './utils'

export const ConnectionsPuzzleGroup = z.object({
    name: z.string(),
    color: z.string(),
    words: z.array(z.string()),
})
export type ConnectionsPuzzleGroup = z.infer<typeof ConnectionsPuzzleGroup>

export const ConnectionsPuzzle = z.object({
    title: z.string(),
    groups: z.array(ConnectionsPuzzleGroup),
    maxFailedGuesses: z.number(),
})
export type ConnectionsPuzzle = z.infer<typeof ConnectionsPuzzle>


export const ConnectionsPuzzleGuess = z.object({
    words: z.array(z.string())
})
export type ConnectionsPuzzleGuess = z.infer<typeof ConnectionsPuzzleGuess>

export const ConnectionsPuzzleState = z.object({
    puzzle: ConnectionsPuzzle,
    guesses: z.array(ConnectionsPuzzleGuess),
})
export type ConnectionsPuzzleState = z.infer<typeof ConnectionsPuzzleState>

export function groupsAlreadySolved(state: ConnectionsPuzzleState): ConnectionsPuzzleGroup[] {
    return state.puzzle.groups.filter(group => state.guesses.some(guess => doesGuessSolveGroup(group, guess)))
}

export function groupsNotAlreadySolved(state: ConnectionsPuzzleState): ConnectionsPuzzleGroup[] {
    return state.puzzle.groups.filter(group => !state.guesses.some(guess => doesGuessSolveGroup(group, guess)))
}

export function guessableWords(state: ConnectionsPuzzleState): string[] {
    return groupsNotAlreadySolved(state).flatMap(g => g.words)
}

export function getFailedGuessesRemaining(state: ConnectionsPuzzleState): number {
    const failedGuesses = state.guesses.filter(guess => !doesGuessSolveSomeGroup(state.puzzle, guess));
    return state.puzzle.maxFailedGuesses - failedGuesses.length;
}

export function doesGuessSolveGroup(group: ConnectionsPuzzleGroup, guess: ConnectionsPuzzleGuess): boolean {
    return arraysContainSameStrings(group.words, guess.words)
}

export function doesGuessSolveSomeGroup(puzzle: ConnectionsPuzzle, guess: ConnectionsPuzzleGuess): boolean {
    return puzzle.groups.some(group => doesGuessSolveGroup(group, guess))
}

export function getGroupSolvedByGuess(puzzle: ConnectionsPuzzle, guess: ConnectionsPuzzleGuess): ConnectionsPuzzleGroup | undefined {
    return puzzle.groups.find(group => doesGuessSolveGroup(group, guess))
}


export function getCanGuess(state: ConnectionsPuzzleState, draftGuess: string[]) {
    if (getIsGameFinished(state)) {
        // Game is over
        return false;
    }

    if (!state.puzzle.groups.some(g => g.words.length === draftGuess.length)) {
        // No group is the same size
        return false
    }

    if (state.guesses.some(g => arraysContainSameStrings(g.words, draftGuess))) {
        // Already guessed this
        return false
    }

    return true;
}

export function getIsGameWon(state: ConnectionsPuzzleState) {
    return groupsAlreadySolved(state).length === state.puzzle.groups.length;
}

export function getIsGameLost(state: ConnectionsPuzzleState) {
    return !getIsGameWon(state) && getFailedGuessesRemaining(state) === 0
}

export function getIsGameFinished(state: ConnectionsPuzzleState) {
    return getIsGameWon(state) || getIsGameLost(state)
}