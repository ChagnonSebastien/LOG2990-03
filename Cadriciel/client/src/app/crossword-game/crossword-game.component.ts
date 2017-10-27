import { Component, OnInit, ViewChildren, Input, Output, EventEmitter } from '@angular/core';
import { CrosswordService } from './crossword.service';
import { KeyboardService } from './keyboard.service';
import { LexiconService } from './lexicon.service';

import { CrosswordGame } from './crossword-game';
import { Hint } from './hint';

@Component({
    selector: 'app-crossword-game',
    templateUrl: './crossword-game.component.html',
    styleUrls: ['./crossword-game.component.css']
})
export class CrosswordGameComponent implements OnInit {
    @Input() public type: string;
    @Input() public mode: string;
    @Input() public level: string;
    @Output() public endGameEmitter: EventEmitter<boolean>;
    public crossword: CrosswordGame;
    public selectedWord: string;
    private hints: Array<Hint>;
    @ViewChildren('square') public squares;

    constructor(
        private crosswordService: CrosswordService,
        private keyboardService: KeyboardService,
        private lexiconService: LexiconService
    ) {
        this.endGameEmitter = new EventEmitter<boolean>();
    }

    public ngOnInit() {
        this.newGame();
    }

    private newGame() {
        this.crosswordService.getCrossword(this.level).then((crossword) => {
            this.crossword = new CrosswordGame(
                crossword.crossword,
                crossword.wordsWithIndex,
                crossword.listOfWords
            );
            this.hints = new Array<Hint>();
            for (const word of this.crossword.wordsWithIndex) {
                this.lexiconService.getWordDefinition(word.word)
                    .catch((err) => {
                        this.handleError(err);
                    })
                    .then((definition) => {
                        this.hints.push(new Hint(word.word, definition));
                    });
            }
        });
    }

    public endGame() {
        this.endGameEmitter.emit(true);
    }

    private disableEvent(event: any): void {
        event.preventDefault();
        event.returnValue = false;
    }

    public unselectWord() {
        if (this.selectedWord) {
            this.crossword.clearSelectedWord(this.selectedWord);
            this.selectedWord = '';
        }
    }

    public selectWord(word: string) {
        if (this.selectedWord) {
            this.crossword.clearSelectedWord(this.selectedWord);
        }
        this.crossword.setSelectedWord(word);
        this.selectedWord = word;
        this.focusOnSelectedWord();
    }

    public handleInput(event: KeyboardEvent, i: number, j: number): void {
        const charCode = event.which || event.keyCode;
        if (this.keyboardService.isLetter(charCode) && this.crossword.getStatus()[i][j].selected) {
            this.crossword.insertLetter(charCode, i, j);
            this.focusOnNextLetter(i, j);
            this.disableEvent(event);
        } else if (this.keyboardService.isBackspace(charCode) && this.crossword.getStatus()[i][j].selected) {
            this.crossword.eraseLetter(i, j);
            this.focusOnPreviousLetter(i, j);
            this.disableEvent(event);
        } else if (this.keyboardService.isArrowKey(charCode)) {
            this.handleArrows(charCode, i, j);
        } else if (!this.validInputs(charCode)) {
            this.disableEvent(event);
        }
    }

    private handleArrows(keyCode: number, i: number, j: number) {
        if (this.keyboardService.isLeftArrow(keyCode)
            || this.keyboardService.isUpArrow(keyCode)) {
            this.focusOnPreviousLetter(i, j);
        } else {
            this.focusOnNextLetter(i, j);
        }
    }

    private validInputs(keyCode: number): boolean {
        return this.keyboardService.isTab(keyCode);
    }

    private focusOnSelectedWord() {
        const wordInfo = this.crossword.wordMap.get(this.selectedWord);
        this.focusOnSquare(wordInfo.i, wordInfo.j);
    }

    private focusOnSquare(i: number, j: number) {
        this.squares.toArray().find((e) => {
            return e.nativeElement.getAttribute('id') === `${i}_${j}`;
        }).nativeElement.focus();
    }

    private focusOnNextLetter(i: number, j: number) {
        const wordInfo = this.crossword.wordMap.get(this.selectedWord);
        if (wordInfo.horizontal) {
            j = j + 1 < wordInfo.j + wordInfo.word.length ? j + 1 : j;
        } else {
            i = i + 1 < wordInfo.i + wordInfo.word.length ? i + 1 : i;
        }
        this.focusOnSquare(i, j);
    }

    private focusOnPreviousLetter(i: number, j: number) {
        const wordInfo = this.crossword.wordMap.get(this.selectedWord);
        if (wordInfo.horizontal) {
            j = j - 1 >= wordInfo.j ? j - 1 : j;
        } else {
            i = i - 1 >= wordInfo.i ? i - 1 : i;
        }
        this.focusOnSquare(i, j);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
