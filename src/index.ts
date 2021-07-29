import {generateAllSchedules} from "./schedule";
import {ISection} from "./interfaces";
import { memoryUsage } from 'process';

function main(): void {
    const courses: ISection[] = [];

    const dateNow = Date.now();

    const initialMemoryUse = memoryUsage();
    console.log(`Initial Heap: ${initialMemoryUse.heapUsed / 1e+6} / ${initialMemoryUse.heapTotal / 1e+6} MB`);

    const schedules = generateAllSchedules(courses);
    const diff = Date.now() - dateNow;

    const newMemoryUse = memoryUsage();
    console.log(`Final Heap: ${newMemoryUse.heapUsed / 1e+6} / ${newMemoryUse.heapTotal / 1e+6} MB`);
    console.log(`\t- Found ${schedules.length} Schedules in ${diff} Milliseconds.`);

    schedules.forEach(schedule => {
        console.log(schedule.sections.map(x => `${x.courseId} (${x.section})`).join(", "));
    });
}

main();