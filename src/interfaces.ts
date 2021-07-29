export interface ICourse {
    courseId: string;
    section: string;
    courseTitle?: string;
    instructor?: string;
    gradeOption?: string;
    units?: number;
    meetings: IMeeting[];
}

export interface IMeeting {
    meetingType?: string;
    day: string;
    timeStart: [number, number];
    timeEnd: [number, number];
    building?: string;
    room?: string;
}