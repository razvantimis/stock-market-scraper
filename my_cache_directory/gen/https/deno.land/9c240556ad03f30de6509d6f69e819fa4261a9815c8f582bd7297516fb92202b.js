// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module provides an interface to `Deno.core`. For environments
// that don't have access to `Deno.core` some APIs are polyfilled, while
// some are unavailble and throw on call.
// Note: deno_std shouldn't use Deno.core namespace. We should minimize these
// usages.
// deno-lint-ignore no-explicit-any
export let core;
// deno-lint-ignore no-explicit-any
const { Deno  } = globalThis;
// @ts-ignore Deno.core is not defined in types
if (Deno?.[Deno.internal]?.core) {
    // @ts-ignore Deno[Deno.internal].core is not defined in types
    core = Deno[Deno.internal].core;
} else if (Deno?.core) {
    // @ts-ignore Deno.core is not defined in types
    core = Deno.core;
} else {
    core = {
        runMicrotasks () {
            throw new Error("Deno.core.runMicrotasks() is not supported in this environment");
        },
        setHasTickScheduled () {
            throw new Error("Deno.core.setHasTickScheduled() is not supported in this environment");
        },
        hasTickScheduled () {
            throw new Error("Deno.core.hasTickScheduled() is not supported in this environment");
        },
        setNextTickCallback: undefined,
        setMacrotaskCallback () {
            throw new Error("Deno.core.setNextTickCallback() is not supported in this environment");
        },
        evalContext (_code, _filename) {
            throw new Error("Deno.core.evalContext is not supported in this environment");
        },
        encode (chunk) {
            return new TextEncoder().encode(chunk);
        },
        eventLoopHasMoreWork () {
            return false;
        },
        isProxy () {
            return false;
        },
        getPromiseDetails (_promise) {
            throw new Error("Deno.core.getPromiseDetails is not supported in this environment");
        },
        setPromiseHooks () {
            throw new Error("Deno.core.setPromiseHooks is not supported in this environment");
        },
        ops: {
            op_napi_open (_filename) {
                throw new Error("Node API is not supported in this environment");
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE3NS4wL25vZGUvX2NvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cblxuLy8gVGhpcyBtb2R1bGUgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIHRvIGBEZW5vLmNvcmVgLiBGb3IgZW52aXJvbm1lbnRzXG4vLyB0aGF0IGRvbid0IGhhdmUgYWNjZXNzIHRvIGBEZW5vLmNvcmVgIHNvbWUgQVBJcyBhcmUgcG9seWZpbGxlZCwgd2hpbGVcbi8vIHNvbWUgYXJlIHVuYXZhaWxibGUgYW5kIHRocm93IG9uIGNhbGwuXG4vLyBOb3RlOiBkZW5vX3N0ZCBzaG91bGRuJ3QgdXNlIERlbm8uY29yZSBuYW1lc3BhY2UuIFdlIHNob3VsZCBtaW5pbWl6ZSB0aGVzZVxuLy8gdXNhZ2VzLlxuXG4vLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGxldCBjb3JlOiBhbnk7XG5cbi8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG5jb25zdCB7IERlbm8gfSA9IGdsb2JhbFRoaXMgYXMgYW55O1xuXG4vLyBAdHMtaWdub3JlIERlbm8uY29yZSBpcyBub3QgZGVmaW5lZCBpbiB0eXBlc1xuaWYgKERlbm8/LltEZW5vLmludGVybmFsXT8uY29yZSkge1xuICAvLyBAdHMtaWdub3JlIERlbm9bRGVuby5pbnRlcm5hbF0uY29yZSBpcyBub3QgZGVmaW5lZCBpbiB0eXBlc1xuICBjb3JlID0gRGVub1tEZW5vLmludGVybmFsXS5jb3JlO1xufSBlbHNlIGlmIChEZW5vPy5jb3JlKSB7XG4gIC8vIEB0cy1pZ25vcmUgRGVuby5jb3JlIGlzIG5vdCBkZWZpbmVkIGluIHR5cGVzXG4gIGNvcmUgPSBEZW5vLmNvcmU7XG59IGVsc2Uge1xuICBjb3JlID0ge1xuICAgIHJ1bk1pY3JvdGFza3MoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiRGVuby5jb3JlLnJ1bk1pY3JvdGFza3MoKSBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnRcIixcbiAgICAgICk7XG4gICAgfSxcbiAgICBzZXRIYXNUaWNrU2NoZWR1bGVkKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkRlbm8uY29yZS5zZXRIYXNUaWNrU2NoZWR1bGVkKCkgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50XCIsXG4gICAgICApO1xuICAgIH0sXG4gICAgaGFzVGlja1NjaGVkdWxlZCgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJEZW5vLmNvcmUuaGFzVGlja1NjaGVkdWxlZCgpIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudFwiLFxuICAgICAgKTtcbiAgICB9LFxuICAgIHNldE5leHRUaWNrQ2FsbGJhY2s6IHVuZGVmaW5lZCxcbiAgICBzZXRNYWNyb3Rhc2tDYWxsYmFjaygpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJEZW5vLmNvcmUuc2V0TmV4dFRpY2tDYWxsYmFjaygpIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudFwiLFxuICAgICAgKTtcbiAgICB9LFxuICAgIGV2YWxDb250ZXh0KF9jb2RlOiBzdHJpbmcsIF9maWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiRGVuby5jb3JlLmV2YWxDb250ZXh0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudFwiLFxuICAgICAgKTtcbiAgICB9LFxuICAgIGVuY29kZShjaHVuazogc3RyaW5nKTogVWludDhBcnJheSB7XG4gICAgICByZXR1cm4gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGNodW5rKTtcbiAgICB9LFxuICAgIGV2ZW50TG9vcEhhc01vcmVXb3JrKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgaXNQcm94eSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGdldFByb21pc2VEZXRhaWxzKF9wcm9taXNlOiBQcm9taXNlPHVua25vd24+KTogW251bWJlciwgdW5rbm93bl0ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkRlbm8uY29yZS5nZXRQcm9taXNlRGV0YWlscyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnRcIixcbiAgICAgICk7XG4gICAgfSxcbiAgICBzZXRQcm9taXNlSG9va3MoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiRGVuby5jb3JlLnNldFByb21pc2VIb29rcyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnRcIixcbiAgICAgICk7XG4gICAgfSxcbiAgICBvcHM6IHtcbiAgICAgIG9wX25hcGlfb3BlbihfZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJOb2RlIEFQSSBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnRcIixcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFFMUUscUVBQXFFO0FBQ3JFLHdFQUF3RTtBQUN4RSx5Q0FBeUM7QUFDekMsNkVBQTZFO0FBQzdFLFVBQVU7QUFFVixtQ0FBbUM7QUFDbkMsT0FBTyxJQUFJLEtBQVU7QUFFckIsbUNBQW1DO0FBQ25DLE1BQU0sRUFBRSxLQUFJLEVBQUUsR0FBRztBQUVqQiwrQ0FBK0M7QUFDL0MsSUFBSSxNQUFNLENBQUMsS0FBSyxRQUFRLENBQUMsRUFBRSxNQUFNO0lBQy9CLDhEQUE4RDtJQUM5RCxPQUFPLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUk7QUFDakMsT0FBTyxJQUFJLE1BQU0sTUFBTTtJQUNyQiwrQ0FBK0M7SUFDL0MsT0FBTyxLQUFLLElBQUk7QUFDbEIsT0FBTztJQUNMLE9BQU87UUFDTCxpQkFBZ0I7WUFDZCxNQUFNLElBQUksTUFDUixrRUFDQTtRQUNKO1FBQ0EsdUJBQXNCO1lBQ3BCLE1BQU0sSUFBSSxNQUNSLHdFQUNBO1FBQ0o7UUFDQSxvQkFBbUI7WUFDakIsTUFBTSxJQUFJLE1BQ1IscUVBQ0E7UUFDSjtRQUNBLHFCQUFxQjtRQUNyQix3QkFBdUI7WUFDckIsTUFBTSxJQUFJLE1BQ1Isd0VBQ0E7UUFDSjtRQUNBLGFBQVksS0FBYSxFQUFFLFNBQWlCLEVBQUU7WUFDNUMsTUFBTSxJQUFJLE1BQ1IsOERBQ0E7UUFDSjtRQUNBLFFBQU8sS0FBYSxFQUFjO1lBQ2hDLE9BQU8sSUFBSSxjQUFjLE1BQU0sQ0FBQztRQUNsQztRQUNBLHdCQUFnQztZQUM5QixPQUFPLEtBQUs7UUFDZDtRQUNBLFdBQW1CO1lBQ2pCLE9BQU8sS0FBSztRQUNkO1FBQ0EsbUJBQWtCLFFBQTBCLEVBQXFCO1lBQy9ELE1BQU0sSUFBSSxNQUNSLG9FQUNBO1FBQ0o7UUFDQSxtQkFBa0I7WUFDaEIsTUFBTSxJQUFJLE1BQ1Isa0VBQ0E7UUFDSjtRQUNBLEtBQUs7WUFDSCxjQUFhLFNBQWlCLEVBQUU7Z0JBQzlCLE1BQU0sSUFBSSxNQUNSLGlEQUNBO1lBQ0o7UUFDRjtJQUNGO0FBQ0YsQ0FBQyJ9