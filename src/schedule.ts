import {ISection} from "./interfaces";

/**
 * Generates an array of possible schedules.
 * @param {ISection[]} sections All sections.
 * @returns {Schedule[]} The array of schedules.
 */
export function generateAllSchedules(sections: ISection[]): Schedule[] {
    // Step 1: Separate out the sections.
    const courseMap = new Map<string, ISection[]>();
    for (const section of sections) {
        if (courseMap.has(section.courseId))
            courseMap.get(section.courseId)!.push(section);
        else
            courseMap.set(section.courseId, [section]);
    }

    if (courseMap.size === 0)
        return [];

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