import {IBasicConstraints, ISection} from "./interfaces";

/**
 * Generates an array of possible schedules.
 * @param {ISection[]} sections All sections.
 * @param {IBasicConstraints} [constraints] The constraints when generating these schedules.
 * @returns {Schedule[]} The array of schedules.
 */
export function generateAllSchedules(sections: ISection[], constraints?: IBasicConstraints): Schedule[] {
    // Step 1: Separate out the sections.
    const tempMap = new Map<string, ISection[]>();
    const seenCourses = new Set<string>();
    for (const section of sections) {
        if (!seenCourses.has(section.courseId))
            seenCourses.add(section.courseId);

        if (constraints) {
            // Check constraints
            let isValid = true;
            for (const meeting of section.meetings) {
                // Day of the week will display as a 1 or 2 letter character.
                if (constraints.reoccurringOnly && meeting.day.length > 2)
                    continue;

                const thisStartTime = meeting.timeStart[0] * 100 + meeting.timeStart[1];
                const thisEndTime = meeting.timeEnd[0] * 100 + meeting.timeEnd[1];

                const consStartTime = constraints.earliestStartTime[0] * 100 + constraints.earliestStartTime[1];
                const consEndTime = constraints.latestEndTime[0] * 100 + constraints.latestEndTime[1];

                if (thisStartTime < consStartTime || consEndTime < thisEndTime) {
                    isValid = false;
                    break;
                }
            }

            if (!isValid)
                continue;
        }

        if (tempMap.has(section.courseId))
            tempMap.get(section.courseId)!.push(section);
        else
            tempMap.set(section.courseId, [section]);
    }

    // No courses found or we didn't put all the courses in the map
    if (tempMap.size === 0 || seenCourses.size !== tempMap.size)
        return [];

    // Sort the key/value pairs so the key with the shortest values will always come first.
    // This is because the algorithm will create a new (or cloned) Schedule object for each section. If it has to
    // deal with courses with tons of sections first, it will negatively impact the performance of the remaining
    // courses with little sections.
    const entries = [...tempMap.entries()].sort((a, b) => {
        if (a[1].length > b[1].length) return 1;
        if (a[1].length < b[1].length) return -1;
        return 0;
    });
    const courseMap = new Map<string, ISection[]>(entries);

    const allCourseIds = Array.from(courseMap.keys());
    // Step 2: Load the initial schedule by creating a new schedule with just one course ID.
    const initialCourseId = allCourseIds.shift()!;
    const possibleSchedules: Schedule[] = [];
    courseMap.get(initialCourseId)!.forEach(course => {
        const s = new Schedule();
        s.addSectionToSchedule(course);
        possibleSchedules.push(s);
    });

    // Step 3: Go through all course IDs until none are left.
    while (allCourseIds.length > 0) {
        // Step 3.1: Take one course ID out of the keys array.
        const courseId = allCourseIds.shift()!;
        const correspondingSections = courseMap.get(courseId)!;

        // Step 3.2: Put all current schedules in a temporary array. This is because we can't add elements to an
        // array when we're iterating through it.
        const tempScheduleArr: Schedule[] = [];
        while (possibleSchedules.length > 0) {
            tempScheduleArr.push(possibleSchedules.shift()!);
        }

        // Step 3.3: Go through all schedules in the array of temporary schedule.
        while (tempScheduleArr.length > 0) {
            // 3.3.1: Essentially, for each schedule:
            const tempSchedule = tempScheduleArr.shift()!;
            // 3.3.2: Go through each section corresponding to the specific course ID found in step 3.1.
            for (const c of correspondingSections) {
                // 3.3.3: Clone the schedule so we don't share references to the same course array in the Schedule
                // object.
                const clonedSchedule = tempSchedule.clone();
                // 3.3.4: If we can add the section to the array, then save the schedule. Otherwise, drop it.
                if (clonedSchedule.addSectionToSchedule(c)) {
                    possibleSchedules.push(clonedSchedule);
                }
            }
        }
    }

    return possibleSchedules;
}

export class Schedule {
    private readonly _sections: ISection[];
    private readonly _courseIds: string[];
    private readonly _times: [string, number, number][];
    private readonly _buffer: number;

    /**
     * Creates a new Schedule object.
     * @param {number} buffer The "buffer"; that is, the "break" between two sections.
     */
    public constructor(buffer: number = 10) {
        this._sections = [];
        this._courseIds = [];
        this._times = [];
        this._buffer = buffer;
    }

    public get sections(): ISection[] {
        return this._sections;
    }

    public clone(): Schedule {
        const s = new Schedule(this._buffer);
        for (const course of this._sections)
            s.addSectionToSchedule(course);
        return s;
    }

    /**
     * Adds a section to the schedule.
     * @param {ISection} section The section.
     * @returns {boolean} Whether the section was added.
     */
    public addSectionToSchedule(section: ISection): boolean {
        if (this._courseIds.includes(section.courseId))
            return false;

        const timesToAdd: [string, number, number][] = [];
        for (const meeting of section.meetings) {
            const thisStartTime = meeting.timeStart[0] * 100 + meeting.timeStart[1];
            const thisEndTime = meeting.timeEnd[0] * 100 + meeting.timeEnd[1];

            for (const [day, startTime, endTime] of this._times) {
                if (day !== meeting.day)
                    continue;

                // time: [11:00, 12:00]     test (this): [10:30, 11:30]
                // 10:30 <= 11:00 && 11:00 <= 11:30
                if (thisStartTime <= startTime && startTime <= thisEndTime)
                    return false;
                // time: [11:00, 12:00]     test (this): [11:30, 12:30]
                // 11:30 <= 12:00 && 12:00 <= 12:30
                if (thisStartTime <= endTime && endTime <= thisEndTime)
                    return false;
                // time: [11:00, 12:00]     test (this): [11:20, 11:40]
                // 11:00 <= 11:30 && 11:40 <= 12:00
                if (startTime <= thisStartTime && thisEndTime < endTime)
                    return false;
            }

            timesToAdd.push([meeting.day, thisStartTime, thisEndTime]);
        }

        this._times.push(...timesToAdd);
        this._sections.push(section);
        this._courseIds.push(section.courseId);
        return true;
    }
}