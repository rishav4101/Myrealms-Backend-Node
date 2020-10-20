"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logging(req, res, next) {
    let t = new Date();
    let formattedString = `${req.ip} -- [${t.toLocaleString()}] ${req.method} ${req.url} ${res.statusCode} ${req.headers["user-agent"]}`;
    if (process.env.NODE_ENV == "production") {
        req.app.locals.logStream.write(formattedString + "\n");
    }
    else {
        console.log(formattedString);
    }
    next();
}
exports.default = logging;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBd0IsT0FBTyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBUztJQUNsRSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ2xCLElBQUksZUFBZSxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLEtBQUssR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFBO0lBRXBJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFBO0tBQ3pEO1NBQU07UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0tBQy9CO0lBQ0QsSUFBSSxFQUFFLENBQUE7QUFDVixDQUFDO0FBVkQsMEJBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZ2dpbmcocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBhbnkpIHtcbiAgICBsZXQgdCA9IG5ldyBEYXRlKClcbiAgICBsZXQgZm9ybWF0dGVkU3RyaW5nID0gYCR7cmVxLmlwfSAtLSBbJHt0LnRvTG9jYWxlU3RyaW5nKCl9XSAke3JlcS5tZXRob2R9ICR7cmVxLnVybH0gJHtyZXMuc3RhdHVzQ29kZX0gJHtyZXEuaGVhZGVyc1tcInVzZXItYWdlbnRcIl19YFxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHJlcS5hcHAubG9jYWxzLmxvZ1N0cmVhbS53cml0ZShmb3JtYXR0ZWRTdHJpbmcgKyBcIlxcblwiKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm1hdHRlZFN0cmluZylcbiAgICB9XG4gICAgbmV4dCgpXG59Il19