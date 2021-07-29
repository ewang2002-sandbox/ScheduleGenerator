import {ISection} from "../src/interfaces";
import {generateAllSchedules} from "../src/schedule";

describe("Schedule Generation Tests", () => {
    test("Schedule Generator (1Cl, 1S, 0Co)", () => {
        const sections: ISection[] = [
            {
                courseId: "TEST 01",
                section: "A",
                meetings: [
                    {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
                ]
            }
        ];

        expect(1).toBe(generateAllSchedules(sections).length);
    });

    test("Schedule Generator (2Cl, 2S, 0Co)", () => {
        const sections: ISection[] = [
            {
                courseId: "TEST 01",
                section: "A",
                meetings: [
                    {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
                ]
            },
            {
                courseId: "TEST 02",
                section: "C",
                meetings: [
                    {day: "M", timeStart: [13, 0], timeEnd: [14, 30]}
                ]
            }
        ];

        // 1 * 1 = 1 possible schedules
        expect(1).toBe(generateAllSchedules(sections).length);
    })

    test("Schedule Generator (3Cl, 3S, 0Co)", () => {
        const sections: ISection[] = [
            {
                courseId: "TEST 01",
                section: "A",
                meetings: [
                    {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
                ]
            },
            {
                courseId: "TEST 02",
                section: "C",
                meetings: [
                    {day: "M", timeStart: [13, 0], timeEnd: [14, 30]}
                ]
            },
            {
                courseId: "TEST 03",
                section: "X",
                meetings: [
                    {day: "Tu", timeStart: [13, 0], timeEnd: [14, 30]},
                    {day: "Th", timeStart: [13, 0], timeEnd: [14, 30]}
                ]
            }
        ];


        // 1 * 1 * 1 = 1 possible schedules
        expect(1).toBe(generateAllSchedules(sections).length);
    });

    test("Schedule Generator (3Cl, 4S, 1Co)", () => {
        const sections: ISection[] = [
            {
                courseId: "TEST 01",
                section: "A",
                meetings: [
                    {day: "M", timeStart: [11, 0], timeEnd: [11, 50]}
                ]
            },
            {
                courseId: "TEST 02",
                section: "C",
                meetings: [
                    {day: "M", timeStart: [13, 0], timeEnd: [14, 30]},
                    {day: "W", timeStart: [14, 0], timeEnd: [14, 45]}
                ]
            },
            {
                courseId: "TEST 02",
                section: "F",
                meetings: [
                    {day: "M", timeStart: [18, 0], timeEnd: [18, 30]},
                    {day: "Th", timeStart: [14, 0], timeEnd: [15, 45]}
                ]
            },
            {
                courseId: "TEST 03",
                section: "X",
                meetings: [
                    {day: "Tu", timeStart: [13, 0], timeEnd: [14, 30]},
                    {day: "Th", timeStart: [13, 0], timeEnd: [14, 30]}
                ]
            }
        ];
        const schedules = generateAllSchedules(sections);
        expect(1).toBe(schedules.length);

        const scheduleArr = schedules
            .map(x => x.sections)
            .flatMap(x => x.map(y => `${y.courseId} (${y.section})`));

        const expectedArr = [
            "TEST 01 (A)",
            "TEST 02 (C)",
            "TEST 03 (X)"
        ];
        expect(expectedArr).toEqual(scheduleArr);
    });
});