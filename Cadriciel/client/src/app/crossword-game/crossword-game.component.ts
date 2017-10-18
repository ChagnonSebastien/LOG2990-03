import { Component, OnInit, Input } from '@angular/core';
import {CrosswordGameInfoService} from './crossword-game-info.service';
import {MultiplayerService} from './crossword-multiplayer.service';
@Component({
    selector: 'app-crossword-game',
    templateUrl: './crossword-game.component.html',
    styleUrls: ['./crossword-game.component.css'],
})
export class CrosswordGameComponent implements OnInit {
    public option: string = null;
    public mode: string = null;
    public level: string = null;
    public username: string;
    public multiplayerGameReady = false;

    constructor(private crosswordGameInfoService: CrosswordGameInfoService, private multiplayerService: MultiplayerService ) { }

    public ngOnInit() {
    }

    public setUserName(username: string) {
        this.username = username;
    }

    public setOption(chosenOption: string): void {
        this.option = chosenOption;
        this.mode = null;
        this.level = null;
    }

    public setMode(chosenMode: string): void {
        this.mode = chosenMode;
    }

    public setLevel(chosenLevel: string): void {
        this.level = chosenLevel;
    }

    public isSolo(): boolean {
        return this.option === 'SOLO';
    }

    public isMultiplayer(): boolean {
        return this.option === 'MULTIPLAYER';
    }

    public singleplayerSet(): boolean {
        return (this.option === 'SOLO' && this.mode != null && this.level != null);
    }

    public multiplayerSet(): boolean {
        return (this.option === 'MULTIPLAYER' && this.mode != null && this.level != null);
    }

    public saveOptions(): void {
        this.crosswordGameInfoService.option = this.option;
        this.crosswordGameInfoService.game.mode = this.mode;
        this.crosswordGameInfoService.game.difficulty = this.level;

        if (this.option === 'MULTIPLAYER') {
            this.multiplayerGameReady = true;
            this.createGame();
            console.log(this.username);
        }
    }

    public createGame() {
        this.username = (<HTMLInputElement>document.getElementById('usernameInput')).value;
        this.multiplayerService.sendGame(this.level, this.mode, this.username);
    }
}
