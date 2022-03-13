import gulp from "gulp";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
	isProd: process.argv.includes("--build"),
	isDev: !process.argv.includes("--build"),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

// Import tasks
import { server } from "./gulp/tasks/server.js";
import { reset } from "./gulp/tasks/reset.js";
import { copy } from "./gulp/tasks/copy.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";

// Watcher
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

// List series fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// List parallel tasks
const mainTasks = gulp.parallel(copy, html, scss, js, images);

// List series tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const prod = gulp.series(reset, mainTasks);

export { svgSprive };
export { fonts };
export { dev };
export { prod };

// Default tasks
gulp.task("default", dev);
