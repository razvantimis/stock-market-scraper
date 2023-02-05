// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// deno-lint-ignore no-explicit-any
/** This function removes unnecessary frames from Node.js core errors. */ export function hideStackFrames(fn) {
    // We rename the functions that will be hidden to cut off the stacktrace
    // at the outermost one.
    const hidden = "__node_internal_" + fn.name;
    Object.defineProperty(fn, "name", {
        value: hidden
    });
    return fn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE3NS4wL25vZGUvaW50ZXJuYWwvaGlkZV9zdGFja19mcmFtZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cblxuLy8gZGVuby1saW50LWlnbm9yZSBuby1leHBsaWNpdC1hbnlcbnR5cGUgR2VuZXJpY0Z1bmN0aW9uID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbi8qKiBUaGlzIGZ1bmN0aW9uIHJlbW92ZXMgdW5uZWNlc3NhcnkgZnJhbWVzIGZyb20gTm9kZS5qcyBjb3JlIGVycm9ycy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlU3RhY2tGcmFtZXM8VCBleHRlbmRzIEdlbmVyaWNGdW5jdGlvbiA9IEdlbmVyaWNGdW5jdGlvbj4oXG4gIGZuOiBULFxuKTogVCB7XG4gIC8vIFdlIHJlbmFtZSB0aGUgZnVuY3Rpb25zIHRoYXQgd2lsbCBiZSBoaWRkZW4gdG8gY3V0IG9mZiB0aGUgc3RhY2t0cmFjZVxuICAvLyBhdCB0aGUgb3V0ZXJtb3N0IG9uZS5cbiAgY29uc3QgaGlkZGVuID0gXCJfX25vZGVfaW50ZXJuYWxfXCIgKyBmbi5uYW1lO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwibmFtZVwiLCB7IHZhbHVlOiBoaWRkZW4gfSk7XG5cbiAgcmV0dXJuIGZuO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUUxRSxtQ0FBbUM7QUFHbkMsdUVBQXVFLEdBQ3ZFLE9BQU8sU0FBUyxnQkFDZCxFQUFLLEVBQ0Y7SUFDSCx3RUFBd0U7SUFDeEUsd0JBQXdCO0lBQ3hCLE1BQU0sU0FBUyxxQkFBcUIsR0FBRyxJQUFJO0lBQzNDLE9BQU8sY0FBYyxDQUFDLElBQUksUUFBUTtRQUFFLE9BQU87SUFBTztJQUVsRCxPQUFPO0FBQ1QsQ0FBQyJ9