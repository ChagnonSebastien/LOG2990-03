import { CrosswordGame } from './crossword-game';

const grid = [
    ['a', 'p', 'p', 'e', 'a', 'l', '#', 'r', 'a', 't'],
    ['#', ' ', ' ', '#', ' ', ' ', ' ', 'i', ' ', 'e'],
    ['s', '#', 'a', 'p', 'p', 'e', 'n', 'd', 'i', 'x'],
    ['t', ' ', ' ', 'r', ' ', ' ', '#', 'e', ' ', 't'],
    ['a', '#', 'w', 'a', 'r', '#', 'p', '#', ' ', 'b'],
    ['f', ' ', ' ', 'c', '#', 'r', 'a', 'd', 'i', 'o'],
    ['f', 'i', 's', 't', '#', ' ', 's', ' ', ' ', 'o'],
    ['#', ' ', ' ', 'i', ' ', ' ', '#', ' ', ' ', 'k'],
    ['f', 'l', 'i', 'c', 'k', '#', ' ', ' ', ' ', '#'],
    [' ', ' ', ' ', 'e', ' ', ' ', ' ', ' ', ' ', ' ']
];

const wordsWithIndex = [
    { 'i': 0, 'j': 0, 'word': 'appeal', 'horizontal': true },
    { 'i': 0, 'j': 9, 'word': 'textbook', 'horizontal': false },
    { 'i': 2, 'j': 2, 'word': 'appendix', 'horizontal': true },
    { 'i': 0, 'j': 7, 'word': 'ride', 'horizontal': false },
    { 'i': 0, 'j': 7, 'word': 'rat', 'horizontal': true },
    { 'i': 5, 'j': 5, 'word': 'radio', 'horizontal': true },
    { 'i': 4, 'j': 6, 'word': 'pas', 'horizontal': false },
    { 'i': 2, 'j': 3, 'word': 'practice', 'horizontal': false },
    { 'i': 4, 'j': 2, 'word': 'war', 'horizontal': true },
    { 'i': 6, 'j': 0, 'word': 'fist', 'horizontal': true },
    { 'i': 8, 'j': 0, 'word': 'flick', 'horizontal': true },
    { 'i': 2, 'j': 0, 'word': 'staff', 'horizontal': false }
];

const listOfWords = [
    'appeal',
    'textbook',
    'appendix',
    'ride',
    'rat',
    'radio',
    'pas',
    'practice',
    'war',
    'fist',
    'flick',
    'staff'
];

let crossword: CrosswordGame;

fdescribe('#CrosswordGame', () => {
    beforeEach(() => {
        crossword = new CrosswordGame(grid, wordsWithIndex, listOfWords);
    });

    fit('should construct', () => {
        expect(crossword).toBeTruthy();
    });

    fit('should identify empty squares', () => {
        expect(crossword.status[0][0].empty).toBeTruthy();
        expect(crossword.status[1][0].empty).toBeFalsy();
    });

    fit('should identify black squares as # or " "', () => {
        expect(crossword.status[0][0].black).toBeFalsy();
        expect(crossword.status[1][0].black).toBeTruthy();
        expect(crossword.status[1][1].black).toBeTruthy();
    });

    fit('should have no initial input on empty squares', () => {
        expect(crossword.status[0][0].empty).toBeTruthy();
        expect(crossword.status[0][0].input).toEqual('');
    });

    fit('should initialize wordsWithIndex', () => {
        expect(crossword.wordsWithIndex).toEqual(wordsWithIndex);
    });

    fit('should initialize wordMap with all words of the crossword', () => {
        expect(crossword.wordMap.size).toEqual(wordsWithIndex.length);
        for (const word of listOfWords) {
            expect(crossword.wordMap.has(word))
                .toBeTruthy();
        }
    });

    fit('nothing should be selected at initialization', () => {
        for (const row of crossword.status) {
            for (const square of row) {
                expect(square.selected).toBeFalsy();
                expect(square.player1Selected).toBeFalsy();
                expect(square.player2Selected).toBeFalsy();
            }
        }
    });

    fdescribe('insertLetter()', () => {
        fit('should insert a letter when the square is empty', () => {
            expect(crossword.status[0][0].empty).toBeTruthy();
            crossword.insertLetter('A'.charCodeAt(0), 0, 0);
            expect(crossword.status[0][0].input).toEqual('a');
        });

        fit('should not insert a letter when the square is black', () => {
            expect(crossword.status[1][0].black).toBeTruthy();
            crossword.insertLetter('A'.charCodeAt(0), 1, 0);
            expect(crossword.status[1][0].input).toEqual('');
        });

        fit('should insert the word APPEAL, and it should be marked as correct when the L is inserted', () => {
            crossword.insertLetter('A'.charCodeAt(0), 0, 0);
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].found).toBeFalsy();
            }
            crossword.insertLetter('P'.charCodeAt(0), 0, 1);
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].found).toBeFalsy();
            }
            crossword.insertLetter('P'.charCodeAt(0), 0, 2);
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].found).toBeFalsy();
            }
            crossword.insertLetter('E'.charCodeAt(0), 0, 3);
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].found).toBeFalsy();
            }
            crossword.insertLetter('A'.charCodeAt(0), 0, 4);
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].found).toBeFalsy();
            }
            crossword.insertLetter('L'.charCodeAt(0), 0, 5);
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].found).toBeTruthy();
            }
        });

        fit('should prevent inserting letter if the word is found', () => {
            // Insert APPEAL
            crossword.insertLetter('A'.charCodeAt(0), 0, 0);
            crossword.insertLetter('P'.charCodeAt(0), 0, 1);
            crossword.insertLetter('P'.charCodeAt(0), 0, 2);
            crossword.insertLetter('E'.charCodeAt(0), 0, 3);
            crossword.insertLetter('A'.charCodeAt(0), 0, 4);
            crossword.insertLetter('L'.charCodeAt(0), 0, 5);

            // can't change APPEAL
            for (let i = 0; i < 5; i++) {
                crossword.insertLetter('B'.charCodeAt(0), 0, i);
                expect(crossword.status[0][i].input).not.toEqual('b');
            }
        });

        fit('should allow overwriting letter if the word is not found', () => {
            // Insert AAAAA
            for (let i = 0; i < 5; i++) {
                crossword.insertLetter('A'.charCodeAt(0), 0, i);
                expect(crossword.status[0][i].input).toEqual('a');
            }
            // can change AAAAA to BBBBB
            for (let i = 0; i < 5; i++) {
                crossword.insertLetter('B'.charCodeAt(0), 0, i);
                expect(crossword.status[0][i].input).toEqual('b');
            }
        });
    });

    fdescribe('eraseLetter()', () => {
        fit('should not erase a letter if the word is found', () => {
            // Insert APPEAL
            crossword.insertLetter('A'.charCodeAt(0), 0, 0);
            crossword.insertLetter('P'.charCodeAt(0), 0, 1);
            crossword.insertLetter('P'.charCodeAt(0), 0, 2);
            crossword.insertLetter('E'.charCodeAt(0), 0, 3);
            crossword.insertLetter('A'.charCodeAt(0), 0, 4);
            crossword.insertLetter('L'.charCodeAt(0), 0, 5);

            // can't erase APPEAL
            for (let i = 0; i < 5; i++) {
                crossword.eraseLetter(0, i);
                expect(crossword.status[0][i].input).not.toEqual('');
            }
        });

        fit('should erase a letter if the word is not found', () => {
            // Insert AAAAA
            for (let i = 0; i < 5; i++) {
                crossword.insertLetter('A'.charCodeAt(0), 0, i);
                expect(crossword.status[0][i].input).toEqual('a');
            }

            // can erase AAAAA
            for (let i = 0; i < 5; i++) {
                crossword.eraseLetter(0, i);
                expect(crossword.status[0][i].input).toEqual('');
            }
        });
    });

    fdescribe('setSelectedWord()', () => {
        fit('should set APPEAL as selected', () => {
            // unselected
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].selected).toBeFalsy();
            }
            crossword.setSelectedWord('appeal');
            // selected
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].selected).toBeTruthy();
            }
        });
    });

    fdescribe('clearSelectedWord()', () => {
        fit('should clear the previously selected word', () => {
            crossword.setSelectedWord('appeal');
            // selected
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].selected).toBeTruthy();
            }
            crossword.clearSelectedWord('appeal');
            // unselected
            for (let i = 0; i < 5; i++) {
                expect(crossword.status[0][i].selected).toBeFalsy();
            }
        });
    });
});
