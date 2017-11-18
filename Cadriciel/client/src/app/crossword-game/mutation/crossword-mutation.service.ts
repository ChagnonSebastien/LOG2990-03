import { Injectable } from '@angular/core';

import { CrosswordGridService } from '../grid/crossword-grid.service';
import { CrosswordHintsService } from '../hints/crossword-hints.service';
import { CrosswordCountdownService } from '../countdown/crossword-countdown.service';
import { CrosswordWordsService } from '../words/crossword-words.service';
import { CrosswordService } from '../crossword/crossword.service';
import { CrosswordConfigurationService } from '../configuration/crossword-configuration.service';
import { CrosswordPointsService } from '../points/crossword-points.service';

import { Utilities } from '../../../../../server/app/utilities';

import { CrosswordSquare } from '../shared-classes/crossword-square';
import { Hint } from '../shared-classes/hint';
import { Word } from '../../../../../commun/word';

@Injectable()
export class CrosswordMutationService {
    public newGrid: CrosswordSquare[][];
    public newHints: Array<Hint>;
    public wordsWithIndex: Array<Word>;

    constructor(
        private gridService: CrosswordGridService,
        private hintsService: CrosswordHintsService,
        private countdownService: CrosswordCountdownService,
        private wordsService: CrosswordWordsService,
        private crosswordService: CrosswordService,
        private configurationService: CrosswordConfigurationService,
        private pointsService: CrosswordPointsService
    ) { }

    public mutate() {
        this.wordsService.newGame(this.wordsWithIndex);

        this.gridService.grid = this.newGrid.map((row, i) => {
            return row.map((square, j) => {
                if (this.gridService.grid[i][j].found) {
                    square.found = true;
                    square.input = square.answer;
                }
                return square;
            });
        });

        this.hintsService.hints = this.newHints.map((hint) => {
            if (this.pointsService.foundWords.has(hint.word)) {
                hint.found = true;
            }
            return hint;
        });
        this.hintsService.selectedWord = undefined;
        this.hintsService.opponentSelectedWord = undefined;
    }

    public updateMutation(foundWords: Array<Word>) {
        this.crosswordService.getMutatedCrossword(
            this.configurationService.level,
            foundWords
        ).then((mutatedCrossword) => {
            this.wordsWithIndex = mutatedCrossword.wordsWithIndex;
            this.newGrid = this.updateGrid(mutatedCrossword.crossword, this.wordsWithIndex);
            this.hintsService.initializeHints(this.wordsWithIndex).then((hints) => {
                this.newHints = hints;
            });
        });
    }

    private updateGrid(grid: string[][], wordsWithIndex: Array<Word>): CrosswordSquare[][] {
        return this.gridService.initializeGrid(grid, wordsWithIndex);
    }

    private async updateHints(wordsWithIndex: Array<Word>): Promise<Array<Hint>> {
        let newHints: Array<Hint>;
        await this.hintsService.initializeHints(this.wordsWithIndex).then((hints) => {
            newHints = hints.map((hint, i) => {
                const oldHint = this.hintsService.hints[i];
                return oldHint.found ? oldHint : hint;
            });
        });
        return newHints;
    }
}
