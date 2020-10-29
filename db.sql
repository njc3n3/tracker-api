------------------------------------------------------------------DRAFT 3------------------------------------------------------------------
CREATE TABLE `tracker`.`User` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    UNIQUE (`id`, `email`)
);
CREATE TABLE `tracker`.`Bodypart` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    UNIQUE (`id`)
);
CREATE TABLE `tracker`.`Exercise` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `exercise_BodyPartId` INT NOT NULL,
    `exercise_UserId` INT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500),
    `category` ENUM(
        'Weighted',
        'Bodyweight',
        'AssistedBodyweight',
        'WeightedBodyweight',
        'Duration',
        'AssistedDuration',
        'WeightedDuration'
    ) NOT NULL,
    UNIQUE (`id`, `exercise_BodyPartId`, `exercise_UserId`),
    FOREIGN KEY (`exercise_BodyPartId`) REFERENCES `tracker`.`Bodypart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`exercise_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`RoutineFolder` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `routineFolder_UserId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    UNIQUE (`id`, `routineFolder_UserId`),
    FOREIGN KEY (`routineFolder_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`Workout` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `workout_UserId` INT NOT NULL,
    `workout_RoutineFolderId` INT,
    `name` VARCHAR(255) NOT NULL,
    `startTime` DATETIME NOT NULL,
    `endTime` DATETIME NOT NULL,
    `isRoutine` TINYINT(1) NOT NULL,
    UNIQUE (
        `id`,
        `workout_UserId`,
        `workout_RoutineFolderId`
    ),
    FOREIGN KEY (`workout_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`workout_RoutineFolderId`) REFERENCES `tracker`.`RoutineFolder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`SuperSet` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `superSet_WorkoutId` INT NOT NULL,
    `restTime` INT,
    UNIQUE (`id`, `superSet_WorkoutId`),
    FOREIGN KEY (`superSet_WorkoutId`) REFERENCES `tracker`.`Workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`WorkoutExercise` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `workoutExercise_WorkoutId` INT NOT NULL,
    `workoutExercise_ExerciseId` INT NOT NULL,
    `workoutExerise_SuperSetId` INT,
    `restTime` INT,
    UNIQUE (
        `id`,
        `workoutExercise_WorkoutId`,
        `workoutExercise_ExerciseId`,
        `workoutExerise_SuperSetId`
    ),
    FOREIGN KEY (`workoutExercise_WorkoutId`) REFERENCES `tracker`.`Workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`workoutExercise_ExerciseId`) REFERENCES `tracker`.`Exercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`workoutExerise_SuperSetId`) REFERENCES `tracker`.`SuperSet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`Set` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `set_WorkoutExerciseId` INT NOT NULL,
    `repetitions` INT,
    `weight` INT,
    `duration` INT,
    UNIQUE (`id`, `set_WorkoutExerciseId`),
    FOREIGN KEY (`set_WorkoutExerciseId`) REFERENCES `tracker`.`WorkoutExercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
------------------------------------------------------------------DRAFT 2------------------------------------------------------------------
CREATE TABLE `tracker`.`User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
);
CREATE TABLE `tracker`.`Bodypart` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);
CREATE TABLE `tracker`.`Exercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `exercise_BodyPartId` INT NOT NULL,
    `exercise_UserId` INT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NULL,
    `category` ENUM(
        'Weighted',
        'Bodyweight',
        'AssistedBodyweight',
        'WeightedBodyweight',
        'Duration',
        'AssistedDuration',
        'WeightedDuration'
    ) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `exercise_BodyPartId_UNIQUE` (`exercise_BodyPartId` ASC) VISIBLE,
    UNIQUE INDEX `exercise_UserId_UNIQUE` (`exercise_UserId` ASC) VISIBLE,
    CONSTRAINT `exercise_BodyPartId` FOREIGN KEY (`exercise_BodyPartId`) REFERENCES `tracker`.`Bodypart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `exercise_UserId` FOREIGN KEY (`exercise_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`RoutineFolder` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `routineFolder_UserId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `routineFolder_UserId_UNIQUE` (`routineFolder_UserId` ASC) VISIBLE,
    CONSTRAINT `routineFolder_UserId` FOREIGN KEY (`routineFolder_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`Workout` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `workout_UserId` INT NOT NULL,
    `workout_RoutineFolderId` INT,
    `name` VARCHAR(255) NOT NULL,
    `startTime` DATETIME NOT NULL,
    `endTime` DATETIME NOT NULL,
    `isRoutine` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `workout_UserId_UNIQUE` (`workout_UserId` ASC) VISIBLE,
    UNIQUE INDEX `workout_RoutineFolderId_UNIQUE` (`workout_RoutineFolderId` ASC) VISIBLE,
    CONSTRAINT `workout_UserId` FOREIGN KEY (`workout_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `workout_RoutineFolderId` FOREIGN KEY (`workout_RoutineFolderId`) REFERENCES `tracker`.`RoutineFolder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`SuperSet` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `superSet_WorkoutId` INT NOT NULL,
    `restTime` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `superSet_WorkoutId_UNIQUE` (`superSet_WorkoutId` ASC) VISIBLE,
    CONSTRAINT `superSet_WorkoutId` FOREIGN KEY (`superSet_WorkoutId`) REFERENCES `tracker`.`Workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`WorkoutExercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `workoutExercise_WorkoutId` INT NOT NULL,
    `workoutExercise_ExerciseId` INT NOT NULL,
    `workoutExerise_SuperSetId` INT,
    `restTime` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `workoutExercise_WorkoutId_UNIQUE` (`workoutExercise_WorkoutId` ASC) VISIBLE,
    UNIQUE INDEX `workoutExercise_ExerciseId_UNIQUE` (`workoutExercise_ExerciseId` ASC) VISIBLE,
    UNIQUE INDEX `workoutExerise_SuperSetId_UNIQUE` (`workoutExerise_SuperSetId` ASC) VISIBLE,
    CONSTRAINT `workoutExercise_WorkoutId` FOREIGN KEY (`workoutExercise_WorkoutId`) REFERENCES `tracker`.`Workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `workoutExercise_ExerciseId` FOREIGN KEY (`workoutExercise_ExerciseId`) REFERENCES `tracker`.`Exercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `workoutExerise_SuperSetId` FOREIGN KEY (`workoutExerise_SuperSetId`) REFERENCES `tracker`.`SuperSet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`Set` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `set_WorkoutExerciseId` INT NOT NULL,
    `repetitions` INT,
    `weight` INT,
    `duration` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `set_WorkoutExerciseId_UNIQUE` (`set_WorkoutExerciseId` ASC) VISIBLE,
    CONSTRAINT `set_WorkoutExerciseId` FOREIGN KEY (`set_WorkoutExerciseId`) REFERENCES `tracker`.`WorkoutExercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
------------------------------------------------------------------DRAFT 1------------------------------------------------------------------
CREATE TABLE `tracker`.`User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
);
CREATE TABLE `tracker`.`Bodypart` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);
CREATE TABLE `tracker`.`Exercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `exercise_BodyPartId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NULL,
    `category` ENUM(
        'Weighted',
        'Bodyweight',
        'AssistedBodyweight',
        'WeightedBodyweight',
        'Duration',
        'AssistedDuration',
        'WeightedDuration'
    ) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `exercise_BodyPartId_UNIQUE` (`exercise_BodyPartId` ASC) VISIBLE,
    CONSTRAINT `exercise_BodyPartId` FOREIGN KEY (`exercise_BodyPartId`) REFERENCES `tracker`.`Bodypart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`UserExercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `userExercise_BodyPartId` INT NOT NULL,
    `userExercise_UserId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NULL,
    `category` ENUM(
        'Weighted',
        'Bodyweight',
        'AssistedBodyweight',
        'WeightedBodyweight',
        'Duration',
        'AssistedDuration',
        'WeightedDuration'
    ) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `userExercise_BodyPartId_UNIQUE` (`userExercise_BodyPartId` ASC) VISIBLE,
    UNIQUE INDEX `userExercise_UserId_UNIQUE` (`userExercise_UserId` ASC) VISIBLE,
    CONSTRAINT `userExercise_BodyPartId` FOREIGN KEY (`userExercise_BodyPartId`) REFERENCES `tracker`.`Bodypart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `userExercise_UserId` FOREIGN KEY (`userExercise_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`RoutineFolder` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `routineFolder_UserId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `routineFolder_UserId_UNIQUE` (`routineFolder_UserId` ASC) VISIBLE,
    CONSTRAINT `routineFolder_UserId` FOREIGN KEY (`routineFolder_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`Routine` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `routine_RoutineFolderId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `routine_RoutineFolderId_UNIQUE` (`routine_RoutineFolderId` ASC) VISIBLE,
    CONSTRAINT `routine_RoutineFolderId` FOREIGN KEY (`routine_RoutineFolderId`) REFERENCES `tracker`.`RoutineFolder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`RoutineExercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `routineExercise_RoutineId` INT NOT NULL,
    `routineExercise_ExerciseId` INT NOT NULL,
    `sets` INT NOT NULL,
    `restTime` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `routineExercise_RoutineId_UNIQUE` (`routineExercise_RoutineId` ASC) VISIBLE,
    UNIQUE INDEX `routineExercise_ExerciseId_UNIQUE` (`routineExercise_ExerciseId` ASC) VISIBLE,
    CONSTRAINT `routineExercise_RoutineId` FOREIGN KEY (`routineExercise_RoutineId`) REFERENCES `tracker`.`Routine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `routineExercise_ExerciseId` FOREIGN KEY (`routineExercise_ExerciseId`) REFERENCES `tracker`.`Exercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`RoutineUserExercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `routineUserExercise_RoutineId` INT NOT NULL,
    `routineUserExercise_UserExerciseId` INT NOT NULL,
    `sets` INT NOT NULL,
    `restTime` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `routineUserExercise_RoutineId_UNIQUE` (`routineUserExercise_RoutineId` ASC) VISIBLE,
    UNIQUE INDEX `routineUserExercise_UserExerciseId_UNIQUE` (`routineUserExercise_UserExerciseId` ASC) VISIBLE,
    CONSTRAINT `routineUserExercise_RoutineId` FOREIGN KEY (`routineUserExercise_RoutineId`) REFERENCES `tracker`.`Routine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `routineUserExercise_UserExerciseId` FOREIGN KEY (`routineUserExercise_UserExerciseId`) REFERENCES `tracker`.`UserExercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`Workout` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `workout_UserId` INT NOT NULL,
    `startTime` INT NOT NULL,
    `endTime` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `workout_UserId_UNIQUE` (`workout_UserId` ASC) VISIBLE,
    CONSTRAINT `workout_UserId` FOREIGN KEY (`workout_UserId`) REFERENCES `tracker`.`User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`WorkoutExercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `workoutExercise_WorkoutId` INT NOT NULL,
    `workoutExercise_ExerciseId` INT NOT NULL,
    `restTime` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `workoutExercise_WorkoutId_UNIQUE` (`workoutExercise_WorkoutId` ASC) VISIBLE,
    UNIQUE INDEX `workoutExercise_ExerciseId_UNIQUE` (`workoutExercise_ExerciseId` ASC) VISIBLE,
    CONSTRAINT `workoutExercise_WorkoutId` FOREIGN KEY (`workoutExercise_WorkoutId`) REFERENCES `tracker`.`Workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `workoutExercise_ExerciseId` FOREIGN KEY (`workoutExercise_ExerciseId`) REFERENCES `tracker`.`Exercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`WorkoutUserExercise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `workoutUserExercise_WorkoutId` INT NOT NULL,
    `workoutUserExercise_UserExerciseId` INT NOT NULL,
    `restTime` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `workoutUserExercise_WorkoutId_UNIQUE` (`workoutUserExercise_WorkoutId` ASC) VISIBLE,
    UNIQUE INDEX `workoutUserExercise_UserExerciseId_UNIQUE` (`workoutUserExercise_UserExerciseId` ASC) VISIBLE,
    CONSTRAINT `workoutUserExercise_WorkoutId` FOREIGN KEY (`workoutUserExercise_WorkoutId`) REFERENCES `tracker`.`Workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `workoutUserExercise_UserExerciseId` FOREIGN KEY (`workoutUserExercise_UserExerciseId`) REFERENCES `tracker`.`UserExercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`Set` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `set_WorkoutExerciseId` INT NOT NULL,
    `repetitions` INT,
    `weight` INT,
    `duration` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `set_WorkoutExerciseId_UNIQUE` (`set_WorkoutExerciseId` ASC) VISIBLE,
    CONSTRAINT `set_WorkoutExerciseId` FOREIGN KEY (`set_WorkoutExerciseId`) REFERENCES `tracker`.`WorkoutExercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `tracker`.`UserSet` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `userSet_workoutUserExerciseId` INT,
    `weight` INT,
    `duration` INT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `userSet_workoutUserExerciseId_UNIQUE` (`userSet_workoutUserExerciseId` ASC) VISIBLE,
    CONSTRAINT `userSet_workoutUserExerciseId` FOREIGN KEY (`userSet_workoutUserExerciseId`) REFERENCES `tracker`.`WorkoutUserExercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);