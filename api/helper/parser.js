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
    }
};