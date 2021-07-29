# Schedule Generator
A naive implementation of a schedule generator, prone to numerous bugs.

## Implementation Idea
Ideally, I wanted to avoid recursion due to the many problems I had to deal with when I did try to approach this 
problem recursively. That being said, the iterative implementation works like so.

- Given an array of all *sections*.
  - Categorize these sections based on course ID. For instance, if there are three sections all belonging to `CSE 
    100`, then pair `CSE 100` with the three sections. For this, I used a `Map`. 
  - Create an array `x` of *just* the course IDs. 
  - Then, take one course ID out of `x`. For each section corresponding to this course ID, create a `Schedule` 
    object with this section. Put these `Schedule` objects in an array. 
  - Go through the remaining course IDs in `x`:
    - Remove a course ID from `x`. Get the sections corresponding to this course ID.
    - For each schedule in the schedule array:
      - For each section in the sections array:
        - Clone the `Schedule` object since we don't want to use the same array reference for two or more `Schedule` 
          objects.
        - Check if we can *add* the section to the cloned `Schedule`. By *add*, we are essentially checking to see 
          if this section will have any conflicts with the sections already in this `Schedule`.
        - If we can, then store this `Schedule` back in the array of `Schedule` objects.
        - Otherwise, throw the cloned `Schedule` out.

By the end of the implementation, you will have an array of *mostly* unique Schedules that you can further process.
By *mostly* unique, I mean that there are some schedules with the same exact timetable, just with different sections. 

## Basic Benchmarking
I didn't test these very carefully, but the general idea is that I took a series of sections that are currently 
offered and tried to see how many schedules I could create. 


### Test A
For this test, I mostly used upper-divison courses to find a schedule. For reference, the courses I used were (in 
order, from Fall 2021): 
- Math 184 (3 Sections).
- Math 103A (8 Sections).
- Math 142A (8 Sections).
- CSE 100 (2 Sections).
- Math 180A (4 Sections).
- BILD 1 (5 Sections).
- COGS 18 (9 Sections).
- Math 20E (18 Sections).
- CSE 105 (1 Section).

Now for the test results.

- For 9 courses (3, 8, 8, 2, 4, 5, 9, 18, 1 sections), the program found 954 different schedules in around 300 
milliseconds. Having seen the performance of other implementations, I'm satisfied with this.
- For 9 courses (6, 16, 8, 2, 4, 5, 9, 90, 1 sections), the program found 19080 different schedules in around 15000 
milliseconds.
- For 9 courses (6, 16, 16, 4, 8, 10, 18, 36, 2 sections), the program did not complete within a minute.

The first test case was just me copying the course list from WebReg. The second test case was me multiplying some of 
the courses by a factor of 2 or 5. The third test case is me multiplying all the courses by a factor of 2.

### Test B
For this test, I used mostly lower-divison courses. The courses are as follows (Fall 2021):
- CSE 11 (12 Sections)
- WCWP 10A (44 Sections)
- Math 20C (46 Sections)
- CSE 20 (1 Section)
- CHEM 4 (9 Sections)
- Math 18 (32 Sections)

A common schedule that incoming computer science student in Warren College will usually take are:
- CSE 11 
- WCWP 10A
- Math 20C
- Math 18 (Or CSE 20 or some GE)

Anyways, for the test results. 
- For these 6 courses, the program found 477577 different schedules in around 15000 milliseconds. There are 6994944 
  possible schedules, so approximately 6.8% of these schedules are valid. 

## Caveat 
As mentioned above, I have not thoroughly tested this implementation. As such, there are bound to be:
- Bugs.
- Performance/memory issues.
- Something else that I completely forgot to consider.