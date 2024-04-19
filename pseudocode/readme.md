# Algorithm Overview

## Variables Definition

```markdown
- `d`: Working days in a week.
- `p`: Periods per day.
- `Periods(d, p)`: Data structure to organize periods for the whole week.
- `t1, t2, ..., tn`: Data structures representing teachers.
- `teacher_available`: Tracks teacher availability (0 for available, 1 for unavailable).
- `c1, c2, ..., cn`: Data structures representing classes.
- `class_available`: Tracks class availability.
- `s1, s2, ..., sn`: Data structures for subjects.
- `creditHr`: Credit hours associated with each subject.
- `lectures`: Distribution of lectures; examples include:
  - `class: ci, teacher: tj, subject: sk, lecturePattern: [1, 1, 1]`
  - `class: ci, teacher: tj, subject: sk, lecturePattern: [2, 1]`
  - `class: ci, teacher: tj, subject: sk, lecturePattern: [3]`
- `final_tt(c, d, p)`: Data structure for the final timetable.
- `remainingLectures(ti, cj)`: Tracks lectures not yet scheduled in the final timetable.
- `SP(teacher, class, Period)`: Function to check if a slot is available for a given teacher-class-period combination.
```

## User Inputs

```markdown
- `teachers`: List of teachers (`t1, t2, ..., tn`).
- `classes`: List of classes (`c1, c2, ..., cn`).
- `subjects`: List of subjects (`s1, s2, ..., sn`).
- `credit Hours`: Credit hours for each subject.
- `teacher, subjects & classes map`: Mapping of which teachers can teach which subjects to which classes (`TSC1, ..., TSCn`).
- `activeDays`: Number of active working days (`d`).
- `lectures per Day`: Number of lectures per day (`p`).
```

## Pseudocode

```pseudo
// Assume all necessary inputs have been provided.
procedure generateTimeTable
    for period in Periods[p]:
        for day in Periods[d]:
            for class in c:
                for teacher in teachers:
                    if (TSC = 0 for day OR remainingLectures[teacher, class] = 0)
                        continue to next iteration

                    if SP(teacher, class, Period[d, p])
                        consecutiveLecture = longest in lectures[i].lecturePattern
                        if (consecutiveLecture > 1)
                            if (Slots available for next consecutiveLectures - 1)
                                AssignLectureInFinal_tt(teacher, class, Periods) for consecutiveLectures
                        else
                            AssignLectureInFinal_tt(teacher, class, Periods) for currentLecture
                    continue to next iteration

// Function to verify the correctness of the algorithm
    for class in c
        for teacher in t
            if (remainingLectures[class][teacher] != 0)
                Add it to remaining

    if (remaining.length == 0)
        print "Successful"
    else
        print "Unsuccessful"

End generateTimeTable

// Supporting procedures
Procedure AssignLectureInFinal_tt
    final_tt[class, Period] = teacher
    class_available[Period] = teacher
    teacher_available[Period] = class
    remainingLectures[teacher, class] -= 1

Procedure SP
    if (teacher_available[period] AND class_available[period])
        return true
    else
        return false
End SP
```
