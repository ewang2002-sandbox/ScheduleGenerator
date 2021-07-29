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

For 9 sections (3, 8, 8, 2, 4, 5, 9, 18, 1 sections), the program found 954 different schedules in around 300 
milliseconds. Having seen the performance of other implementations, I'm satisifed with this.

## Caveat 
As mentioned above, I have not thoroughly tested this implementation. As such, there are bound to be:
- Bugs.
- Performance/memory issues.
- Something else that I completely forgot to consider.