import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';

import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(
        private courses: CoursesService,
        private loading: LoadingService
    ) { }

    ngOnInit() {
        this.reloadCourses();
    }

    reloadCourses() {
        this.loading.loadingOn();

        const courses$ = this.courses.loadAllCourses()
            .pipe(
                map(courses => courses.sort(sortCoursesBySeqNo)),
                finalize(() => this.loading.loadingOff())
            );

        const loadCourses$ = this.loading.showLoaderUntilCompleted(courses$);

        this.beginnerCourses$ = loadCourses$
            .pipe(
                map(courses => courses.filter(course => course.category === 'BEGINNER'))
            );

        this.advancedCourses$ = loadCourses$
            .pipe(
                map(courses => courses.filter(course => course.category === 'ADVANCED'))
            );
    }
}




