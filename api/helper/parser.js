module.exports = {
    /**
     * Convert Student Object from email list
     * Filter Duplicate Objects
     * @param students
     * @returns {(registration.studentEmail|{references, allowNull, type, primaryKey})[]}
     */
    parseStudentListToEmailArray(students) {
        return Array.from(new Set(students.map(a => a.studentEmail)))
            .map(email => {
                return students.find(a => a.studentEmail === email)
            }).map(a =>
                a.studentEmail);
    },


    parseGetListEmailArrayByTeacherSize(students, teacher) {


        const emails = students.map(a => a.studentEmail).sort()
        console.log(">>>>> studentes is " + emails)

        if (teacher.constructor !== Array) {
            return emails
        }

        const size = teacher.length
        console.log(">>>>> size is " + size)


        const filtered = [];
        let cnt = 0;
        let current = null;
        emails.forEach((email) => {
            if (email !== current) {
                if (cnt === size) {
                    filtered.push(current)
                }
                cnt = 1;
                current = email
            } else {
                cnt++
            }


        });


        return filtered

        // const Array.from(new Set(students.map(a => a.studentEmail)))
        //     .map(email => {
        //         return students.find(a => a.studentEmail === email)
        //     }).map(a =>
        //         a.studentEmail);
    }
};