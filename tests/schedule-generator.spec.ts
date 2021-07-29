import {ISection} from "../src/interfaces";
import {generateAllSchedules} from "../src/schedule";

describe("Schedule Generation Tests", () => {
    test("Schedule Generator (1Cl)", () => {
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

    test("Schedule Generator (2Cl)", () => {
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

    test("Schedule Generator (3Cl)", () => {
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

    test("Schedule Generator (3Cl)", () => {
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

    test("Schedule Generator (9Cl)", () => {
        // List from https://www.reddit.com/r/UCSD/comments/okk72d/still_waiting_for_spring_quarter_2020_to_start/
        // Course data from https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm
        const sections: ISection[] = [
            {
                courseId: "CENG 40CH",
                section: "A01",
                meetings: [
                    {day: "Tu", timeStart: [14, 0], timeEnd: [15, 20]},
                    {day: "Th", timeStart: [14, 0], timeEnd: [15, 20]},
                    {day: "F", timeStart: [9, 0], timeEnd: [9, 50]},
                    {day: "06/08/2021", timeStart: [15, 0], timeEnd: [17, 59]}
                ]
            },
            {
                courseId: "CENG 40CH",
                section: "A02",
                meetings: [
                    {day: "Tu", timeStart: [14, 0], timeEnd: [15, 20]},
                    {day: "Th", timeStart: [14, 0], timeEnd: [15, 20]},
                    {day: "F", timeStart: [10, 0], timeEnd: [10, 50]},
                    {day: "06/08/2021", timeStart: [15, 0], timeEnd: [17, 59]}
                ]
            },
            {
                courseId: "CENG 40CH",
                section: "A03",
                meetings: [
                    {day: "Tu", timeStart: [14, 0], timeEnd: [15, 20]},
                    {day: "Th", timeStart: [14, 0], timeEnd: [15, 20]},
                    {day: "F", timeStart: [11, 0], timeEnd: [11, 50]},
                    {day: "06/08/2021", timeStart: [15, 0], timeEnd: [17, 59]}
                ]
            },
            {
                courseId: "CHEM 100B",
                section: "A01",
                meetings: [
                    {day: "Tu", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "Th", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "Tu", timeStart: [10, 0], timeEnd: [12, 50]},
                    {day: "Th", timeStart: [10, 0], timeEnd: [12, 50]},
                    {day: "04/24/2021", timeStart: [11, 0], timeEnd: [12, 50]},
                    {day: "05/22/2021", timeStart: [11, 0], timeEnd: [12, 50]},
                    {day: "06/10/2021", timeStart: [8, 0], timeEnd: [10, 59]},
                ]
            },
            {
                courseId: "CHEM 100B",
                section: "B01",
                meetings: [
                    {day: "Tu", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "Th", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "M", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "W", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "04/24/2021", timeStart: [11, 0], timeEnd: [12, 50]},
                    {day: "05/22/2021", timeStart: [11, 0], timeEnd: [12, 50]},
                    {day: "06/10/2021", timeStart: [8, 0], timeEnd: [10, 59]},
                ]
            },
            {
                courseId: "CHEM 132",
                section: "A01",
                meetings: [
                    {day: "Tu", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "Th", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "F", timeStart: [12, 0], timeEnd: [12, 50]},
                    {day: "06/10/2021", timeStart: [8, 0], timeEnd: [10, 59]},
                ]
            },
            {
                courseId: "CHEM 132",
                section: "A02",
                meetings: [
                    {day: "Tu", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "Th", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "F", timeStart: [13, 0], timeEnd: [13, 50]},
                    {day: "06/10/2021", timeStart: [8, 0], timeEnd: [10, 59]},
                ]
            },
            {
                courseId: "CHEM 132",
                section: "A03",
                meetings: [
                    {day: "Tu", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "Th", timeStart: [8, 0], timeEnd: [9, 20]},
                    {day: "F", timeStart: [14, 0], timeEnd: [14, 50]},
                    {day: "06/10/2021", timeStart: [8, 0], timeEnd: [10, 59]},
                ]
            },
            {
                courseId: "CHEM 143B",
                section: "A01",
                meetings: [
                    {day: "Tu", timeStart: [18, 30], timeEnd: [19, 20]},
                    {day: "M", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "W", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "06/08/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "CHEM 143B",
                section: "A02",
                meetings: [
                    {day: "Tu", timeStart: [18, 30], timeEnd: [19, 20]},
                    {day: "M", timeStart: [10, 0], timeEnd: [12, 50]},
                    {day: "W", timeStart: [10, 0], timeEnd: [12, 50]},
                    {day: "06/08/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "CHEM 143B",
                section: "A03",
                meetings: [
                    {day: "Tu", timeStart: [18, 30], timeEnd: [19, 20]},
                    {day: "M", timeStart: [12, 10], timeEnd: [15, 0]},
                    {day: "W", timeStart: [12, 10], timeEnd: [15, 0]},
                    {day: "06/08/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "CHEM 143B",
                section: "A04",
                meetings: [
                    {day: "Tu", timeStart: [18, 30], timeEnd: [19, 20]},
                    {day: "Tu", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "Th", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "06/08/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "CHEM 143B",
                section: "A05",
                meetings: [
                    {day: "Tu", timeStart: [18, 30], timeEnd: [19, 20]},
                    {day: "Tu", timeStart: [10, 0], timeEnd: [12, 50]},
                    {day: "Th", timeStart: [10, 0], timeEnd: [12, 50]},
                    {day: "06/08/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "CHEM 143B",
                section: "A06",
                meetings: [
                    {day: "Tu", timeStart: [18, 30], timeEnd: [19, 20]},
                    {day: "Tu", timeStart: [12, 10], timeEnd: [15, 0]},
                    {day: "Th", timeStart: [12, 10], timeEnd: [15, 0]},
                    {day: "06/08/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "LTGM 2C",
                section: "A00",
                meetings: [
                    {day: "M", timeStart: [9, 0], timeEnd: [9, 50]},
                    {day: "W", timeStart: [9, 0], timeEnd: [9, 50]},
                    {day: "F", timeStart: [9, 0], timeEnd: [9, 50]},
                    {day: "06/09/2021", timeStart: [8, 0], timeEnd: [10, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "A01",
                meetings: [
                    {day: "M", timeStart: [17, 0], timeEnd: [18, 50]},
                    {day: "Tu", timeStart: [9, 30], timeEnd: [12, 20]},
                    {day: "06/11/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "A02",
                meetings: [
                    {day: "M", timeStart: [17, 0], timeEnd: [18, 50]},
                    {day: "W", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "06/11/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "A03",
                meetings: [
                    {day: "M", timeStart: [17, 0], timeEnd: [18, 50]},
                    {day: "Th", timeStart: [9, 30], timeEnd: [12, 20]},
                    {day: "06/11/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "A04",
                meetings: [
                    {day: "M", timeStart: [17, 0], timeEnd: [18, 50]},
                    {day: "F", timeStart: [9, 0], timeEnd: [11, 50]},
                    {day: "06/11/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "B01",
                meetings: [
                    {day: "M", timeStart: [19, 0], timeEnd: [20, 50]},
                    {day: "Tu", timeStart: [13, 0], timeEnd: [15, 50]},
                    {day: "06/07/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "B02",
                meetings: [
                    {day: "M", timeStart: [19, 0], timeEnd: [20, 50]},
                    {day: "W", timeStart: [12, 30], timeEnd: [15, 20]},
                    {day: "06/07/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "B03",
                meetings: [
                    {day: "M", timeStart: [19, 0], timeEnd: [20, 50]},
                    {day: "Th", timeStart: [13, 0], timeEnd: [15, 50]},
                    {day: "06/07/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MAE 170",
                section: "B04",
                meetings: [
                    {day: "M", timeStart: [19, 0], timeEnd: [20, 50]},
                    {day: "F", timeStart: [12, 30], timeEnd: [15, 20]},
                    {day: "06/07/2021", timeStart: [19, 0], timeEnd: [21, 59]}
                ]
            },
            {
                courseId: "MATH 180C",
                section: "A01",
                meetings: [
                    {day: "M", timeStart: [15, 0], timeEnd: [15, 50]},
                    {day: "W", timeStart: [15, 0], timeEnd: [15, 50]},
                    {day: "F", timeStart: [15, 0], timeEnd: [15, 50]},
                    {day: "Th", timeStart: [18, 0], timeEnd: [18, 50]},
                    {day: "06/09/2021", timeStart: [15, 0], timeEnd: [17, 59]},
                ]
            },
            {
                courseId: "MATH 180C",
                section: "A02",
                meetings: [
                    {day: "M", timeStart: [15, 0], timeEnd: [15, 50]},
                    {day: "W", timeStart: [15, 0], timeEnd: [15, 50]},
                    {day: "F", timeStart: [15, 0], timeEnd: [15, 50]},
                    {day: "Th", timeStart: [19, 0], timeEnd: [19, 50]},
                    {day: "06/09/2021", timeStart: [15, 0], timeEnd: [17, 59]},
                ]
            }
        ];

        // There should be 0 schedules since CHEM 100B and 132 overlap exactly.
        expect(0).toBe(generateAllSchedules(sections).length);
    });
});