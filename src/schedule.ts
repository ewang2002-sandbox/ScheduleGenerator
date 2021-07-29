/**
 * Generates an array of possible schedules.
 * @param {ICourse[]} courses All courses. More accurately, this should be an array of all possible courses (i.e.
 * sections). The courses will then be organized.
 * @returns {Schedule[]} The array of schedules.
 */ import {ICourse} from "./interfaces";

export function generateAllSchedules(courses: ICourse[]): Schedule[] {
    // Step 1: Separate out the courses.
    const courseMap = new Map<string, ICourse[]>();
    for (const course of courses) {
        if (courseMap.has(course.courseId))
            courseMap.get(course.courseId)!.push(course);
        else
            courseMap.set(course.courseId, [course]);
    }

    if (courseMap.size === 0)
        return [];

    // keys = The unique course IDs.
    const keys = Array.from(courseMap.keys());
    // Step 2: Load the initial schedule by creating a new schedule with just one course ID.
    const initialKey = keys.shift()!;
    const possibleSchedules: Schedule[] = [];
    courseMap.get(initialKey)!.forEach(course => {
        const s = new Schedule();
        s.addCourseToSchedule(course);
        possibleSchedules.push(s);
    });

    // Step 3: Go through all course IDs until none are left.
    while (keys.length > 0) {
        // Step 3.1: Take one course ID out of the keys array.
        const key = keys.shift()!;
        const correspondingCourses = courseMap.get(key)!;

        // Step 3.2: Put all current schedules in a temporary array. This is because we can't add elements to an
        // array when we're iterating through it.
        const temp: Schedule[] = [];
        while (possibleSchedules.length > 0) {
            temp.push(possibleSchedules.shift()!);
        }

        // Step 3.3: Go through all schedules in the array of temporary schedule.
        while (temp.length > 0) {
            // 3.3.1: Essentially, for each schedule:
            const tempSchedule = temp.shift()!;
            // 3.3.2: Go through each course corresponding to the specific course ID found in step 3.1.
            for (const c of correspondingCourses) {
                // 3.3.3: Clone the schedule so we don't share references to the same course array in the Schedule
                // object.
                const clonedSchedule = tempSchedule.clone();
                // 3.3.4: If we can add the course to the array, then save the schedule. Otherwise, drop it.
                if (clonedSchedule.addCourseToSchedule(c)) {
                    possibleSchedules.push(clonedSchedule);
                }
            }
        }
    }

    return possibleSchedules;
}

export class Schedule {
    private readonly _courses: ICourse[];
    private readonly _courseIds: string[];
    private readonly _times: [string, number, number][];
    private readonly _buffer: number;

    /**
     * Creates a new Schedule object.
     * @param {number} buffer The "buffer"; that is, the "break" between two sections.
     */
    public constructor(buffer: number = 10) {
        this._courses = [];
        this._courseIds = [];
        this._times = [];
        this._buffer = buffer;
    }

    public get courses(): ICourse[] {
        return this._courses;
    }

    public clone(): Schedule {
        const s = new Schedule(this._buffer);
        for (const course of this._courses)
            s.addCourseToSchedule(course);
        return s;
    }

    /**
     * Adds a course to the schedule.
     * @param {ICourse} course The course.
     * @returns {boolean} Whether the course was added.
     */
    public addCourseToSchedule(course: ICourse): boolean {
        if (this._courseIds.includes(course.courseId))
            return false;

        const timesToAdd: [string, number, number][] = [];
        for (const meeting of course.meetings) {
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
        this._courses.push(course);
        this._courseIds.push(course.courseId);
        return true;
    }
}