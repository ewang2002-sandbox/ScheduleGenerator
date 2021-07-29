import {Schedule} from "../src/schedule";

describe("Testing the Schedule Class", () => {
    test("Different Time, Different Days", () => {
        const schedule = new Schedule();
        schedule.addCourseToSchedule({
            courseId: "TEST 01",
            section: "A",
            meetings: [
                {day: "M", timeStart: [15, 0], timeEnd: [15, 50]}
            ]
        });

        schedule.addCourseToSchedule({
            courseId: "TEST 02",
            section: "A",
            meetings: [
                {day: "W", timeStart: [11, 0], timeEnd: [11, 50]}
            ]
        });

        expect(2).toBe(schedule.courses.length);
    });

    test("Same Time, Different Days.", () => {
        const schedule = new Schedule();
        schedule.addCourseToSchedule({
            courseId: "TEST 01",
            section: "A",
            meetings: [
                {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
            ]
        });

        schedule.addCourseToSchedule({
            courseId: "TEST 02",
            section: "A",
            meetings: [
                {day: "W", timeStart: [11, 0], timeEnd: [11, 50]}
            ]
        });

        expect(2).toBe(schedule.courses.length);
    });

    test("Different Time, Same Day", () => {
        const schedule = new Schedule();
        schedule.addCourseToSchedule({
            courseId: "TEST 01",
            section: "A",
            meetings: [
                {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
            ]
        });

        schedule.addCourseToSchedule({
            courseId: "TEST 02",
            section: "A",
            meetings: [
                {day: "M", timeStart: [13, 0], timeEnd: [13, 50]}
            ]
        });

        expect(2).toBe(schedule.courses.length);
    });

    test("Same Time, Same Day", () => {
        const schedule = new Schedule();
        schedule.addCourseToSchedule({
            courseId: "TEST 01",
            section: "A",
            meetings: [
                {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
            ]
        });

        schedule.addCourseToSchedule({
            courseId: "TEST 02",
            section: "A",
            meetings: [
                {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
            ]
        });

        expect(1).toBe(schedule.courses.length);
    });
});