import {generateAllSchedules} from "./schedule";
import {ISection} from "./interfaces";

const courses: ISection[] = [];

const dateNow = Date.now();
const schedules = generateAllSchedules(courses);
const diff = Date.now() - dateNow;
console.log(`Found ${schedules.length} Schedules in ${diff} Milliseconds.`);

/*
schedules.forEach(schedule => {
    console.log(schedule.sections.map(x => `${x.courseId} (${x.section})`).join(", "));
});
*/