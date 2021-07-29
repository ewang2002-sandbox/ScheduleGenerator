import {generateAllSchedules} from "./schedule";
import {ISection} from "./interfaces";

const courses: ISection[] = [
    {
        courseId: "CSE 100",
        section: "B01",
        meetings: [
            {day: "M", timeStart: [11, 0], timeEnd: [11, 50]},
            {day: "W", timeStart: [11, 0], timeEnd: [11, 50]},
            {day: "F", timeStart: [11, 0], timeEnd: [11, 50]},
            {day: "M", timeStart: [19, 0], timeEnd: [19, 50]},
            {day: "10/30/2021", timeStart: [10, 0], timeEnd: [11, 50]},
            {day: "12/04/2021", timeStart: [8, 0], timeEnd: [10, 59]}
        ]
    },
    {
        courseId: "COGS 9",
        section: "A05",
        meetings: [
            {day: "M", timeStart: [2, 0], timeEnd: [2, 50]},
            {day: "W", timeStart: [2, 0], timeEnd: [2, 50]},
            {day: "F", timeStart: [2, 0], timeEnd: [2, 50]},
            {day: "F", timeStart: [13, 0], timeEnd: [13, 50]},
            {day: "12/08/2021", timeStart: [15, 0], timeEnd: [17, 59]}
        ]
    },
    {
        courseId: "Math 100A",
        section: "B02",
        meetings: [
            {day: "M", timeStart: [10, 0], timeEnd: [10, 50]},
            {day: "W", timeStart: [10, 0], timeEnd: [10, 50]},
            {day: "F", timeStart: [10, 0], timeEnd: [10, 50]},
            {day: "M", timeStart: [18, 0], timeEnd: [18, 50]},
            {day: "10/20/2021", timeStart: [20, 0], timeEnd: [20, 50]},
            {day: "11/10/2021", timeStart: [20, 0], timeEnd: [20, 50]},
            {day: "12/04/2021", timeStart: [15, 0], timeEnd: [17, 59]}
        ]
    },
    {
        courseId: "Math 20D",
        section: "B04",
        meetings: [
            {day: "M", timeStart: [12, 0], timeEnd: [12, 50]},
            {day: "W", timeStart: [12, 0], timeEnd: [12, 50]},
            {day: "F", timeStart: [12, 0], timeEnd: [12, 50]},
            {day: "F", timeStart: [18, 0], timeEnd: [18, 50]},
            {day: "12/09/2021", timeStart: [11, 30], timeEnd: [14, 29]}
        ]
    }
];

const dateNow = Date.now();
const schedules = generateAllSchedules(courses);
const diff = Date.now() - dateNow;
console.log(`Found ${schedules.length} Schedules in ${diff} Milliseconds.`);


schedules.forEach(schedule => {
    console.log(schedule.sections.map(x => `${x.courseId} (${x.section})`).join(", "));
});
