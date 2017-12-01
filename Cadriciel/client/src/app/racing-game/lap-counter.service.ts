import { VehicleService } from './vehicle.service';
import { RacingGameService } from './racing-game.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { TrackUtilities } from './track-utilities';
import { MathUtilities } from './math.utilities';
import { LapEventService, LapEvent } from './events/lap-event.service';


@Injectable()
export class LapCounterService {
    private lastVisitedIntersectionNumber: number;
    private passedCounter: Array<number>;
    private laps: BehaviorSubject<number>;

    constructor(private lapEventService: LapEventService, private racingGameService: RacingGameService,
        private vehicleService: VehicleService) {
        this.laps = new BehaviorSubject(0);
        this.lastVisitedIntersectionNumber = 0;
    }

    public initializePassedCounter(): void {
        console.log('initialized passed counter');
        const numberOfIntersections = this.racingGameService.getTrack().trackIntersections.length;
        this.passedCounter = new Array<number>(numberOfIntersections).fill(0);
    }

    private updatePassedCounter(): void {
        const numberOfIntersections = this.racingGameService.getTrack().trackIntersections.length;
        const position = this.vehicleService.getMainVehicle().getVehicle().position;
        const nextIntersectionNumber = (this.lastVisitedIntersectionNumber + 1) % numberOfIntersections;
        const previousIntersectionNumber = MathUtilities
            .negativeSafeModulo((this.lastVisitedIntersectionNumber - 1), numberOfIntersections);
        const nextIntersection = this.racingGameService.getTrack().trackIntersections[nextIntersectionNumber];
        const previousIntersection = this.racingGameService.getTrack().trackIntersections[previousIntersectionNumber];
        //console.log('NEXT INTERSECTION', nextIntersection);
        //console.log('CURRENT POSITION', position);
        if (TrackUtilities.isAtIntersection(position, nextIntersection)) {
            this.passedCounter[nextIntersectionNumber]++;
            this.lastVisitedIntersectionNumber = nextIntersectionNumber;
        } else if (TrackUtilities.isAtIntersection(position, previousIntersection)) {
            this.passedCounter[previousIntersectionNumber]--;
            this.lastVisitedIntersectionNumber = previousIntersectionNumber;
        }
    }

    private passedFinishLine(): boolean {
        const distanceToIntersectionZero = TrackUtilities.calculateDistanceFromIntersection(
            this.vehicleService.getMainVehicle().getVehicle().position, this.racingGameService.getTrack().trackIntersections[0]);
        const distanceToIntersectionOne = TrackUtilities.calculateDistanceFromIntersection(
            this.vehicleService.getMainVehicle().getVehicle().position, this.racingGameService.getTrack().trackIntersections[1]);
        return distanceToIntersectionOne < distanceToIntersectionZero;
    }

    private updateLap(): void {
        // console.log('update lap');
        //console.log(this.passedCounter);
        const minPassed = this.passedCounter.reduce((prev, next) => {
            return prev < next ? prev : next;
        });
        if (minPassed > this.laps.value && this.passedFinishLine()) {
            //console.log('passed finish line');
            this.laps.next(minPassed);
            this.lapEventService.sendLapEvent(new LapEvent(minPassed));
        }
    }

    public updateLapCounter(): void {
        this.updatePassedCounter();
        this.updateLap();
    }

}
