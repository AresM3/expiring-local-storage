const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps")
const tsProject = ts.createProject("tsconfig.json");

gulp.task("compile", () => tsProject.src()
    .pipe(tsProject())
    .pipe(sourcemaps.init({}))
    .pipe(sourcemaps.write('./', {}))
    .pipe(gulp.dest('./dist')));

gulp.task("copy", () => {
    return gulp.src(['./package.json', './README.md'])
        .pipe(gulp.dest('./dist'));
});

gulp.task("default", gulp.series(["compile", "copy"]))
